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

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tickets_db

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

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

## Ejecución de pruebas
Pruebas unitarias:
npm run test
Pruebas e2e:
npm run test:e2e

## Notas importantes 
- Se implementa control de concurrencia para evitar doble reserva. 
- Se utiliza un worker con Redis (BullMQ) para manejar expiraciones. 
- El sistema está preparado para escalar horizontalmente.