// API Configuration
// Update these values with your actual backend URLs and credentials

export const API_CONFIG = {
  // Frontend-safe config (do not include backend secrets here)
  BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 5 * 1024 * 1024,
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  OAUTH: {
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
    CALLBACK_URL:
      import.meta.env.VITE_OAUTH_CALLBACK_URL ??
      `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'}/auth/callback`,
  },
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
