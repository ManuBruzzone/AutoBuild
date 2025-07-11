# 🛒 AutoBuild

![Vista previa de AutoBuild](./frontend/assets/logo_pagina_editada.png)

- **Manuel Bruzzone**

---

## 📌 Descripción del Proyecto

**AutoBuild** es una aplicación web interactiva que simula un sistema de autoservicio orientado a la venta de hardware para PC, en especial **procesadores** y **placas de video**.

Inspirada en la experiencia de compra en kioscos digitales, esta plataforma busca ofrecer una navegación rápida, intuitiva y moderna para que los usuarios puedan **mejorar sus equipos de forma eficiente**, desde cualquier dispositivo.

El backend está estructurado siguiendo el patrón MVC, con separación clara entre modelos, rutas y controladores.
---

## 🎯 Objetivo

El propósito principal del proyecto es crear una solución tecnológica integral que:

- Simplifique la experiencia de compra de componentes.
- Permita una gestión eficaz de productos y ventas.
- Funcione fluidamente tanto en **escritorio** como en **móviles** gracias a su diseño **responsive**.

---

## 🧩 Funcionalidades Principales

### 👨‍💻 Cliente

- Navegación por catálogo de productos.
- Visualización de detalles de cada componente.
- Agregado y eliminación de productos al **carrito de compras**.
- Generación de **ticket** al finalizar la compra.

### 🛠️ Administrador
- **Inicio de sesión seguro** con validación de credenciales.
- **Alta** de nuevos productos.
- **Baja lógica** de productos existentes.
- **Edición** de datos de productos.

---

## 💻 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript 
- **Backend**: Node.js, Express.js  
- **Base de Datos**: Sequelize + MySQL
- **Herramientas adicionales**: Multer, nodemon, dotenv

---


## 🚀 Cómo Ejecutar el Proyecto

1. **Cloná el repositorio:**

```bash
git clone https://github.com/ManuBruzzone/Bruzzone-Coro-TP-Programacion-III-2025
cd Bruzzone-Coro-TP-Programacion-III-2025
```

2. **Instalá las dependencias del backend:**
```bash
cd ./backend/
npm install
```

3. **Configurá las variables de entorno:**
Crea un archivo .env dentro de la carpeta backend/ con los siguientes datos (ajustalos según tu entorno):
```bash
/// EJEMPLO
SQL_DB=productos_tp
SQL_USER=dev
SQL_PASSWORD=123456
SQL_HOST=127.0.0.1
SQL_PORT=3306
```

4. **Iniciá el servidor del backend:**
```bash
npm run dev
```

5. **Abrí el frontend:**
```bash
Podés abrir el archivo frontend/pantallas/bienvenida.html directamente en el navegador, o usar una extensión como Live Server en VS Code para una mejor experienc
```
---
## 🗂️ Estructura del Proyecto

```bash
Bruzzone-Coro-TP-Programacion-III-2025/
├── backend/
│   ├── controllers/          # Lógica para manejar solicitudes (separación en controladores - patrón MVC)
│   ├── database/             # Conexión y configuración de la base de datos
│   ├── middlewares/          # Validaciones y control de errores
│   ├── models/               # Definición de modelos con Sequelize
│   ├── node_modules/         # Dependencias de Node.js
│   ├── public/               # Archivos públicos accesibles desde el cliente
│   │   ├── js/               # Scripts compartidos
│   │   └── styles/           # Estilos compartidos
│   ├── routes/               # Definición de rutas para la API
│   ├── scripts/              # Scripts auxiliares (ej: inicialización)
│   ├── uploads/              # Imágenes subidas por el administrador
│   ├── views/                # Vistas renderizadas por el backend
│   ├── .env                  # Variables de entorno
│   ├── .gitignore            # Archivos y carpetas ignorados por Git
│   ├── index.js              # Punto de entrada del backend
│   ├── package.json          # Configuración y dependencias del proyecto
│   └── package-lock.json     # Control de versiones exactas de dependencias
│
├── frontend/
│   ├── assets/               # Imágenes e íconos para la interfaz
│   ├── clases/               # Clases JS
│   ├── pantallas/            # Páginas HTML
│   ├── scripts/              # Funcionalidades JS específicas
│   ├── styles/               # Hojas de estilo CSS
│   └── main.js               # Script principal de inicialización del frontend
│
├── README.md                 # Documentación del proyecto

```
---
📤 Exportación de Ventas y Uso de Postman

📌 ¿Qué hace?
Permite registrar ventas mediante una ruta POST.

Permite obtener una venta por ID.

Permite exportar todas las ventas en formato .json.

Permite descargar el archivo ventas.json generado.

🛠️ Rutas disponibles
Método	Ruta	Descripción
POST	/ventas	Crear una nueva venta (requiere body JSON con cliente, total y productos)
GET	/ventas	Listar todas las ventas con sus productos asociados
GET	/ventas/:id	Obtener una venta específica por su ID
GET	/ventas/exportar	Generar un archivo JSON con todas las ventas
GET	/ventas/descargar/json	Descargar el archivo ventas.json generado previamente

📁 El archivo exportado se guarda en la raíz del backend como ventas.json.


---
## 📎Notas adicionales
- La baja de productos se realiza de manera lógica, preservando la integridad de los datos  históricos.

- Las imágenes de productos se cargan y almacenan localmente mediante Multer.
---
## 📬 Pruebas

- `POST /ventas`: registra una venta.
- `GET /ventas`: devuelve todas las ventas.
- `GET /ventas/:id`: devuelve una venta específica con sus productos.
- `GET /ventas/exportar`: genera un archivo `ventas.json` con las ventas actuales.
- `GET /ventas/descargar/json`: permite descargar ese archivo directamente.

Estas rutas no forman parte de la interfaz del cliente ni del administrador.
---
## 📬 Contacto
### Cualquier sugerencia me pueden contactar por:
[![Manuel Bruzzone - LinkedIn](https://img.shields.io/badge/Manuel%20Bruzzone-LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/manuelbruzzone/)