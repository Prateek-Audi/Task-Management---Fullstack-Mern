import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search, ShoppingCart, Eye } from 'lucide-react';
import type { Order } from '../types';
import { orderService } from '../services/api.service';
import { mockOrders } from '../utils/mockData';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data.length > 0 ? data : mockOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders(mockOrders);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'secondary',
      processing: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive',
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-2">Orders</h1>
        <p className="text-gray-600">
          Manage customer orders and track shipments
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>All Orders</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </TableCell>
                      <TableCell>
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <p>
              Total revenue: ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {(['pending', 'processing', 'shipped', 'delivered'] as const).map((status) => {
          const count = orders.filter(o => o.status === status).length;
          const total = orders.filter(o => o.status === status).reduce((sum, o) => sum + o.total, 0);
          return (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </p>
                  <p className="text-2xl mb-1">{count}</p>
                  <p className="text-xs text-gray-500">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
