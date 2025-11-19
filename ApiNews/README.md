# 📰 API de Noticias - Sistema Completo de Gestión de Noticias

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

**Sistema fullstack profesional para la gestión y publicación de noticias**

[Características](#-características-principales) •
[Instalación](#-instalación-rápida) •
[Uso](#-uso) •
[API Docs](#-documentación-de-la-api) •
[Licencia](#-licencia)

</div>

---

## 📋 Descripción

Sistema completo de gestión de noticias que incluye un **backend API RESTful** desarrollado con Node.js y Express, y un **frontend interactivo** construido con Angular. Permite publicar, categorizar y gestionar noticias con imágenes, filtros por estado/categoría, y sistema de gestión de contenido.

### 🎯 Casos de Uso

- Portales de noticias regionales o nacionales
- Blogs corporativos con gestión de contenido
- Sistemas de publicación de artículos
- Plataformas de información pública

---

## ✨ Características Principales

### Backend (API REST)

- 🔐 **Autenticación JWT** - Sistema seguro de autenticación
- 📊 **CRUD Completo** - Gestión de perfiles, estados, categorías, usuarios y noticias
- 🗃️ **ORM Sequelize** - Manejo elegante de base de datos MySQL
- 🔄 **Relaciones de Datos** - Foreign Keys y asociaciones entre entidades
- ✅ **Validaciones Robustas** - Middleware de validación con express-validator
- 📝 **Logging de Requests** - Monitoreo de actividad de la API
- 🌱 **Datos Iniciales** - Sistema de seeding automático
- 🛡️ **Soft Delete** - Eliminación lógica para integridad referencial
- 📖 **Documentación Swagger** - API docs interactiva en `/api/docs`

### Frontend (Angular)

- 🎨 **Interfaz Moderna** - Diseño responsivo y atractivo
- 🔍 **Filtros Avanzados** - Por categoría y estado
- 📱 **Responsive Design** - Adaptable a todos los dispositivos
- 🖼️ **Gestión de Imágenes** - Soporte para URLs de imágenes
- 🚀 **Standalone Components** - Arquitectura Angular moderna

---

## 🛠️ Tecnologías Utilizadas

### Backend
```json
{
  "runtime": "Node.js v18+",
  "framework": "Express.js 4.18",
  "database": "MySQL 8.0",
  "orm": "Sequelize 6.37",
  "authentication": "JWT (jsonwebtoken)",
  "validation": "express-validator",
  "password-encryption": "bcryptjs"
}
```

### Frontend
```json
{
  "framework": "Angular 20.3",
  "language": "TypeScript 5.9",
  "http-client": "HttpClient",
  "routing": "Angular Router",
  "forms": "Reactive Forms"
}
```

---

## 📦 Instalación Rápida

### Prerrequisitos

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **MySQL** 8.0+ (XAMPP recomendado para Windows)
- **npm** o **yarn**
- **Git**

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/CesarLey/API-Noticias-Angular.git
cd API-Noticias-Angular
```

### 2️⃣ Configurar Backend

```bash
# Navegar a la carpeta del backend
cd ApiNews

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tus credenciales de MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_contraseña
# DB_NAME=db_news
# DB_PORT=3306
# PORT=3000

# Iniciar MySQL en XAMPP
# Asegúrate de que MySQL esté corriendo en el puerto 3306

# Ejecutar el servidor
npm start
```

El backend creará automáticamente:
- ✅ Base de datos `db_news`
- ✅ Todas las tablas necesarias
- ✅ Datos de ejemplo (2 usuarios, 5 noticias, 2 categorías, 5 estados)

### 3️⃣ Configurar Frontend

```bash
# Abrir nueva terminal y navegar al frontend
cd api_news_frontend/api_news_frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

El frontend se abrirá automáticamente en `http://localhost:4200`

---

## 🚀 Uso
### Acceder a la Aplicación

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:4200 | Interfaz de usuario principal |
| **Backend API** | http://localhost:3000 | API REST |
| **Swagger Docs** | http://localhost:3000/api/docs | Documentación interactiva de la API |

### Funcionalidades Disponibles

#### 👁️ Usuario Visitante (Sin autenticación)
- ✅ Ver listado de noticias publicadas
- ✅ Filtrar por categoría y estado
- ✅ Ver detalle completo de cada noticia
- ✅ Búsqueda y navegación

---

## 📖 Documentación de la API

### Endpoints Principales

#### 🔐 Autenticación
```http
POST /api/auth/login       # Iniciar sesión
POST /api/auth/register    # Registrar usuario
```

#### 📰 Noticias
```http
GET    /api/news           # Listar todas las noticias
GET    /api/news/:id       # Obtener noticia específica
GET    /api/news/category/:id  # Filtrar por categoría
GET    /api/news/state/:id     # Filtrar por estado
POST   /api/news           # Crear noticia (requiere auth)
PUT    /api/news/:id       # Actualizar noticia (requiere auth)
DELETE /api/news/:id       # Eliminar noticia (requiere auth)
```

#### 🏷️ Categorías
```http
GET    /api/categories     # Listar categorías
GET    /api/categories/:id # Obtener categoría
POST   /api/categories     # Crear categoría (admin)
PUT    /api/categories/:id # Actualizar categoría (admin)
DELETE /api/categories/:id # Eliminar categoría (admin)
```

#### 🗺️ Estados
```http
GET    /api/states         # Listar estados
GET    /api/states/:id     # Obtener estado
POST   /api/states         # Crear estado (admin)
PUT    /api/states/:id     # Actualizar estado (admin)
DELETE /api/states/:id     # Eliminar estado (admin)
```

#### 👥 Usuarios
```http
GET    /api/users          # Listar usuarios (admin)
GET    /api/users/:id      # Obtener usuario
PUT    /api/users/:id      # Actualizar usuario
DELETE /api/users/:id      # Eliminar usuario (admin)
```

### Ejemplo de Petición

```bash
# Obtener todas las noticias
curl http://localhost:3000/api/news

# Crear una noticia (requiere token JWT)
curl -X POST http://localhost:3000/api/news \
  -H "Authorization: Bearer <tu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nueva noticia importante",
    "descripcion": "Descripción completa de la noticia...",
    "categoria_id": 1,
    "estado_id": 1,
    "imagen": "https://ejemplo.com/imagen.jpg"
  }'
```

---

## 🗂️ Estructura del Proyecto

```
API-Noticias-Angular/
│
├── ApiNews/                      # Backend (API REST)
│   ├── controllers/              # Controladores de rutas
│   ├── models/                   # Modelos Sequelize
│   ├── routes/                   # Definición de rutas
│   ├── services/                 # Lógica de negocio
│   ├── middlewares/              # Middlewares personalizados
│   ├── validators/               # Validaciones de datos
│   ├── config.js                 # Configuración general
│   ├── config.db.js              # Configuración de BD
│   ├── app.js                    # Punto de entrada
│   ├── seedDatabase.js           # Datos iniciales
│   └── package.json              # Dependencias del backend
│
└── api_news_frontend/
    └── api_news_frontend/        # Frontend (Angular)
        ├── src/
        │   ├── app/
        │   │   ├── components/   # Componentes reutilizables
        │   │   ├── features/     # Páginas principales
        │   │   ├── core/         # Servicios y guards
        │   │   ├── services/     # Servicios de datos
        │   │   └── interfaces/   # Tipos TypeScript
        │   ├── assets/           # Recursos estáticos
        │   └── styles.css        # Estilos globales
        ├── angular.json          # Configuración Angular
        └── package.json          # Dependencias del frontend
```

---

## 📊 Modelo de Datos

### Entidades Principales

#### 📰 News (Noticias)
- `id`, `titulo`, `slug`, `descripcion`, `imagen`
- `categoria_id` → Categories
- `estado_id` → States
- `usuario_id` → Users
- `fecha_publicacion`, `estado_publicacion`
- `visitas`, `comentarios_count`

#### 🏷️ Categories (Categorías)
- `id`, `nombre`, `descripcion`

#### 🗺️ States (Estados)
- `id`, `nombre`, `abreviacion`, `activo`

#### 👥 Users (Usuarios)
- `id`, `nombre`, `apellidos`, `nick`, `correo`
- `contraseña` (encriptada), `bio`, `avatar`
- `perfil_id` → Profiles
- `verificado`, `ultima_actividad`

#### 🎭 Profiles (Perfiles)
- `id`, `nombre`
- Tipos: Administrador, Contribuidor

---

## 🔧 Configuración Avanzada

### Variables de Entorno (.env)

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_segura
DB_NAME=db_news
DB_PORT=3306

# Servidor
PORT=3000
NODE_ENV=development

# JWT (opcional - agregar si implementas auth)
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d
```

### Personalizar Datos Iniciales

Edita `seedDatabase.js` para modificar:
- Usuarios de ejemplo
- Categorías disponibles
- Estados/regiones
- Noticias de prueba

---

## 🛡️ Seguridad

- 🔐 Contraseñas encriptadas con **bcryptjs**
- 🔑 Autenticación basada en **JWT**
- ✅ Validación de datos con **express-validator**
- 🛡️ Headers de seguridad con **CORS**
- 🔒 Protección contra inyección SQL (Sequelize ORM)

---

## 🐛 Solución de Problemas

### Error: "ECONNREFUSED" al iniciar

**Solución**: Verifica que MySQL esté corriendo en XAMPP
```bash
# Windows - Panel XAMPP
# Verifica que el módulo MySQL esté en verde (Running)
```

### Error: "Access denied for user"

**Solución**: Verifica las credenciales en `.env`
```bash
# Asegúrate que DB_USER y DB_PASSWORD sean correctos
# Por defecto XAMPP usa: user=root, password=(vacío)
```

### Puerto 3000 ya en uso

**Solución**: Cambia el puerto en `.env`
```env
PORT=3001
```

### Frontend no se conecta al Backend

**Solución**: Verifica el proxy en `proxy.conf.json`
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Cesar Ley**

- GitHub: [@CesarLey](https://github.com/CesarLey)
- Repositorio: [API-Noticias-Angular](https://github.com/CesarLey/API-Noticias-Angular)

---

## 🙏 Agradecimientos

- Express.js por el excelente framework
- Sequelize por el ORM robusto
- Angular Team por el framework frontend
- Comunidad Open Source

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Hecho con ❤️ y ☕

</div>
- `descripcion` - Descripción de la categoría
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

### 👥 Users (Usuarios)
- `id` - ID único
- `perfil_id` - Foreign Key a Profiles
- `nombre`, `apellidos`, `nick` - Datos personales
- `correo` - Email único
- `contraseña` - Contraseña
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

### 📰 News (Noticias)
- `id` - ID único
- `categoria_id` - Foreign Key a Categories
- `estado_id` - Foreign Key a States  
- `usuario_id` - Foreign Key a Users
- `titulo` - Título de la noticia
- `fecha_publicacion` - Fecha de publicación
- `descripcion` - Contenido de la noticia
- `imagen` - Ruta o datos de la imagen
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

## 🔌 Endpoints de la API

### 📍 Información General
```
GET /                    - Información del servidor
GET /api                 - Información de la API y endpoints
```

### 🏷️ Perfiles
```
GET    /api/profiles     - Obtener todos los perfiles
GET    /api/profiles/:id - Obtener perfil por ID
POST   /api/profiles     - Crear nuevo perfil
PUT    /api/profiles/:id - Actualizar perfil
DELETE /api/profiles/:id - Eliminar perfil
```

### 🗺️ Estados
```
GET    /api/states       - Obtener todos los estados activos
GET    /api/states/:id   - Obtener estado por ID
POST   /api/states       - Crear nuevo estado
PUT    /api/states/:id   - Actualizar estado
DELETE /api/states/:id   - Eliminar estado (soft delete)
```

### 📂 Categorías
```
GET    /api/categories     - Obtener todas las categorías activas
GET    /api/categories/:id - Obtener categoría por ID
POST   /api/categories     - Crear nueva categoría
PUT    /api/categories/:id - Actualizar categoría
DELETE /api/categories/:id - Eliminar categoría (soft delete)
```

### 👥 Usuarios
```
GET    /api/users              - Obtener todos los usuarios activos
GET    /api/users/:id          - Obtener usuario por ID
GET    /api/users/email/:email - Obtener usuario por email
POST   /api/users              - Crear nuevo usuario
PUT    /api/users/:id          - Actualizar usuario
DELETE /api/users/:id          - Eliminar usuario (soft delete)
```

### 📰 Noticias
```
GET    /api/news                      - Obtener todas las noticias activas
GET    /api/news/:id                  - Obtener noticia por ID
GET    /api/news/category/:categoryId - Obtener noticias por categoría
GET    /api/news/state/:stateId       - Obtener noticias por estado
POST   /api/news                      - Crear nueva noticia
PUT    /api/news/:id                  - Actualizar noticia
DELETE /api/news/:id                  - Eliminar noticia (soft delete)
```

## 📝 Ejemplos de Uso

### Crear un nuevo perfil
```bash
POST /api/profiles
Content-Type: application/json

{
    "nombre": "Editor"
}
```

### Crear un nuevo estado
```bash
POST /api/states
Content-Type: application/json

{
    "nombre": "Ciudad de México",
    "abreviacion": "CDMX"
}
```

### Crear una nueva categoría
```bash
POST /api/categories
Content-Type: application/json

{
    "nombre": "Tecnología",
    "descripcion": "Noticias sobre avances tecnológicos"
}
```

### Crear un nuevo usuario
```bash
POST /api/users
Content-Type: application/json

{
    "perfil_id": 1,
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "nick": "juanperez",
    "correo": "juan@example.com",
    "contraseña": "mipassword123"
}
```

### Crear una nueva noticia
```bash
POST /api/news
Content-Type: application/json

{
    "categoria_id": 1,
    "estado_id": 1,
    "usuario_id": 1,
    "titulo": "Nueva tecnología revolucionaria",
    "fecha_publicacion": "2024-01-15T10:00:00.000Z",
    "descripcion": "Se ha desarrollado una nueva tecnología que cambiará el mundo...",
    "imagen": "imagen-noticia.jpg"
}
```

## 🗃️ Datos Iniciales

La API incluye datos de ejemplo que se crean automáticamente:

- **2 Perfiles:** Administrador, Contribuidor
- **5 Estados:** Yucatán, Baja California, Campeche, Chiapas, Chihuahua
- **2 Categorías:** Salud Médica, Ecología y fauna
- **2 Usuarios:** Admin y Jhon Boston
- **5 Noticias:** Ejemplos relacionados con salud y ecología

## 🔐 Validaciones

La API incluye validaciones automáticas:

- **Campos obligatorios** en todas las entidades
- **Formato de email** válido
- **Longitud máxima** de campos de texto
- **IDs numéricos** válidos
- **Referencias válidas** entre tablas (Foreign Keys)

## 🐛 Manejo de Errores

Respuestas consistentes con formato estándar:

```json
{
    "success": false,
    "message": "Descripción del error"
}
```

Códigos de estado HTTP apropiados:
- `200` - Operación exitosa
- `201` - Recurso creado exitosamente
- `400` - Error en los datos enviados
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

## 🏗️ Arquitectura

```
ApiNews/
├── config.js                     # Configuración de variables de entorno
├── config.db.js                  # Configuración de base de datos
├── app.js                        # Aplicación principal de Express
├── seedDatabase.js               # Datos iniciales para la BD
├── models/                       # Modelos de Sequelize
│   ├── index.js
│   ├── ProfileModel.js
│   ├── StateModel.js
│   ├── CategoryModel.js
│   ├── UserModel.js
│   └── NewModel.js
├── controllers/                  # Controladores de las rutas
│   ├── profiles.controller.js
│   ├── states.controller.js
│   ├── categories.controller.js
│   ├── users.controller.js
│   └── news.controller.js
├── services/                     # Lógica de negocio
│   ├── profiles.service.js
│   ├── states.service.js
│   ├── categories.service.js
│   ├── users.service.js
│   └── news.service.js
├── routes/                       # Definición de rutas
│   ├── index.js
│   ├── profiles.routes.js
│   ├── states.routes.js
│   ├── categories.routes.js
│   ├── users.routes.js
│   └── news.routes.js
├── middlewares/                  # Middlewares personalizados
│   ├── requestLogger.middleware.js
│   └── validation.middleware.js
├── package.json
├── .env                          # Variables de entorno
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **MySQL** - Sistema de gestión de base de datos
- **dotenv** - Manejo de variables de entorno
- **cors** - Middleware para CORS

## 📚 Referencias

- [Documentación oficial de Sequelize](https://sequelize.org/)
- [Documentación de Express.js](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Desarrollado como parte del Curso de Express.js**