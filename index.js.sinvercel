import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(authRoutes);
app.use(productsRoutes);


app.use((req,res,next)=>{
    return res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;

    // 400: errores de request
    // 401: autenticación inválida
    // 403: prohibido
    // 404: no encontrado
    // 500: error interno / problemas con servicios externos
    res.status(status).json({
        message: err.message || 'Error interno del servidor'
    });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});