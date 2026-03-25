# 🚀 CRUD Usuarios - TECSUP

Sistema completo de gestión de usuarios con backend Spring Boot y frontend Next.js, desplegable en Render.com.

## 📋 Overview

Aplicación web full-stack para la gestión de usuarios con las siguientes características:

- ✅ **CRUD Completo**: Crear, Leer, Actualizar, Eliminar usuarios
- 🎨 **Diseño Moderno**: shadcn/ui + Tailwind CSS, responsive design
- 🚀 **Backend**: Spring Boot 3.2.5 + PostgreSQL + Java 21
- ⚡ **Frontend**: Next.js 14 + React Query + TypeScript
- 🐳 **Deploy Ready**: Docker + Render.com configuración
- 📱 **Mobile First**: Diseño responsive para todos los dispositivos

## 🏗️ Arquitectura

```
CRUD_USUARIOS/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/tecsup/crudusuarios/
│   │   ├── entity/Usuario.java
│   │   ├── repository/UsuarioRepository.java
│   │   ├── service/UsuarioService.java
│   │   └── controller/UsuarioController.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── application-prod.yml
│   │   └── data.sql
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                # Next.js App
│   ├── app/
│   │   ├── page.tsx
│   │   ├── usuarios/page.tsx
│   │   └── usuarios/[id]/page.tsx
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── UsuarioForm.tsx
│   │   └── UsuarioTable.tsx
│   ├── lib/api.ts
│   ├── package.json
│   └── tailwind.config.js
└── docs/
    └── CRUD_Usuarios_Postman_Collection.json
```

## 🛠️ Tecnologías

### Backend
- **Java 21** - Última versión LTS
- **Spring Boot 3.2.5** - Framework principal
- **Spring Data JPA** - ORM y persistencia
- **PostgreSQL** - Base de datos relacional
- **Maven** - Gestión de dependencias
- **Docker** - Contenerización

### Frontend
- **Next.js 14** - Framework React full-stack
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI modernos
- **React Query** - Manejo de estado y caché
- **React Hook Form** - Formularios con validación

## 🚀 Deploy en Render.com

