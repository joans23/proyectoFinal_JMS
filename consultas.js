const URL = 'https://fakestoreapi.com/';

export async function getProduct(resource) {
    try {
        const respuesta = await fetch(`${URL}${resource}`);
        const data = await respuesta.json();
        console.log("Productos:");
        console.log(data); 
    } catch (error) {
        console.error(error);
    }
}

export async function addProduct(resource, title, price, category) {
    try {
        const respuesta = await fetch(`${URL}${resource}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                title,
                price,
                category
            })
        });
        const data = await respuesta.json();
        console.log("Resultado:");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}


export async function removeProduct(resource){
    try {
        const respuesta = await fetch(`${URL}${resource}`,{
            method: 'DELETE'
        });
        const data = await respuesta.json();
        console.log("Respuesta:");
        console.log('data', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error)
    }
}

