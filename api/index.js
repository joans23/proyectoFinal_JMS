import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productsRoutes from "../routes/products.routes";
import authRoutes from "../routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(productsRoutes);

app.use((req,res)=>{
    res.status(404).json({ message: "Ruta no encontrada"});
});

app.use((err,req, res, next)=>{
    console.error(err);
    res.status(err.status || 500).json({ message: err.message});
});

export const handler = serverless(app);
export default app;