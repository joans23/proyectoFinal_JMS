# 📦 Proyecto Final -- API REST + Panel Admin

API REST y panel de administración desarrollados en **Node.js +
Express + Firebase Firestore** con autenticación **JWT**, roles de
usuario (admin/user) y un panel web en **HTML + TailwindCSS +
JavaScript**.\
El proyecto permite **crear, leer, actualizar y eliminar productos**,
así como **gestionar usuarios del panel** (solo admin).

Deploy productivo en Vercel:\
👉 https://proyecto-final-jms.vercel.app/

------------------------------------------------------------------------

# 🚀 Tecnologías utilizadas

### **Backend**

-   Node.js
-   Express
-   Firebase Firestore
-   JSON Web Tokens (JWT)
-   CORS
-   dotenv
-   Vercel Serverless Functions

### **Frontend (Panel Admin)**

-   HTML
-   TailwindCSS
-   JavaScript vanilla
-   Fetch API
-   Modales con backdrop blur
-   Manejo de sesión con localStorage

------------------------------------------------------------------------

# 📁 Estructura del proyecto

/
│
├── api/                       ← backend (serverless Express + Firebase)
│   └── index.js               ← punto de entrada (handler serverless)
│
├── routes/
│   ├── auth.routes.js
│   └── products.routes.js
│
├── controllers/           ← lógica de control de peticiones
│   ├── auth.controller.js
│   └── products.controller.js
│
├── services/              ← lógica de negocio / lógica de acceso a datos
│   ├── products.service.js
│   └── auth.service.js
├── models/                ← definiciones / wrappers de Firestore / estructura de datos
│   ├── product.model.js
│   └── user.model.js
├── middlewares/           ← middlewares (auth, roles, errores, etc.)
│   ├── auth.middleware.js
│   └── roles.middleware.js   ← admin / user
│
├── public/                    ← frontend estático: panel admin + assets
│   ├── admin.html             ← panel de administración (HTML)
│   └── js/
│        └── admin.js          ← lógica JS del panel (login, fetch, UI, etc.)
│
├── .env                       ← variables de entorno (JWT_SECRET, Firebase config, etc.)
├── package.json               ← dependencias del proyecto + “type”: "module"
├── vercel.json                ← configuración de rutas/ functions para deploy en Vercel
└── README.md                  ← documentación del proyecto

------------------------------------------------------------------------

# 🔧 Instalación y configuración

### 1️⃣ Clonar el repositorio

``` sh
git clone https://github.com/joans23/proyecto-final-jms
cd proyecto-final-jms
```

### 2️⃣ Instalar dependencias

``` sh
npm install express cors body-parser dotenv firebase jsonwebtoken serverless-http
```

### 3️⃣ Agregar `"type": "module"` al `package.json`

``` json
{
  "type": "module"
}
```

### 4️⃣ Crear archivo `.env`

``` env
JWT_SECRET=tu_secreto_jwt
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

------------------------------------------------------------------------

# 🗄️ Base de datos (Firestore)

Crear un proyecto en **Firebase Firestore** con las siguientes
colecciones:

### Productos --- `products`

Documento ejemplo:

``` json
{
  "nombre": "Silla ergonómica",
  "descripcion": "Silla de oficina con soporte lumbar",
  "categoria": "muebles",
  "precio": 45000,
  "stock": 12
}
```

### Usuarios --- `users`

Documento ejemplo:

``` json
{
  "username": "admin",
  "password": "hashedPassword",
  "role": "admin"
}
```

------------------------------------------------------------------------

# 🔐 Autenticación y roles

El login devuelve un **JWT** con esta estructura:

``` json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Roles disponibles:

-   **admin** → CRUD de productos + creación de usuarios\
-   **user** → solo lectura (GET)

Todas las rutas protegidas usan middleware:

``` js
Authorization: <token>
```

------------------------------------------------------------------------

# 🔌 Rutas API

## 🔑 Autenticación

### `POST /auth/login`

Body:

``` json
{
  "username": "admin",
  "password": "1234"
}
```

### `POST /auth/create-user` *(solo admin)*

Body:

``` json
{
  "username": "nuevo",
  "password": "1234",
  "role": "user"
}
```

------------------------------------------------------------------------

## 📦 Productos

### `GET /api/products`

Devuelve todos los productos.

### `GET /api/products/:id`

Devuelve un producto por ID.

### `POST /api/products/create` *(solo admin)*

Crea un producto nuevo.

### `PUT /api/products/:id` *(solo admin)*

Actualiza un producto.

### `DELETE /api/products/:id` *(solo admin)*

Elimina un producto.

------------------------------------------------------------------------

# 🖥️ Panel de administración (`public/admin.html`)

Incluye:

✔ Login modal con blur\
✔ Persistencia de sesión con expiración (30 min)\
✔ Logout desde navbar\
✔ CRUD de productos\
✔ Modal para editar productos\
✔ Modal para crear usuarios (solo admin)\
✔ Validación de formularios\
✔ JavaScript separado en archivo externo

El JavaScript del panel está en:\
`public/js/admin.js`

------------------------------------------------------------------------

# ☁️ Deploy en Vercel

### 1️⃣ Instalar CLI

``` sh
npm i -g vercel
```

### 2️⃣ Deploy

``` sh
vercel
```

### 3️⃣ Archivo `vercel.json`

``` json
{
  "version": 2,
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    { "src": "/", "dest": "/public/admin.html" },
    { "src": "/(.*)", "dest": "/public/$1" }
  ]
}
```

👉 Backend se ejecuta como **Serverless Function**\
👉 Frontend es servido desde `/public`

------------------------------------------------------------------------

# 🛡️ Manejo de errores

  Código    Significado
  --------- ---------------------------------
  **400**   Error de validación
  **401**   Falta token
  **403**   Sin permisos (rol insuficiente)
  **404**   Ruta no encontrada
  **500**   Error interno o Firebase

------------------------------------------------------------------------

# 👤 Autor

**Joan Manuel Santacruz**

------------------------------------------------------------------------