import { ProductService } from "../services/products.service.js";

export const ProductsController = {
    async getAll( req, res, next ){
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next){
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    async create(req,res,next){
        try {
            const data = req.body;
            const product = await ProductService.createProduct(data);
            res.status(201).json({msj: "Producto creado ",producto: product});
        } catch (error) {
            next(error);
        }
    },

    async update(req,res,next){
        try {
            const { id }= req.params;
            const data = req.body;
            const product = await ProductService.updateProduct(id, data);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    async remove(req,res,next){
        try {
            const { id }= req.params;
            await ProductService.deleteProduct(id);
            res.status(200).json({
                message: "Producto eliminado correctamente",
                id
            });
        } catch (error) {
            next(error);
        }
    }
};