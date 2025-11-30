import { AuthService } from "../services/auth.service.js";

export const AuthController = {
    async login(req,res,next){
        try {
            const { username, password }= req.body;
            
            const result = await AuthService.login(username,password);

            return res.json(result);
        } catch (error) {
            next(error);
        }
    },

    async register(req, res, next){
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}