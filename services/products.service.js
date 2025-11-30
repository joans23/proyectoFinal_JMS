import { ProductModel } from "../models/product.model.js";


export const ProductService = {
    async getAllProducts(){
        return await ProductModel.getAll();
    },

    async getProductById(id){
        const product = await ProductModel.getById(id);
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error;
        }
        return product;
    },

    async createProduct(data){
        if (!data.nombre || data.precio == null){
            const error = new Error('Datos de producto inválidos');
            error.status = 400;
            throw error;
        }
        return await ProductModel.create(data);
    },

    async updateProduct(id,data){
        const existing = await ProductModel.getById(id);
        if(!existing){
            const error = new Error('Producto no encontrado');
            throw error;
        }

        return await ProductModel.update(id, data);
    },

    async deleteProduct(id){
        const existing = await ProductModel.getById(id);
        if(!existing){
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error;
        }
        await ProductModel.remove(id);

        return true;
    }
};