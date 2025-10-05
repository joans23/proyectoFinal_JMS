import { getProduct, addProduct, removeProduct } from "./consultas.js";

const   [...args] = process.argv.slice(2),
        method = args[0],
        resource = args[1],
        title = args[2],
        price = args[3],
        category = args[4];

switch (method) {
    case 'GET':
        getProduct(resource);
        break;
    case 'POST':
        addProduct(resource,title,price,category);
        break;

    case 'DELETE':
        removeProduct(resource);
        break;

    default:
        break;
}

