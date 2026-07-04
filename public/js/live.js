
socket.on('productoCreado', (producto) => {
    const gridDiv = document.getElementById('card-productos-io');

    const card = document.createElement('div');
    card.className = 'card bg-base-100';
    card.dataset.id = producto._id;

    card.innerHTML = `
        <div class="card-body">
            <ul>
                <li>
                    <img src="${producto.thumbnails[0]}" alt="${producto.title}" class="object-cover imgs-cards" draggable="false">
                    <h2 class="text-2xl">${producto.title}</h2>
                    <h3><strong>Categoría:</strong> ${producto.category}</h3>
                    <h3><strong>Precio:</strong> $${producto.price}</h3>
                </li>
                <div class="card-actios justify-end">
                    <a class="btn btn-info" href="/products/${producto._id}">Ver detalle</a>
                    <button class="btn btn-info btn-agregar" data-id="${producto._id}">Agregar al carrito</button>
                </div>
            </ul>
        </div>
    `;

    gridDiv.appendChild(card);
});

socket.on('productoEliminado', (id) => {

    const cardAEliminar = document.querySelector(`[data-id="${id}"]`);

    cardAEliminar.remove()

})

socket.on('productoActualizado', (producto) => {
    const cardAActualizar = document.querySelector(`[data-id="${producto._id}"]`);
    cardAActualizar.innerHTML = `
        <div class="card-body">
            <ul>
                <li>
                <img src="${producto.thumbnails[0]}" alt="${producto.title}" class="object-cover imgs-cards" draggable="false">
                    <h2 class="text-2xl">${producto.title}</h2>
                    <h3><strong>Categoría:</strong> ${producto.category}</h3>
                    <h3><strong>Precio:</strong> $${producto.price}</h3>
                </li>
                <div class="card-actios justify-end">
                    <a class="btn btn-info" href="/products/${producto._id}">Ver detalle</a>
                    <button class="btn btn-info btn-agregar" data-id="${producto._id}">Agregar al carrito</button>
                </div>
            </ul>
        </div>
    `;
});