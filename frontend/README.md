Del Rio Stay & Resort - Frontend (React SPA)
Esta es la interfaz de usuario para el sistema de gestión hotelera Del Rio Stay & Resort. Una Single Page Application (SPA) moderna, rápida y responsiva que ofrece una experiencia fluida tanto para huéspedes como para administradores.

🛠️ Tecnologías y Herramientas
Core: React 19 + Vite (Optimizado para desarrollo rápido).

Routing: React Router DOM (Manejo de rutas dinámicas y protegidas).

Estilos: Tailwind CSS (Diseño moderno y utilitario).

Componentes UI: Radix UI + Lucide React (Iconografía).

Comunicación: Axios (Consumo de API REST).

Feedback: Sonner (Notificaciones tipo Toast elegantes).

Seguridad: JWT Auth (Persistencia de sesión y decodificación de roles).

🚀 Funcionalidades Clave
🔐 Sistema de Autenticación: Registro e inicio de sesión con persistencia de token.

🛡️ Control de Acceso por Roles: * USER: Búsqueda de habitaciones, visualización de detalles y gestión de reservas propias.

ADMIN: Dashboard completo para crear, editar y eliminar habitaciones, además de supervisar todas las reservas del sistema.

🏨 Gestión de Habitaciones: CRUD completo con soporte para subida de imágenes.

📅 Sistema de Reservas: Flujo de reserva intuitivo con validación de fechas.

🔍 Navegación Avanzada: Implementación de filtros, búsqueda y paginación para una mejor UX.

🚦 Rutas Protegidas: Middlewares en el frontend que impiden el acceso a áreas administrativas a usuarios no autorizados.

🌐 Variables de Entorno
Para conectar el frontend con tu servidor de producción o local, crea un archivo .env en la raíz de la carpeta /frontend:

VITE_API_URL=https://tu-backend-en-render.onrender.com/api
💻 Desarrollo Local
Instalar dependencias:

npm install
Iniciar servidor de desarrollo:

npm run dev
Construir para producción:

npm run build
El proyecto se servirá por defecto en http://localhost:5173.

📦 Despliegue
La aplicación se encuentra desplegada y configurada para CI/CD en Vercel. Cada push a la rama principal dispara automáticamente una nueva versión productiva.

[!TIP] Nota de Seguridad: El token JWT se almacena de forma segura y se adjunta automáticamente a las peticiones de Axios mediante interceptores para garantizar que la sesión no se pierda al recargar la página.