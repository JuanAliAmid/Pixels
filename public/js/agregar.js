const botonAgregar = document.querySelectorAll('.btn-agregar');
const botonEliminar = document.querySelectorAll('.btn-eliminar');
const contadorHeader = document.querySelector('.contador-header');
const contadorCart = document.querySelector('.h2-contador');
const totalCart = document.querySelector('.h2-total-carrito');


botonAgregar.forEach(data => {
    data.addEventListener('click', async () => {
        const productoId = data.dataset.id;
        const productoCid = document.body.dataset.cid;
        console.log('click detectado')

        try {

            const respuesta = await fetch(`/api/carts/${productoCid}/products/${productoId}`, {
                method: 'POST',
            });

            const jsonData = await respuesta.json();
            if (contadorCart) {
                contadorCart.innerText = `${Number(contadorCart.innerText) + 1}`;
            }

            if (contadorHeader && jsonData.payload) {
                contadorHeader.innerText = `(${jsonData.payload.productos.length})`;
            }

        } catch (error) {
            console.error('Error de red:', error);
        }

    })
})

botonEliminar.forEach(data => {
    data.addEventListener('click', async () => {
        const id = data.dataset._id;
        const precio = Number(data.dataset.precio);
        console.log(data.dataset)
        console.log(precio)

        console.log('click detectado')
        try {

            const res = await fetch(`/api/carts/${id}`, {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            data.closest('.card-cart-content').remove()
            if (contadorHeader) {
                contadorHeader.innerText = `(${Number(contadorHeader.innerText.replace(/\D/g, '')) - 1})`;
            }
            if (contadorCart) {
                contadorCart.innerText = `${Number(contadorCart.innerText) - 1}`;
            }

            if (totalCart) {
                const valor = Number(totalCart.textContent);
                let resta = valor - precio;
                totalCart.textContent = resta;
            }


        } catch (error) {
            console.error('Error al eliminar', error);
        }
    })
})


console.log(contadorHeader.innerHTML)