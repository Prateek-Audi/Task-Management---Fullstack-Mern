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
import { Plus, Search, Edit, Trash2, CheckCircle2, Clock } from 'lucide-react';
import type { Task } from '../types';
import { taskService } from '../services/api.service';
import { mockTasks } from '../utils/mockData';

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data.length > 0 ? data : mockTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assigneeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Task['status']) => {
    const colors = {
      'todo': 'secondary',
      'in-progress': 'default',
      'review': 'default',
      'done': 'default',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'warning',
      'urgent': 'destructive',
    };
    return colors[priority];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-2">Tasks</h1>
        <p className="text-gray-600">
          Manage team tasks and track progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {(['todo', 'in-progress', 'review', 'done'] as const).map((status) => {
          const count = tasks.filter(t => t.status === status).length;
          const Icon = status === 'done' ? CheckCircle2 : Clock;
          return (
            <Card 
              key={status}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </p>
                    <p className="text-2xl">{count}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>All Tasks</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
          {statusFilter !== 'all' && (
            <div className="flex items-center gap-2 mt-2">
              <Badge>
                Filter: {statusFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Clear filter
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p>{task.title}</p>
                          {task.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{task.projectName}</Badge>
                      </TableCell>
                      <TableCell>{task.assigneeName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {formatDate(task.dueDate)}
                          {isOverdue(task.dueDate) && task.status !== 'done' && (
                            <Badge variant="destructive" className="text-xs">
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(task.priority) as any}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(task.status) as any}>
                          {task.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing {filteredTasks.length} of {tasks.length} tasks
            </p>
            <p>
              {tasks.filter(t => t.status === 'done').length} completed, {tasks.filter(t => isOverdue(t.dueDate) && t.status !== 'done').length} overdue
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
