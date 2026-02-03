🚀 Del Rio Stay & Resort - API REST (Backend)
Esta es la API REST que gestiona la lógica de negocio, persistencia de datos y seguridad del sistema Del Rio Stay & Resort. Construida con un enfoque escalable y seguro, permite administrar usuarios, habitaciones y el ciclo de vida de las reservas.

🛠️ Tecnologías y Herramientas 
    Lenguaje: Java 17
    Framework: Spring Boot 4.0 
    Seguridad: Spring Security + JWT (Stateless)
    Base de Datos: PostgreSQL
    ORM: Spring Data JPA / Hibernate
    Productividad: Project Lombok
    Gestor de Dependencias: Maven

🏛️ Arquitectura del Sistema 
El backend sigue el patrón de diseño de capas para facilitar el mantenimiento:
    Controllers: Puntos de entrada de la API (Endpoints).
    Services: Lógica de negocio y validaciones.
    Repositories: Comunicación directa con la base de datos PostgreSQL.Security: Configuración de filtros JWT, gestión de Auth y autorización basada en Roles (USER/ADMIN).

🔐 Autenticación y Autorización
La seguridad se implementa mediante JSON Web Tokens (JWT):
    Login: El usuario envía sus credenciales; el servidor valida y retorna un token JWT.
    Uso: Para endpoints protegidos, se debe incluir el token en los headers de la petición:HTTP
 Authorization: Bearer <tu_token_jwt>

🛣️ API Endpoints    

🔑 Autenticación (Público)
Metodo POST /api/auth/register Registro de nuevo usuario
Metodo POST /api/auth/login Login y obtención de JWT

👥 Usuarios
Metodo GET /api/users/all Listado de todos los usuarios ADMIN
Metodo GET /api/users/{email} Obtener perfil por email USUARIO
Metodo DELETE /api/users/{id} Eliminar usuairo ADMIN

🛏️ Habitaciones
Metodo GET /api/rooms/all Listar todas las habitaciones PUBLICO 
Metodo GET /api/rooms/{id} Detalle de una habitación PUBLICO 
Metodo POST /api/rooms/add Crear nueva habitación ADMIN 
Metodo PUT /api/rooms/update/{id} Actualizar habitación ADMIN
Metodo DELETE /api/rooms/delete/{id} Eliminar habitación ADMIN 

📅 Reservas 
Metodo /api/bookings/room/{roomId} Crear reserva para habitación USUARIO
Metodo /api/bookings/all Ver todas las reservas ADMIN 
Metodo /api/bookings/user/{email} Ver reservas del usuario USUARIO
Metodo /api/bookings/{id} Cancelar/Eliminar reserva USUARIO

⚙️ Configuración del Entorno
Debes configurar las siguientes variables de entorno para que el proyecto funcione correctamente (puedes usarlas en tu application.properties o como variables de sistema):
    DB_URL=jdbc:postgresql://tu-host:5432/nombre_db
    DB_USER=tu_usuario
    DB_PASSWORD=tu_password
    JWT_SECRET=tu_clave_secreta_super_larga_y_segura
    JWT_EXPIRATION=86400000  # Ejemplo: 24 horas en ms

🛠️ Ejecución Local
1. Clonar y entrar a la carpeta: cd backend
2. Compilar y descargar dependencias: mvn clean install
3. Correr la aplicación: mvn spring-boot:run
El servidor estará disponible en http://localhost:8080 (o el puerto que hayas configurado).