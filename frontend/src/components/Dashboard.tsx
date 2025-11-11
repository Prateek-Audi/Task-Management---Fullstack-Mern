import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import type { DashboardStats } from '../types';
import { analyticsService } from '../services/api.service';
import { mockOrders, mockProducts, mockCustomers, mockTasks, mockProjects } from '../utils/mockData';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalTasks: 0,
    completedTasks: 0,
    activeTasks: 0,
    totalProjects: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const data = await analyticsService.getDashboardStats();
      
      // If no data from backend, use mock data
      if (data.totalOrders === 0) {
        setStats({
          totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
          totalOrders: mockOrders.length,
          totalProducts: mockProducts.length,
          totalCustomers: mockCustomers.length,
          totalTasks: mockTasks.length,
          completedTasks: mockTasks.filter(t => t.status === 'done').length,
          activeTasks: mockTasks.filter(t => t.status !== 'done').length,
          totalProjects: mockProjects.length,
        });
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      // Fallback to mock data
      setStats({
        totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
        totalOrders: mockOrders.length,
        totalProducts: mockProducts.length,
        totalCustomers: mockCustomers.length,
        totalTasks: mockTasks.length,
        completedTasks: mockTasks.filter(t => t.status === 'done').length,
        activeTasks: mockTasks.filter(t => t.status !== 'done').length,
        totalProjects: mockProjects.length,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Total sales revenue',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      description: 'All time orders',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Products',
      value: stats.totalProducts.toString(),
      description: 'In catalog',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Customers',
      value: stats.totalCustomers.toString(),
      description: 'Total customers',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Active Tasks',
      value: stats.activeTasks.toString(),
      description: 'In progress',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks.toString(),
      description: 'Successfully completed',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects.toString(),
      description: 'All projects',
      icon: Activity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Task Completion',
      value: stats.totalTasks > 0 
        ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}%`
        : '0%',
      description: 'Overall completion rate',
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your business and task management metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">{stat.value}</div>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>E-Commerce Overview</CardTitle>
            <CardDescription>Quick stats about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm">Average Order Value</p>
                  <p className="text-xs text-gray-600">Per transaction</p>
                </div>
              </div>
              <p className="text-lg">
                ${stats.totalOrders > 0 
                  ? (stats.totalRevenue / stats.totalOrders).toFixed(2)
                  : '0.00'}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm">Pending Orders</p>
                  <p className="text-xs text-gray-600">Awaiting processing</p>
                </div>
              </div>
              <p className="text-lg">
                {mockOrders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded">
                  <Package className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm">Low Stock Items</p>
                  <p className="text-xs text-gray-600">Need restocking</p>
                </div>
              </div>
              <p className="text-lg">
                {mockProducts.filter(p => p.stock < 20).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Management Overview</CardTitle>
            <CardDescription>Current project status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm">Tasks In Progress</p>
                  <p className="text-xs text-gray-600">Currently working on</p>
                </div>
              </div>
              <p className="text-lg">
                {mockTasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded">
                  <Activity className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm">Urgent Tasks</p>
                  <p className="text-xs text-gray-600">High priority</p>
                </div>
              </div>
              <p className="text-lg">
                {mockTasks.filter(t => t.priority === 'urgent').length}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm">Active Projects</p>
                  <p className="text-xs text-gray-600">In progress</p>
                </div>
              </div>
              <p className="text-lg">
                {mockProjects.filter(p => p.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
