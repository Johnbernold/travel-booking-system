// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import { Express } from "express";

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Travel Booking System API",
//       version: "1.0.0",
//       description: "This is the API for Travel Booking System",
//       license: {
//         name: "MIT",
//         url: "https://opensource.org/licenses/MIT",
//       },
//     },
//   },
//  servers: [
//    { url: `${process.env.BASE_URL}/api-docs` , description: "Swagger UI" },
//  ],
//  components: {
//    securitySchemes: {
//      bearerAuth: {
//        type: "http",
//        scheme: "bearer",
//        bearerFormat: "JWT",
//        description: "Please enter the access token in the Authorization header",
//      },
//    },
//  },
//  security: [
//    {
//      bearerAuth: [],
//    },
//  ],
//  tags: [
//    {
//      name: "auth",
//      description: "Authentication related endpoints",
//    },
//  ],
//  apis : ["./src/routes/*.ts", "./src/controllers/*.ts"],
// };

// const swaggerUiOptions = {
//   swaggerOptions: {
//     withCredentials: true,
//   }
// };

// export const setupSwagger = (app: Express) => {
//   const swaggerSpec = swaggerJsdoc(swaggerOptions);
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
//   console.log(`📘 Swagger UI available at ${process.env.BASE_URL}/api-docs`);
// };


import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Booking System API",
      version: "1.0.0",
      description: "This is the API for Travel Booking System",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      { url: `${process.env.BASE_URL || "http://localhost:5000"}`, description: "Development Server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Please enter your JWT access token in the Authorization header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "auth",
        description: "Authentication related endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerUiOptions = {
  swaggerOptions: {
    withCredentials: true, // enable cookies (for refresh-token flow)
  },
};

export const setupSwagger = (app: Express) => {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
  console.log(`📘 Swagger UI available at ${process.env.BASE_URL || "http://localhost:5000"}/api-docs`);
};
