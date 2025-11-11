// API Service Layer - Handles all backend communication
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import type { User, AuthResponse, Product, Order, Customer, Project, Task, Team, DashboardStats } from '../types';

// Mock data flag - set to false when connecting to real backend
const USE_MOCK_DATA = API_CONFIG.ENABLE_MOCK_DATA;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to make API calls
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for session-based auth
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Authentication Services
export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email,
              name: 'Demo User',
              role: 'admin',
              createdAt: new Date().toISOString(),
            },
            token: 'mock_jwt_token_' + Date.now(),
            refreshToken: 'mock_refresh_token',
          });
        }, 1000);
      });
    }
    
    return apiCall<AuthResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async me(): Promise<User> {
    // Uses bearer token automatically via apiCall headers
    return apiCall<User>('/auth/me');
  },

  async register(name: string, email: string, password: string, role: string): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email,
              name,
              role: role as any,
              createdAt: new Date().toISOString(),
            },
            token: 'mock_jwt_token_' + Date.now(),
            refreshToken: 'mock_refresh_token',
          });
        }, 1000);
      });
    }
    
    return apiCall<AuthResponse>(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  async logout(): Promise<void> {
    if (USE_MOCK_DATA) {
      localStorage.removeItem('auth_token');
      return Promise.resolve();
    }
    
    return apiCall<void>(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
  },

  async refreshToken(): Promise<{ token: string }> {
    return apiCall<{ token: string }>(API_ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
    });
  },

  // OAuth methods
  getGoogleAuthUrl(): string {
    return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.OAUTH_GOOGLE}`;
  },

  getGithubAuthUrl(): string {
    return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.OAUTH_GITHUB}`;
  },
};

// Product Services
export const productService = {
  async getAll(): Promise<Product[]> {
    if (USE_MOCK_DATA) {
      // Return mock data
      return Promise.resolve([]);
    }
    return apiCall<Product[]>(API_ENDPOINTS.PRODUCTS);
  },

  async getById(id: string): Promise<Product> {
    return apiCall<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return apiCall<Product>(API_ENDPOINTS.PRODUCTS, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return apiCall<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },

  async delete(id: string): Promise<void> {
    return apiCall<void>(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Order Services
export const orderService = {
  async getAll(): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([]);
    }
    return apiCall<Order[]>(API_ENDPOINTS.ORDERS);
  },

  async getById(id: string): Promise<Order> {
    return apiCall<Order>(`${API_ENDPOINTS.ORDERS}/${id}`);
  },

  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return apiCall<Order>(API_ENDPOINTS.ORDERS, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    return apiCall<Order>(`${API_ENDPOINTS.ORDERS}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Customer Services
export const customerService = {
  async getAll(): Promise<Customer[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([]);
    }
    return apiCall<Customer[]>(API_ENDPOINTS.CUSTOMERS);
  },

  async getById(id: string): Promise<Customer> {
    return apiCall<Customer>(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  },

  async create(customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'createdAt'>): Promise<Customer> {
    return apiCall<Customer>(API_ENDPOINTS.CUSTOMERS, {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  },
};

// Project Services
export const projectService = {
  async getAll(): Promise<Project[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([]);
    }
    return apiCall<Project[]>(API_ENDPOINTS.PROJECTS);
  },

  async getById(id: string): Promise<Project> {
    return apiCall<Project>(`${API_ENDPOINTS.PROJECTS}/${id}`);
  },

  async create(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    return apiCall<Project>(API_ENDPOINTS.PROJECTS, {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    return apiCall<Project>(`${API_ENDPOINTS.PROJECTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },

  async delete(id: string): Promise<void> {
    return apiCall<void>(`${API_ENDPOINTS.PROJECTS}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Task Services
export const taskService = {
  async getAll(): Promise<Task[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([]);
    }
    return apiCall<Task[]>(API_ENDPOINTS.TASKS);
  },

  async getById(id: string): Promise<Task> {
    return apiCall<Task>(`${API_ENDPOINTS.TASKS}/${id}`);
  },

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return apiCall<Task>(API_ENDPOINTS.TASKS, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  async update(id: string, task: Partial<Task>): Promise<Task> {
    return apiCall<Task>(`${API_ENDPOINTS.TASKS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  },

  async delete(id: string): Promise<void> {
    return apiCall<void>(`${API_ENDPOINTS.TASKS}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Team Services
export const teamService = {
  async getAll(): Promise<Team[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([]);
    }
    return apiCall<Team[]>(API_ENDPOINTS.TEAMS);
  },

  async getById(id: string): Promise<Team> {
    return apiCall<Team>(`${API_ENDPOINTS.TEAMS}/${id}`);
  },

  async create(team: Omit<Team, 'id' | 'memberCount' | 'projectCount' | 'createdAt'>): Promise<Team> {
    return apiCall<Team>(API_ENDPOINTS.TEAMS, {
      method: 'POST',
      body: JSON.stringify(team),
    });
  },
};

// Analytics Services
export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
        totalTasks: 0,
        completedTasks: 0,
        activeTasks: 0,
        totalProjects: 0,
      });
    }
    return apiCall<DashboardStats>(API_ENDPOINTS.DASHBOARD);
  },
};

// File Upload Service
export const uploadService = {
  async uploadFile(file: File, type: 'product' | 'avatar' | 'attachment'): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const token = getAuthToken();
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  },
};
