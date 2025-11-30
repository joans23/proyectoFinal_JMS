import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({ message: 'Token no proporcionado'});
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token){
        return res.status(401).json({ message: 'Formato de token inválido'});
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({ message:'Token inválido o expirado'});
        }

        req.user = decoded;

        next();
    });
}