import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/user.model.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const AuthService = {
    async login(username, password){
        const user = await UserModel.findByUsername(username);

        if(!user){
            const error = new Error("Usuario no encontrado");
            error.status = 401;
            throw error;
        }

        const validPassword = await bcrypt.compare(password, user.password);

           if(!validPassword){
            const error = new Error("Contraseña incorrecta");
            error.status = 401;
            throw error;
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return {
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        };
    },

    async register(data){
        const { username, password, role } = data;

        if(!username || !password) {
            const err = new Error('Username y password son requeridos');
            err.status = 400;
            throw err;
        }

        const existing =  await UserModel.findByUsername(username);
        if(existing) {
            const err = new Error('El usuario ya existe');
            err.status = 400;
            throw err;
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await UserModel.createUser({
            username,
            password: hash,
            role: role || 'user'
        });

        return newUser;
    }
};