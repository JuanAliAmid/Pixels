# Pixels

Tienda de videojuegos online desarrollada como proyecto final del curso de Backend en Coderhouse.

## Descripción

E-commerce de videojuegos que permite explorar un catálogo con paginación y filtros, gestionar un carrito de compras, y visualizar el detalle de cada producto. Además, incorpora un sistema de recomendaciones donde los usuarios pueden sugerir juegos para que el equipo evalúe incorporarlos al catálogo.

## Instalación y uso local

### Requisitos previos
- Node.js v18 o superior
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

### Pasos

1. Cloná el repositorio

```bash
git clone https://github.com/JuanAliAmid/Pixels.git
cd Pixels
```

2. Instalá las dependencias

```bash
npm install
```

3. Creá un archivo `.env` en la raíz con estas variables:

```
PORT=8080
MONGODB_URI="mongodb://localhost:27017/pixels"
```

4. (Opcional) Poblá la base de datos con productos de ejemplo:

```bash
node src/data/insertGames.js
```

5. Levantá el servidor:

```bash
npm start
```

6. Abrí en el navegador:

```
http://localhost:8080
```

## Vistas

- **Home** — presentación del sitio
- **Tienda (/products)** — listado de productos con paginación, filtros por categoría/disponibilidad y orden por precio.
- **Detalle de producto (/products/:pid)** — información completa del juego con opción de agregar al carrito.
- **Carrito (/carts/:cid)** — productos agregados, cantidades, total y opciones de editar/eliminar/vaciar.
- **Recomendar un juego (/form)** — formulario para que los usuarios sugieran nuevos juegos.

## Funcionalidades

- **CRUD completo de productos**: creación, lectura, actualización y eliminación vía API REST.
- **CRUD completo de carritos**: creación, agregado de productos (incrementa cantidad si ya existe), actualización de cantidades, eliminación puntual y vaciado completo.
- **Paginación real** con `mongoose-paginate-v2`, incluyendo `totalPages`, `hasNextPage`, `hasPrevPage`, `nextLink`, `prevLink`.
- **Filtros y orden**: por categoría, disponibilidad (`query`) y precio ascendente/descendente (`sort`).
- **Tiempo real con Socket.IO**: la vista de catálogo se actualiza automáticamente al crear, editar o eliminar un producto, sin recargar la página.
- **Doble persistencia**: MongoDB como base principal, y una implementación paralela con FileSystem (`game.fs.dao.js`) que replica el mismo CRUD.
- **Sistema de recomendaciones**: los usuarios pueden sugerir juegos mediante un formulario, guardado en su propia colección de MongoDB.
- **Populate en carritos**: al consultar un carrito, se traen los datos completos de cada producto en vez de solo su ID.

## Tecnologías

- Node.js + Express.
- MongoDB + Mongoose.
- mongoose-paginate-v2.
- Socket.IO.
- Handlebars.
- Tailwind CSS + DaisyUI.
- JavaScript vanilla (fetch, manipulación del DOM).

## Estructura del proyecto

El backend está organizado en capas:
- `routes/` — definición de endpoints (API y vistas).
- `controllers/` — manejo de request/response y validaciones.
- `dao/` — acceso a datos (Mongoose y FileSystem).
- `models/` — esquemas de Mongoose.
- `data/` — persistencia basada en archivos (`games.json`).
- `views/` — plantillas Handlebars.

```
public/
├── css/
└── js/
src/
├── config/
├── controllers/
├── dao/
├── data/
├── models/
├── routes/
│   └── api/
└── views/
```

## Desafíos

- Estructurar el proyecto en capas (routes → controllers → dao → models) manteniendo el código modular y desacoplado.
- Mantener dos implementaciones de persistencia en paralelo (MongoDB y FileSystem) sin duplicar lógica en los controllers.
- Sincronizar las actualizaciones del catálogo en tiempo real entre todos los clientes conectados vía Socket.IO.
- Resolver el manejo de rutas de archivos en Windows con `import.meta.url` y `fileURLToPath`.
- Implementar el incremento automático de cantidad en el carrito al agregar un producto repetido, sin duplicarlo.
