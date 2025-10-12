import { getProduct, addProduct, removeProduct } from "./consultas.js";

const   [,,method, resource, ...params] = process.argv;

let methodUppercase = method.toUpperCase();

if (resource != 'products')
{
    let [resourceClean] = resource.split('/');
    console.log(`Para poder realizar una peticion la palabra clave es 'products' y no ${resourceClean}`);
    process.exit(1);
}

switch (methodUppercase) {
    case 'GET':
        getProduct(resource);
        break;
    case 'POST':
        addProduct(resource,params);
        break;

    case 'DELETE':
        removeProduct(resource);
        break;

    default:
        break;
}

