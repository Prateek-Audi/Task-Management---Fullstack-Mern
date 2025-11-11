import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Plus, Search, FolderOpen } from 'lucide-react';
import type { Project } from '../types';
import { projectService } from '../services/api.service';
import { mockProjects } from '../utils/mockData';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data.length > 0 ? data : mockProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(mockProjects);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Project['status']) => {
    const colors = {
      'planning': 'secondary',
      'active': 'default',
      'on-hold': 'warning',
      'completed': 'default',
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
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="mb-2">Projects</h1>
        <p className="text-gray-600">
          Manage your projects and track team progress
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 sm:w-64"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No projects found</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(project.status) as any}>
                    {project.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Start Date</p>
                    <p>{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">End Date</p>
                    <p>{project.endDate ? formatDate(project.endDate) : 'Ongoing'}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {(['planning', 'active', 'on-hold', 'completed'] as const).map((status) => {
          const count = projects.filter(p => p.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </p>
                  <p className="text-2xl">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
