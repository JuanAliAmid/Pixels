const botonAgregar = document.querySelectorAll('.btn-agregar');
const botonEliminar = document.querySelectorAll('.btn-eliminar');
const contadorHeader = document.querySelector('.contador-header');
const contadorCart = document.querySelector('.h2-contador');
const totalCart = document.querySelector('.h2-total-carrito');


botonAgregar.forEach(data => {
    data.addEventListener('click', async () => {
        const nombre = data.dataset.nombre;
        const precio = data.dataset.precio;
        const img = data.dataset.img;
        console.log('click detectado')

        try {

            const respuesta = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombre, precio: precio, img: img }),
            });
            if (contadorHeader) {
                contadorHeader.innerText = `(${Number(contadorHeader.innerText.replace(/\D/g, '')) + 1})`;
            }

            if (contadorCart) {
                contadorCart.innerText = `${Number(contadorCart.innerText) + 1}`;
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

            const res = await fetch(`/api/cart/${id}`, {

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