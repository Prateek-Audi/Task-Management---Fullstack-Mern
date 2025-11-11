// Type Definitions for the Application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
  avatar?: string;
  createdAt: string;
  teamId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// E-commerce Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Inventory {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// Task Management Types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate?: string;
  teamId: string;
  progress: number;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assigneeId: string;
  assigneeName: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  projectCount: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  taskId: string;
  userId: string;
  assignedAt: string;
  completedAt?: string;
}

// Analytics Types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  totalProjects: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TaskData {
  date: string;
  completed: number;
  created: number;
}
