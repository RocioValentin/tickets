# Ticket Reservation System (Backend)

Backend desarrollado con **NestJS** que gestiona la reserva y compra de tickets, asegurando consistencia mediante control de concurrencia, expiración de reservas y confirmación de pagos.

---

## Tecnologías

- Node.js
- NestJS
- TypeScript
- SQL (PostgreSQL / SQL Server)
- Redis (BullMQ - procesamiento en background)
- Docker (opcional)

---

## Arquitectura

El proyecto sigue principios de **Domain-Driven Design (DDD)**:
# Ticket Reservation System (Backend)

Backend desarrollado con **NestJS** que gestiona la reserva y compra de tickets, asegurando consistencia mediante control de concurrencia, expiración de reservas y confirmación de pagos.

---

## Tecnologías

- Node.js
- NestJS
- TypeScript
- SQL (PostgreSQL / SQL Server)
- Redis (BullMQ - procesamiento en background)
- Docker (opcional)

---

## Arquitectura

El proyecto sigue principios de **Domain-Driven Design (DDD)**:
- src/
- application/ # Casos de uso
- domain/ # Entidades y contratos (interfaces)
- infrastructure/ # Implementaciones (DB, Redis, etc.)
- interfaces/ # Controllers (API)
- main.ts # Punto de entrada
---

## Instalación de dependencias

Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO

instalar dependencias
npm install
```

## Configuración del proyecto

## 1. Variables de entorno
Crear un archivo .env en la raíz del proyecto:

PORT=3000

## Base de datos
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=tu_usuario
- DB_PASSWORD=tu_password
- DB_NAME=tickets_db

## Redis
- REDIS_HOST=127.0.0.1
- REDIS_PORT=6379

## 2. Configuración de la base de datos
Asegúrate de tener una base de datos corriendo.
Ejemplo con PostgreSQL: 

```bash
createdb tickets_db
```
Tablas principales:
- tickets
- reservations

## 3. Redis (para colas y workers)
Este proyecto utiliza Redis para manejar la expiración de reservas.
Puedes correr Redis localmente con Docker:

```bash
docker run -p 6379:6379 redis
```

## 4. Configuración del servidor
Asegúrate de que el archivo main.ts tenga habilitado CORS y el puerto dinámico:
```bash
app.enableCors({
  origin: '*',
});

const port = process.env.PORT || 3000;
await app.listen(port);
```

## 5. Ejecución del proyecto
Modo desarrollo:
```bash
npm run start:dev
```
---

## Flujo del sistema
- El usuario selecciona un asiento.
- Se crea una reserva (PENDING) con tiempo de expiración.
- El ticket pasa a estado RESERVED.
- Un worker en background verifica expiraciones:
- Si expira → reserva EXPIRED y ticket AVAILABLE
- Si el usuario paga:
- Reserva → CONFIRMED
- Ticket → SOLD

## Endpoints principales
- Crear reserva
POST /reservations
Body:
{
  "ticketId": "a4"
}
- Confirmar pago
POST /reservations/:id/confirm

## Despliegue

Render (Producción actual)

El backend está desplegado en:

👉 https://tickets-e91l.onrender.com

## Configuración:

Servicio: Web Service (Node.js)

Build command:
```bash
npm install && npm run build
```
Start command:

```bash
npm run start:dev
```

Variables de entorno configuradas en Render:

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- REDIS_URL

## Base de datos (Render PostgreSQL)

Instancia PostgreSQL administrada en Render

Conectada mediante variables de entorno

Acceso externo para herramientas como pgAdmin

## Redis (Upstash)

Se utiliza Upstash Redis para manejar colas con BullMQ:

Conexión mediante:

REDIS_URL=rediss://default:xxxxx@xxxxx.upstash.io:6379

Compatible con BullMQ (no usar REST API)

## 🟠 AWS (en progreso)

Se realizó despliegue en:

AWS Elastic Beanstalk

Pasos realizados:

eb init
eb create tickets-env
eb deploy

Notas:

Se requiere Procfile:

web: npm run start

Uso de process.env.PORT

Problemas comunes:

build faltante

variables de entorno

uso incorrecto de Nest CLI

## 💻 Frontend

El frontend fue desarrollado usando Lovable.

<img width="1415" height="690" alt="image" src="https://github.com/user-attachments/assets/758fb03a-7a04-4254-9a0e-330b9429d646" />

Repositorio:

👉 https://github.com/RocioValentin/ticketsfrontend

Sitio desplegado:

👉 https://tickets-frontend.lovable.app/

## 🧠 Notas importantes

Se implementa control de concurrencia para evitar doble reserva.

Se utiliza BullMQ + Redis para manejar expiración de reservas.

Arquitectura preparada para escalar horizontalmente.

Uso de variables de entorno para portabilidad entre entornos.

📌 Estado del proyecto

✅ Backend funcional (Render)

✅ Frontend integrado

✅ Redis configurado (Upstash)

🚧 Deploy en AWS en progreso
