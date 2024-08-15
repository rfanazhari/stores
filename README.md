# NestJS Project Setup

## Overview

This project is a backend application built with NestJS, utilizing several libraries and following modular architecture principles.

### Libraries Used

- **TypeORM**: ORM for database interaction.
- **Passport**: Used for JWT token generation.
- **Guard**: Local guard for validating roles (USER and ADMIN).
- **Class-validator**: For DTO validation.
- **Class-transformer**: For transforming models between layers.
- **pg**: PostgreSQL database driver.
- **uuid**: For generating UUIDs.

### Modularity

The project separates entities (models) and domain logic, using mappers to translate between database entities and domain objects.

## Setup

### Local Environment Setup

1. **Install Dependencies**

   Ensure Node.js and npm are installed. Then, install dependencies:

   ```bash
   npm install
   npm run start:dev
2. **Setup Database**
    
    ``CREATE DATABASE nest;
   \c nest;
   CREATE SCHEMA stores;
   ``
3. **Setup Environment**

    Location file ``environment/.env``.
    Edit 
    ``APP_PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nest
   DB_SCHEMA=stores
   DB_DIALECT=postgres
   DB_USERNAME=fan
   DB_PASSWORD=lupa_password
   DB_SYNC=true
   JWT_SECRET=whosyourdaddy
   JWT_EXP=60m
   ``
4. **Seeder**
    ```bash
   npm run make:seed
    ```

### Deployment Setup
1. **Build Docker Containers**
    ```bash
    docker-compose up --build
    ```
2. **Run Database Seeder**
    ```bash
    docker-compose exec app npm run make:seed
    ```