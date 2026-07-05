const botonAgregar = document.querySelectorAll('.btn-agregar');
const botonEliminar = document.querySelectorAll('.btn-eliminar');
const botonVaciar = document.querySelector('.btn-vaciar');
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
        const cid = document.body.dataset.cid;
        const pid = data.dataset.product;

        const precio = Number(data.dataset.precio);

        console.log('click detectado')
        try {

            const res = await fetch(`/api/carts/${cid}/products/${pid}`, {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            data.closest('.card-cart-content').remove()
            const cardsRestantes = document.querySelectorAll('.card-cart-content').length;
            if (cardsRestantes === 0) {

                document.querySelector('.info-cart-content').remove();

                const contenedor = document.querySelector('.content-cards-cart');

                contenedor.classList.remove('content-cards-cart');
                
                contenedor.classList.add('content-pageError');

                contenedor.innerHTML = `
                <img src="/sonicError400.gif" alt="No encontrado" class="sonic-gif" draggable="false" />
                <h1 class="h1-pageError">Carrito vacio</h1>
                <button class="bton-home">
                <a href="/products">Volver a tienda</a>
                </button>
                `;

            }

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

if (botonVaciar) {
    botonVaciar.addEventListener('click', async () => {

        const cid = document.body.dataset.cid;

        try {

            const res = await fetch(`/api/carts/${cid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            location.reload();

        } catch (error) {
            console.error('Error al vaciar carrito', error);
        }

    })
}



console.log(contadorHeader.innerHTML)