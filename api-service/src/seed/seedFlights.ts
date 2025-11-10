import dbApi from "../config/db";
import { addMinutes } from "date-fns";
import { RowDataPacket } from "mysql2";

interface Airline extends RowDataPacket {
  id: number;
  code: string;
  name: string;
}

interface Airplane extends RowDataPacket {
  id: number;
  airline_id: number;
  capacity: number;
}

interface Airport extends RowDataPacket {
  id: number;
  code: string;
  city: string;
}

/**
 * Utility: random integer between min and max
 */
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate flight number based on airline code + counter
 */
function generateFlightNumber(code: string, id: number) {
  return `${code}-${String(id).padStart(4, "0")}`;
}

(async () => {
  try {
    console.log("🧹 Cleaning old flight data...");
    await dbApi.query("DELETE FROM flights");

    // Fetch base data
    const [airlines] = await dbApi.query<Airline[]>(
      "SELECT id, code, name FROM airlines"
    );
    const [airplanes] = await dbApi.query<Airplane[]>(
      "SELECT id, airline_id, capacity FROM airplanes"
    );
    const [airports] = await dbApi.query<Airport[]>(
      "SELECT id, code, city FROM airports"
    );

    if (!airlines.length || !airplanes.length || !airports.length) {
      throw new Error("❌ Missing base data (airlines/airplanes/airports)");
    }

    const totalDays = 30;
    const flightsPerDay = 10;
    const today = new Date();

    let flightCounter = 1;
    let inserted = 0;

    console.log(`🚀 Generating ${flightsPerDay * totalDays} flights...`);

    for (let day = 0; day < totalDays; day++) {
      const flightDate = new Date(today);
      flightDate.setDate(today.getDate() + day);

      // Pre-generate a pool of (from, to) routes for the day
      const routes: { from: Airport; to: Airport }[] = [];
      for (let i = 0; i < Math.ceil(flightsPerDay / 2); i++) {
        let from = airports[rand(0, airports.length - 1)];
        let to = airports[rand(0, airports.length - 1)];
        while (to.id === from.id) {
          to = airports[rand(0, airports.length - 1)];
        }
        routes.push({ from, to });
      }

      for (let i = 0; i < flightsPerDay; i++) {
        const airline = airlines[rand(0, airlines.length - 1)];

        // Pick airplane for that airline
        const filteredPlanes = airplanes.filter(
          (p) => p.airline_id === airline.id
        );
        const airplane =
          filteredPlanes.length > 0
            ? filteredPlanes[rand(0, filteredPlanes.length - 1)]
            : airplanes[rand(0, airplanes.length - 1)];

        // Pick a route — sometimes same as earlier (same from/to)
        const { from, to } = routes[rand(0, routes.length - 1)];

        // Spread flights across the day
        const depHour = 5 + Math.floor((17 * i) / flightsPerDay); // between 5 AM and 10 PM
        const depMin = rand(0, 59);
        const departureTime = new Date(flightDate);
        departureTime.setHours(depHour, depMin, 0, 0);

        // Duration and arrival time
        const duration = rand(60, 180); // 1–3 hours
        const arrivalTime = addMinutes(departureTime, duration);

        // Random realistic price
        const price = rand(2500, 12000);
        const availableSeats = airplane.capacity;

        const flightNumber = generateFlightNumber(airline.code, flightCounter);

        await dbApi.query(
          `INSERT INTO flights 
           (airline_id, airplane_id, flight_number, from_airport_id, to_airport_id,
            departure_time, arrival_time, duration_minutes, price, available_seats)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            airline.id,
            airplane.id,
            flightNumber,
            from.id,
            to.id,
            departureTime,
            arrivalTime,
            duration,
            price,
            availableSeats,
          ]
        );

        flightCounter++;
        inserted++;
      }
    }

    console.log(`✅ Successfully added ${inserted} flight records.`);
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding flights:", error.message);
    process.exit(1);
  }
})();
