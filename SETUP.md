# Full-Stack Application Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v14 or higher)
3. **MongoDB** (v6 or higher)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials:
   ```env
   # PostgreSQL Configuration
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=enterprise_platform
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password_here

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/enterprise_platform

   # JWT Secret (generate a strong random string)
   JWT_SECRET=your_jwt_secret_key_here
   SESSION_SECRET=your_session_secret_here
   ```

5. Create the PostgreSQL database:
   ```sql
   CREATE DATABASE enterprise_platform;
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## Database Setup

### PostgreSQL Tables

You'll need to create the following tables in your PostgreSQL database. Here's a basic schema:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'staff',
  avatar TEXT,
  team_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Collections

MongoDB collections will be created automatically when you use them. The application uses MongoDB for:
- Tasks
- Projects
- Teams
- Other document-based data

## Troubleshooting

### Backend won't start

1. Check that PostgreSQL is running:
   ```bash
   # On Windows (PowerShell)
   Get-Service postgresql*
   
   # On Linux/Mac
   sudo systemctl status postgresql
   ```

2. Verify MongoDB is running:
   ```bash
   # Check MongoDB service
   mongosh
   ```

3. Verify database credentials in `.env` file

### Frontend shows blank screen

1. Check browser console for errors
2. Verify backend is running on port 5000
3. Check that `ENABLE_MOCK_DATA` is set to `false` in `frontend/src/config/api.config.ts`
4. Verify CORS settings in backend allow `http://localhost:3000`

### Connection errors

1. Ensure both databases are running
2. Check firewall settings
3. Verify connection strings in `.env` file
4. Check that ports 3000 (frontend) and 5000 (backend) are not in use

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/products` - Get all products
- `GET /api/orders` - Get all orders
- `GET /api/tasks` - Get all tasks
- `GET /api/projects` - Get all projects

## Next Steps

1. Set up OAuth credentials (Google, GitHub) if needed
2. Configure file upload directory
3. Set up production environment variables
4. Configure SSL certificates for production

