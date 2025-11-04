import dbApi from "../config/db.js";
import {User, Newuser} from "../types/auth.types.js";
import { ResultSetHeader } from "mysql2";

export const UserModel = {

    async findByEmail(email: string): Promise<User> {
        const [user] = await dbApi.query<User[]>("SELECT * FROM users WHERE email = ?", [email]);
        return user[0];
    },

    async create(user: Newuser): Promise<User> {
        const [newUser] = await dbApi.query<ResultSetHeader>("INSERT INTO users (name, email, password,otp, otp_expiry) VALUES (?, ?, ?, ?, ?)", [user.name, user.email, user.password, user.otp, user.otp_expiry]);
        return {id: newUser.insertId, ...user} as User;
    },
    



}