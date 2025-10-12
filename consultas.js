const URL = 'https://fakestoreapi.com/';

export async function getProduct(resource) {
    try {
        const respuesta = await fetch(`${URL}${resource}`);
        const data = await respuesta.json();
        console.log("Productos:");
        console.log(data); 
    } catch (error) {
        console.error(error.message);
    }
}

export async function addProduct(resource, params) {
    try {
        let [title,price,category] = params;
        const priceNumber = parseFloat(price);

        if (isNaN(priceNumber) || priceNumber <= 0 )
        {
            console.error('El precio debe ser un número válido mayor a 0');
            process.exit();
        }
        
        const respuesta = await fetch(`${URL}${resource}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                title,
                price: priceNumber,
                category
            })
        });
        const data = await respuesta.json();
        console.log("Resultado:");
        console.log(data);
    } catch (error) {
        console.error(error.message);
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
        console.error(error.message)
    }
}

