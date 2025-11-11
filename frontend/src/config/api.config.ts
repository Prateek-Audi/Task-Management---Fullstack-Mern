// API Configuration
// Update these values with your actual backend URLs and credentials

export const API_CONFIG = {
  // Backend API Base URL - Update this to your backend server URL
  BASE_URL: 'http://localhost:5000/api',
  
  // MongoDB Connection (for your backend)
  MONGODB_URI: 'mongodb://localhost:27017/enterprise_platform',
  
  // PostgreSQL Connection (for your backend)
  POSTGRES_CONFIG: {
    host: 'localhost',
    port: 5432,
    database: 'enterprise_platform',
    user: 'postgres',
    password: 'Prateek@1234'
  },
  
  // JWT Secret (for your backend)
  JWT_SECRET: 'your_jwt_secret_key_here_change_in_production',
  JWT_EXPIRY: '7d',
  
  // OAuth Configuration (for your backend)
  OAUTH: {
    GOOGLE_CLIENT_ID: '101611339516-20j7g480159sc03bs7l538qj0n3d3b2f.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    GITHUB_CLIENT_ID: 'Iv1.a437976763837241',
    GITHUB_CLIENT_SECRET: '6687861775786758675867586758675867586758',
    CALLBACK_URL: 'http://localhost:5000/api/auth/callback'
  },
  
  // Session Configuration (for your backend)
  SESSION_SECRET: 'your_session_secret_here_change_in_production',
  
  // File Upload Configuration
  UPLOAD_DIR: './uploads',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Frontend Settings
  ENABLE_MOCK_DATA: false,
};

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  OAUTH_GOOGLE: '/auth/google',
  OAUTH_GITHUB: '/auth/github',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // E-commerce
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  INVENTORY: '/inventory',
  
  // Task Management
  PROJECTS: '/projects',
  TASKS: '/tasks',
  TEAMS: '/teams',
  ASSIGNMENTS: '/assignments',
  
  // Analytics
  DASHBOARD: '/analytics/dashboard',
  SALES_REPORT: '/analytics/sales',
  TASK_REPORT: '/analytics/tasks',
};