### 1. Preparar Repositorio

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit: CRUD Usuarios TECSUP"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/crud-usuarios.git
git push -u origin main
```

### 2. Backend - PostgreSQL

1. **Crear Base de Datos en Render:**
   - Dashboard → New → PostgreSQL
   - Plan: Free (Oregon)
   - Database Name: `crud_usuarios`
   - User: `postgres`
   
2. **Obtener DATABASE_URL:**
   ```
   postgres://usuario:password@host:5432/crud_usuarios
   ```

### 3. Backend - Web Service

1. **Crear Web Service:**
   - Dashboard → New → Web Service
   - Connect GitHub repository
   - Root Directory: `backend`
   - Runtime: Docker
   - Instance Type: Free

2. **Variables de Entorno:**
   ```
   DATABASE_URL=postgres://usuario:password@host:5432/crud_usuarios
   SPRING_PROFILES_ACTIVE=prod
   ```

3. **Build Command:**
   ```bash
   mvn clean package -DskipTests
   ```

4. **Start Command:**
   ```bash
   java -jar target/*.jar
   ```

### 4. Frontend - Static Site

1. **Crear Static Site:**
   - Dashboard → New → Static Site
   - Connect GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `.next`

2. **Variables de Entorno:**
   ```
   NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
   ```

### 5. URLs Finales

- **Backend**: `https://crud-usuarios-backend.onrender.com`
- **Frontend**: `https://crud-usuarios-frontend.onrender.com`

## 🏃‍♂️ Ejecución Local

### Prerrequisitos
- Java 21+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

### Backend

```bash
cd backend

# Configurar base de datos local
# Editar src/main/resources/application.yml

# Ejecutar
mvn spring-boot:run

# API disponible en: http://localhost:8080
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar desarrollo
npm run dev

# Aplicación disponible en: http://localhost:3000
```

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Listar todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario existente |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### Ejemplo de Request

```json
// POST /api/usuarios
{
    "nombre": "Juan Pérez",
    "email": "juan.perez@tecsup.edu.pe"
}
```

### Ejemplo de Response

```json
{
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan.perez@tecsup.edu.pe",
    "createdAt": "2024-03-25T10:30:00"
}
```

## 🧪 Testing con Postman

1. Importar la colección:
   ```
   docs/CRUD_Usuarios_Postman_Collection.json
   ```

2. Configurar variable:
   ```
   baseUrl: http://localhost:8080
   ```

3. Ejecutar requests en orden:
   - GET all usuarios
   - POST crear usuario
   - GET usuario por ID
   - PUT actualizar usuario
   - DELETE usuario

## 🎨 Características UI/UX

### Design System
- **Colors**: Primary blue (#3B82F6), semantic colors
- **Typography**: Inter font, responsive sizing
- **Components**: shadcn/ui con variantes consistentes
- **Dark Mode**: Soporte completo con CSS variables

### Responsive Design
- **Mobile**: < 768px - Single column, touch-friendly
- **Tablet**: 768px - 1024px - Optimized layout
- **Desktop**: > 1024px - Full features

### Interactions
- **Loading States**: Spinners y skeletons
- **Error Handling**: Toast notifications
- **Form Validation**: Real-time feedback
- **Confirmations**: Dialogs para acciones destructivas

## 📊 Base de Datos

### Schema PostgreSQL

```sql
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Datos de Prueba

```sql
INSERT INTO usuarios (nombre, email, created_at) VALUES
('Roberto Carlos', 'roberto.carlos@tecsup.edu.pe', CURRENT_TIMESTAMP),
('Ana María López', 'ana.lopez@tecsup.edu.pe', CURRENT_TIMESTAMP),
('Carlos Mendoza', 'carlos.mendoza@tecsup.edu.pe', CURRENT_TIMESTAMP),
('Lucía Fernández', 'lucia.fernandez@tecsup.edu.pe', CURRENT_TIMESTAMP),
('Diego Torres', 'diego.torres@tecsup.edu.pe', CURRENT_TIMESTAMP);
```

## 🔧 Configuración

### Backend Production

```yaml
# application-prod.yml
spring:
  datasource:
    url: ${DATABASE_URL}
    hikari:
      maximum-pool-size: 2
      minimum-idle: 1
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
```

### Frontend Environment

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🚀 Performance Optimizations

### Backend
- **Hikari CP**: Pool optimizado para Render free tier
- **JPA DDL**: Update automático de schema
- **CORS**: Configurado para producción

### Frontend
- **React Query**: Caché inteligente y revalidación
- **Code Splitting**: Next.js automatic splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack Bundle Analyzer

## 🐛 Troubleshooting

### Common Issues

1. **Backend no inicia:**
   ```bash
   # Verificar Java 21
   java -version
   
   # Limpiar y recompilar
   mvn clean package
   ```

2. **Frontend no conecta:**
   ```bash
   # Verificar variable de entorno
   echo $NEXT_PUBLIC_API_URL
   
   # Reinstalar dependencias
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Deploy Render falla:**
   - Verificar DATABASE_URL válida
   - Revisar logs del build
   - Confirmar Dockerfile correcto

## 📝 Licencia

MIT License - Proyecto educativo para TECSUP

## 👥 Autor

**Roberto Carlos** - Full Stack Developer  
📧 roberto.carlos@tecsup.edu.pe  
🌐 [tiyuy.com](https://tiyuy.com)

---

## 🎯 Quick Start Commands

```bash
# Clonar y ejecutar en local
git clone <repository-url>
cd CRUD_USUARIOS

# Backend
cd backend
mvn spring-boot:run

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev

# Acceder a http://localhost:3000
```

**¡Listo para deploy en Render en 45 minutos! 🚀**
