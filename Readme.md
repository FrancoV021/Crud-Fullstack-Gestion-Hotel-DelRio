🏨 Del Rio Stay & Resort - Hotel Management System
Este proyecto es una solución integral para la gestión de reservas hoteleras, permitiendo administrar de manera eficiente la interacción entre usuarios, disponibilidad de habitaciones y el proceso de reserva.

🎯 Qué es y Qué problema resuelve
El sistema centraliza las operaciones de un resort en una plataforma web moderna.

Problema: La dificultad de gestionar reservas en tiempo real, evitar el overbooking y mantener un registro seguro de los usuarios.

Solución: Una aplicación Full Stack que permite a los usuarios visualizar habitaciones, realizar reservas seguras mediante autenticación JWT y a los administradores gestionar el flujo de trabajo del hotel.

🛠️ Tecnologías utilizadas
Frontend
Core: React 19 + Vite

Routing: React Router 7

Estilos: Tailwind CSS + Radix UI (Componentes accesibles)

Estado y Fetching: Axios + JWT Decode

UI/UX: Lucide React (Iconos) + Sonner (Notificaciones interactivas)

Backend
Framework: Spring Boot 4.0 (Java 17)

Seguridad: Spring Security + JWT (JSON Web Tokens)

Persistencia: Spring Data JPA

Base de Datos: PostgreSQL

Utilidades: Lombok, Apache Commons Lang3

🏗️ Arquitectura del Proyecto
El sistema se basa en tres entidades principales:

User: Gestión de perfiles y roles de seguridad.

Room: Control de tipos de habitación, precios y estados.

Booking: Lógica de negocio para la vinculación de fechas, usuarios y habitaciones.

🚀 Despliegue (Live Demo)
El proyecto se encuentra productivo en las siguientes plataformas:

Frontend: Vercel

Backend & DB: Render

🧪 Cómo se prueba (Local)
1. Clonar el repositorio
Bash
git clone https://github.com/FrancoV021/Crud-Fullstack-Gestion-Hotel-DelRio.git
cd tu-repositorio
2. Ejecutar el Backend
Asegúrate de tener instalado Java 17 y Maven.

Configura tus variables de entorno en application.properties (DB URL, User, Pass).

Bash
cd backend
mvn clean install
mvn spring-boot:run
3. Ejecutar el Frontend
Requiere Node.js instalado.

Bash
cd frontend
npm install
npm run dev
Accede a http://localhost:5173 en tu navegador.

📌 Notas
Este proyecto demuestra habilidades en:

Implementación de seguridad robusta con JWT.

Manejo de estados complejos y navegación en React.

Diseño de base de datos relacional y consultas con JPA/Hibernate.

Despliegue continuo (CI/CD) en plataformas cloud.
