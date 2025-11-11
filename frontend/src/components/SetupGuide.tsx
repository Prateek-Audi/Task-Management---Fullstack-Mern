import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import {
  Database,
  Server,
  Lock,
  FileCode,
  TestTube,
  Package,
  Terminal,
  CheckCircle2,
  Code2,
  Blocks,
  Download,
  Play,
  AlertTriangle,
  Info,
  Lightbulb,
  Monitor,
  Clock,
  Zap
} from 'lucide-react';

export function SetupGuide() {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (code: string, id: string) => {
    // Use legacy execCommand method directly - more reliable in iframe contexts
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(''), 2000);
      }
    } catch (err) {
      // Silently fail - user can manually copy
    } finally {
      textArea.remove();
    }
  };

  const CodeBlock = ({ code, id, language = 'bash' }: { code: string; id: string; language?: string }) => (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? '✓ Copied!' : 'Copy'}
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="h-8 w-8 text-blue-600" />
          <h1 className="mb-0">Complete Backend Setup Guide</h1>
        </div>
        <p className="text-gray-600">
          Everything you need to master MERN Stack with PostgreSQL, MongoDB, Authentication, and Jest Testing for your interview
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            10 Days to Interview
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Windows Optimized
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="postgres">PostgreSQL</TabsTrigger>
          <TabsTrigger value="mongodb">MongoDB</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="jest">Jest Testing</TabsTrigger>
          <TabsTrigger value="connection">Connect</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                🎯 Your Learning Path (10 Days)
              </CardTitle>
              <CardDescription>
                Structured plan to master full-stack development before your interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Badge className="bg-blue-600">Day 1-2</Badge>
                  <div className="flex-1">
                    <p className="font-medium">Database Setup</p>
                    <p className="text-sm text-gray-600">Install PostgreSQL & MongoDB, create schemas</p>
                  </div>
                  <Badge variant="outline">2 hours</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Badge className="bg-blue-600">Day 3-4</Badge>
                  <div className="flex-1">
                    <p className="font-medium">Backend Development</p>
                    <p className="text-sm text-gray-600">Build Express server, implement all API endpoints</p>
                  </div>
                  <Badge variant="outline">6 hours</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Badge className="bg-blue-600">Day 5-6</Badge>
                  <div className="flex-1">
                    <p className="font-medium">Authentication System</p>
                    <p className="text-sm text-gray-600">Implement JWT, sessions, cookies, OAuth</p>
                  </div>
                  <Badge variant="outline">4 hours</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Badge className="bg-blue-600">Day 7-8</Badge>
                  <div className="flex-1">
                    <p className="font-medium">Testing with Jest</p>
                    <p className="text-sm text-gray-600">Write unit & integration tests</p>
                  </div>
                  <Badge variant="outline">3 hours</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Badge className="bg-blue-600">Day 9-10</Badge>
                  <div className="flex-1">
                    <p className="font-medium">Integration & Practice</p>
                    <p className="text-sm text-gray-600">Connect frontend, debug, interview prep</p>
                  </div>
                  <Badge variant="outline">3 hours</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Blocks className="h-6 w-6" />
                Project Architecture
              </CardTitle>
              <CardDescription>
                Understanding what's built and what you need to create
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <h3 className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Frontend (✅ Complete)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>React 18 with TypeScript</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Tailwind CSS + ShadCN UI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>6 Pages: Dashboard, Products, Orders, Tasks, Projects, Auth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>API service layer ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Authentication context setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Mock data for development</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-300">
                  <h3 className="flex items-center gap-2 mb-3">
                    <Terminal className="h-5 w-5 text-yellow-600" />
                    Backend (⚡ You Build This)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>Node.js + Express server</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>PostgreSQL (12 tables for structured data)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>MongoDB (5 collections for flexible data)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>JWT + OAuth authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>20+ RESTful API endpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">○</span>
                      <span>Jest tests (unit + integration)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <AlertTitle>Pro Tip: Project Organization</AlertTitle>
                <AlertDescription className="text-sm mt-2">
                  <p className="mb-2">Create your backend folder alongside the frontend:</p>
                  <div className="bg-white p-3 rounded border font-mono text-xs">
                    <div>📁 my-project/</div>
                    <div className="ml-4">📁 frontend/ <span className="text-green-600">(this app - already done)</span></div>
                    <div className="ml-4">📁 backend/ <span className="text-yellow-600">(you create this)</span></div>
                  </div>
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  What You'll Learn & Practice
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 border rounded bg-gray-50">
                    <p className="font-medium mb-2 text-sm">SQL Skills</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• Complex JOINs</li>
                      <li>• Aggregations</li>
                      <li>• Transactions</li>
                      <li>• Indexes</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded bg-gray-50">
                    <p className="font-medium mb-2 text-sm">NoSQL Skills</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• Document operations</li>
                      <li>• Aggregations</li>
                      <li>• Schema design</li>
                      <li>• Indexing</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded bg-gray-50">
                    <p className="font-medium mb-2 text-sm">Backend Skills</p>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>• RESTful APIs</li>
                      <li>• Authentication</li>
                      <li>• Testing</li>
                      <li>• Error handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                Interview Topics Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="font-medium mb-2 text-sm">Database Questions</p>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>✓ SQL vs NoSQL differences</li>
                    <li>✓ When to use PostgreSQL vs MongoDB</li>
                    <li>✓ Database normalization</li>
                    <li>✓ Indexing strategies</li>
                    <li>✓ Transaction management</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2 text-sm">Backend Questions</p>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>✓ RESTful API design principles</li>
                    <li>✓ JWT vs Session authentication</li>
                    <li>✓ OAuth 2.0 flow</li>
                    <li>✓ Middleware pattern</li>
                    <li>✓ Error handling strategies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POSTGRESQL TAB */}
        <TabsContent value="postgres" className="space-y-6">
          <Alert className="border-blue-500 bg-blue-50">
            <Monitor className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">🪟 Windows User Guide</AlertTitle>
            <AlertDescription className="text-blue-800">
              All instructions below are optimized for Windows. Follow step-by-step!
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6" />
                Step 1: Install PostgreSQL (15 minutes)
              </CardTitle>
              <CardDescription>
                Setting up your relational database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-blue-500 rounded-lg p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Badge className="bg-blue-600">Windows</Badge>
                  <span>Method 1: Installer (Recommended for Beginners)</span>
                </h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                      Download PostgreSQL
                    </p>
                    <p className="text-sm text-gray-700 ml-8">
                      Visit: <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono">
                        https://www.postgresql.org/download/windows/
                      </a>
                    </p>
                    <p className="text-sm text-gray-700 ml-8 mt-1">
                      Download PostgreSQL <strong>15</strong> or <strong>16</strong> (64-bit installer)
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                      Run the Installer
                    </p>
                    <ul className="text-sm space-y-1 ml-8 text-gray-700">
                      <li>• Double-click the .exe file</li>
                      <li>• Installation directory: <code className="bg-gray-100 px-2 py-0.5 rounded">C:\Program Files\PostgreSQL\15</code> (keep default)</li>
                      <li>• Select all components (keep defaults checked)</li>
                      <li>• <strong className="text-red-600">⚠️ IMPORTANT:</strong> Set a password and <strong>REMEMBER IT!</strong> (e.g., "postgres123")</li>
                      <li>• Port: <code className="bg-gray-100 px-2 py-0.5 rounded">5432</code> (keep default)</li>
                      <li>• Locale: keep default</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                      Verify Installation
                    </p>
                    <p className="text-sm text-gray-700 ml-8 mb-2">
                      Open <strong>Command Prompt</strong> (Win + R, type "cmd", press Enter) and run:
                    </p>
                    <div className="ml-8">
                      <CodeBlock
                        id="pg-verify"
                        code={`psql --version`}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        ✓ Should display: <code className="bg-gray-100 px-2 py-0.5 rounded">psql (PostgreSQL) 15.x</code>
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Troubleshooting:</strong> If "psql is not recognized", you need to add PostgreSQL to your PATH:
                    <ol className="list-decimal ml-4 mt-2 text-xs space-y-1">
                      <li>Search "Environment Variables" in Windows</li>
                      <li>Edit "Path" in System variables</li>
                      <li>Add: <code className="bg-gray-100 px-2 py-0.5 rounded">C:\Program Files\PostgreSQL\15\bin</code></li>
                      <li>Restart Command Prompt</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Badge>2</Badge>
                  Create Database & Run Schema
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-medium mb-2 text-sm">Connect to PostgreSQL:</p>
                    <CodeBlock
                      id="pg-connect"
                      code={`psql -U postgres`}
                    />
                    <p className="text-sm text-gray-600 mt-2">Enter the password you set during installation</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="font-medium mb-2 text-sm">Create the database:</p>
                    <CodeBlock
                      id="pg-create-db"
                      language="sql"
                      code={`CREATE DATABASE enterprise_platform;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE enterprise_platform TO myuser;
\\q`}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Badge>3</Badge>
                  Database Schema (Copy & Run This!)
                </h3>

                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This creates <strong>12 tables</strong> for your enterprise app: users, teams, products, orders, customers, inventory, projects, tasks, and more.
                  </AlertDescription>
                </Alert>

                <CodeBlock
                  id="pg-schema"
                  language="sql"
                  code={`-- Users Table (for authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'staff', 'customer')),
    avatar VARCHAR(500),
    team_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key for users.team_id
ALTER TABLE users ADD CONSTRAINT fk_user_team 
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    last_restocked TIMESTAMP,
    UNIQUE(product_id)
);

-- Customers Table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    team_id INTEGER REFERENCES teams(id),
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    assignee_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('todo', 'in-progress', 'review', 'done')),
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task Assignments Table (many-to-many)
CREATE TABLE task_assignments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(task_id, user_id)
);

-- Sessions Table (for session-based auth)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);

-- Insert some initial data
INSERT INTO teams (name, description) VALUES 
    ('Engineering', 'Software development team'),
    ('Sales', 'Sales and customer relations'),
    ('Marketing', 'Marketing and content team');

INSERT INTO categories (name, description) VALUES 
    ('Electronics', 'Electronic devices and gadgets'),
    ('Clothing', 'Apparel and accessories'),
    ('Home & Garden', 'Home improvement and garden supplies');

-- Success message
SELECT 'Database schema created successfully!' AS message;`}
                />

                <Alert className="mt-4 border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <strong>How to run this:</strong> Copy the SQL above, then:
                    <ol className="list-decimal ml-4 mt-2 text-sm">
                      <li>Connect to your database: <code className="bg-white px-2 py-0.5 rounded">psql -U postgres -d enterprise_platform</code></li>
                      <li>Paste the SQL code and press Enter</li>
                      <li>Verify tables: <code className="bg-white px-2 py-0.5 rounded">\dt</code></li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3">📚 Common PostgreSQL Commands (Cheat Sheet)</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm font-medium mb-2">Database Commands:</p>
                    <CodeBlock
                      id="pg-commands-db"
                      code={`\\l                 -- List all databases
\\c dbname          -- Connect to database
\\dt                -- List all tables
\\d tablename       -- Describe table structure
\\q                 -- Quit`}
                    />
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm font-medium mb-2">Query Examples:</p>
                    <CodeBlock
                      id="pg-queries"
                      language="sql"
                      code={`SELECT * FROM users LIMIT 5;
SELECT COUNT(*) FROM products;
SELECT * FROM orders WHERE status='pending';`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Interview Questions: PostgreSQL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What is a JOIN and when do you use it?</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Answer:</strong> A JOIN combines rows from two or more tables based on a related column. Types:
                  </p>
                  <ul className="text-sm text-gray-600 ml-4 space-y-1">
                    <li>• <strong>INNER JOIN:</strong> Returns matching rows from both tables</li>
                    <li>• <strong>LEFT JOIN:</strong> Returns all rows from left table, matched rows from right</li>
                    <li>• <strong>RIGHT JOIN:</strong> Returns all rows from right table, matched rows from left</li>
                  </ul>
                  <CodeBlock
                    id="join-example"
                    language="sql"
                    code={`-- Example: Get all orders with customer info
SELECT orders.id, customers.name, orders.total_amount 
FROM orders 
INNER JOIN customers ON orders.customer_id = customers.id;`}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What are indexes and why use them?</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Answer:</strong> Indexes speed up data retrieval by creating a data structure that allows quick lookups. Like a book index!
                  </p>
                  <CodeBlock
                    id="index-example"
                    language="sql"
                    code={`-- Create index on frequently queried column
CREATE INDEX idx_users_email ON users(email);

-- Use when: searching, sorting, or joining on that column`}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What is a transaction?</p>
                  <p className="text-sm text-gray-700">
                    <strong>Answer:</strong> A transaction is a sequence of operations that execute as a single unit. Either all succeed (COMMIT) or all fail (ROLLBACK). ACID properties: Atomicity, Consistency, Isolation, Durability.
                  </p>
                  <CodeBlock
                    id="transaction-example"
                    language="sql"
                    code={`BEGIN;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 1;
INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 1, 1);
COMMIT; -- Or ROLLBACK if error`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MONGODB TAB */}
        <TabsContent value="mongodb" className="space-y-6">
          <Alert className="border-blue-500 bg-blue-50">
            <Monitor className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">🪟 Windows User Guide</AlertTitle>
            <AlertDescription className="text-blue-800">
              MongoDB installation and setup for Windows
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6" />
                Step 1: Install MongoDB (15 minutes)
              </CardTitle>
              <CardDescription>
                Setting up your NoSQL document database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-green-500 rounded-lg p-5 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Badge className="bg-green-600">Windows</Badge>
                  <span>Method 1: Installer (Recommended)</span>
                </h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                      Download MongoDB
                    </p>
                    <p className="text-sm text-gray-700 ml-8">
                      Visit: <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-mono">
                        https://www.mongodb.com/try/download/community
                      </a>
                    </p>
                    <ul className="text-sm text-gray-700 ml-8 mt-2 space-y-1">
                      <li>• Version: <strong>7.0.x</strong> (latest stable)</li>
                      <li>• Platform: <strong>Windows</strong></li>
                      <li>• Package: <strong>MSI</strong></li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                      Run the Installer
                    </p>
                    <ul className="text-sm space-y-1 ml-8 text-gray-700">
                      <li>• Double-click the .msi file</li>
                      <li>• Choose <strong>"Complete"</strong> installation</li>
                      <li>• ✅ Check <strong>"Install MongoDB as a Service"</strong></li>
                      <li>• Service Name: <code className="bg-gray-100 px-2 py-0.5 rounded">MongoDB</code> (default)</li>
                      <li>• ✅ Check <strong>"Install MongoDB Compass"</strong> (GUI tool - very helpful!)</li>
                      <li>• Wait for installation (2-3 minutes)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                      Verify Installation
                    </p>
                    <p className="text-sm text-gray-700 ml-8 mb-2">
                      Open <strong>Command Prompt</strong> and run:
                    </p>
                    <div className="ml-8">
                      <CodeBlock
                        id="mongo-verify"
                        code={`mongod --version`}
                      />
                      <p className="text-sm text-gray-600 mt-2 mb-3">
                        ✓ Should display MongoDB version info
                      </p>
                      <CodeBlock
                        id="mongo-connect"
                        code={`mongosh`}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        ✓ Should connect to <code className="bg-gray-100 px-2 py-0.5 rounded">mongodb://localhost:27017</code>
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Troubleshooting:</strong>
                    <ul className="list-disc ml-4 mt-2 text-xs space-y-1">
                      <li>If "mongod not recognized": Add <code className="bg-gray-100 px-2 py-0.5 rounded">C:\Program Files\MongoDB\Server\7.0\bin</code> to PATH</li>
                      <li>If service won't start: Create data directory <code className="bg-gray-100 px-2 py-0.5 rounded">C:\data\db</code></li>
                      <li>Start service manually: <code className="bg-gray-100 px-2 py-0.5 rounded">net start MongoDB</code> in Command Prompt (as Administrator)</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Badge>2</Badge>
                  MongoDB Schemas (Mongoose Models)
                </h3>

                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    MongoDB is schema-less, but we use <strong>Mongoose</strong> to define schemas in Node.js for data validation and structure.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2 text-sm">Activity Logs Schema:</p>
                    <CodeBlock
                      id="mongo-activity"
                      language="javascript"
                      code={`// models/mongodb/ActivityLog.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'login', 'logout', 'view']
  },
  resource: {
    type: String,
    required: true,
    enum: ['product', 'order', 'task', 'project', 'user']
  },
  resourceId: String,
  details: {
    type: mongoose.Schema.Types.Mixed, // Flexible!
    default: {}
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);`}
                    />
                  </div>

                  <div>
                    <p className="font-medium mb-2 text-sm">Notifications Schema:</p>
                    <CodeBlock
                      id="mongo-notifications"
                      language="javascript"
                      code={`// models/mongodb/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['order', 'task', 'system', 'reminder']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  }
});

module.exports = mongoose.model('Notification', notificationSchema);`}
                    />
                  </div>

                  <div>
                    <p className="font-medium mb-2 text-sm">Product Reviews Schema (with nested data):</p>
                    <CodeBlock
                      id="mongo-reviews"
                      language="javascript"
                      code={`// models/mongodb/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  comment: String,
  images: [String], // Array of image URLs
  helpful: {
    count: { type: Number, default: 0 },
    users: [String] // User IDs who found it helpful
  },
  verified_purchase: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);`}
                    />
                  </div>

                  <div>
                    <p className="font-medium mb-2 text-sm">Task Comments Schema (nested with replies):</p>
                    <CodeBlock
                      id="mongo-comments"
                      language="javascript"
                      code={`// models/mongodb/TaskComment.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema] // Nested documents!
});

const taskCommentSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('TaskComment', taskCommentSchema);`}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3">📚 MongoDB Query Examples (Cheat Sheet)</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm font-medium mb-2">Basic Operations:</p>
                    <CodeBlock
                      id="mongo-basic"
                      language="javascript"
                      code={`// Create
await ActivityLog.create({
  userId: '123',
  action: 'login',
  resource: 'user',
  ipAddress: '192.168.1.1'
});

// Find
const logs = await ActivityLog.find({ userId: '123' });

// Update
await Notification.updateOne(
  { _id: notificationId },
  { $set: { read: true } }
);

// Delete
await Review.deleteOne({ _id: reviewId });`}
                    />
                  </div>

                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm font-medium mb-2">Advanced Queries:</p>
                    <CodeBlock
                      id="mongo-advanced"
                      language="javascript"
                      code={`// Aggregation pipeline
const stats = await ActivityLog.aggregate([
  { $match: { userId: '123' } },
  { $group: { 
      _id: '$action', 
      count: { $sum: 1 } 
  }},
  { $sort: { count: -1 } }
]);

// Array operations
await Review.updateOne(
  { _id: reviewId },
  { $push: { 'helpful.users': userId } }
);

// Nested array operations
await TaskComment.updateOne(
  { taskId: 'task-123', 'comments._id': commentId },
  { $push: { 'comments.$.replies': replyData } }
);`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Interview Questions: MongoDB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: SQL vs NoSQL - When to use each?</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-green-600 mb-1">Use PostgreSQL when:</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>• Structured data with relationships</li>
                        <li>• Need ACID transactions</li>
                        <li>• Complex queries with JOINs</li>
                        <li>• Data integrity is critical</li>
                        <li className="font-medium pt-1">Examples: Orders, Users, Products</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600 mb-1">Use MongoDB when:</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>• Flexible/changing schema</li>
                        <li>• Nested/hierarchical data</li>
                        <li>• High write volume</li>
                        <li>• Document-based data</li>
                        <li className="font-medium pt-1">Examples: Logs, Comments, Reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What are aggregation pipelines?</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Answer:</strong> A way to process data in stages (like Unix pipes). Each stage transforms the documents.
                  </p>
                  <CodeBlock
                    id="aggregation-example"
                    language="javascript"
                    code={`// Get average rating per product
await Review.aggregate([
  { $group: { 
      _id: '$productId', 
      avgRating: { $avg: '$rating' },
      count: { $sum: 1 }
  }},
  { $sort: { avgRating: -1 } }
]);`}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: Embedded vs Referenced documents?</p>
                  <p className="text-sm text-gray-700">
                    <strong>Answer:</strong> <strong>Embedded</strong> = store related data in same document (faster reads, use for data accessed together). <strong>Referenced</strong> = store IDs and link documents (less duplication, use for data that changes frequently).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BACKEND TAB */}
        <TabsContent value="backend" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-6 w-6" />
                Step 1: Initialize Backend Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Windows Tip:</strong> Open Command Prompt or PowerShell in your project directory
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <p className="font-medium text-sm">Create backend folder:</p>
                <CodeBlock
                  id="backend-init"
                  code={`# Create and enter backend directory
mkdir backend
cd backend

# Initialize npm project
npm init -y`}
                />
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm">Install ALL dependencies (copy entire command):</p>
                <CodeBlock
                  id="backend-deps"
                  code={`npm install express cors dotenv pg mongoose bcryptjs jsonwebtoken express-session cookie-parser passport passport-google-oauth20 passport-github2 express-validator multer`}
                />
                <p className="text-xs text-gray-600">This installs: Express, database drivers, authentication, validation, file uploads</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm">Install dev dependencies:</p>
                <CodeBlock
                  id="backend-dev-deps"
                  code={`npm install --save-dev nodemon typescript @types/node @types/express ts-node @types/bcryptjs @types/jsonwebtoken @types/express-session @types/cookie-parser @types/passport @types/passport-google-oauth20 jest @types/jest ts-jest supertest @types/supertest`}
                />
                <p className="text-xs text-gray-600">This installs: TypeScript, testing tools, type definitions</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm">Initialize TypeScript:</p>
                <CodeBlock
                  id="backend-ts"
                  code={`npx tsc --init`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-6 w-6" />
                Step 2: Project Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm">
                <div>backend/</div>
                <div className="ml-3">├── src/</div>
                <div className="ml-6">│   ├── config/</div>
                <div className="ml-9">│   │   ├── database.ts <span className="text-gray-500">// DB connections</span></div>
                <div className="ml-9">│   │   ├── passport.ts <span className="text-gray-500">// OAuth config</span></div>
                <div className="ml-9">│   │   └── config.ts <span className="text-gray-500">// App config</span></div>
                <div className="ml-6">│   ├── models/</div>
                <div className="ml-9">│   │   ├── postgres/ <span className="text-gray-500">// PostgreSQL models</span></div>
                <div className="ml-9">│   │   └── mongodb/ <span className="text-gray-500">// Mongoose schemas</span></div>
                <div className="ml-6">│   ├── routes/</div>
                <div className="ml-9">│   │   ├── auth.routes.ts</div>
                <div className="ml-9">│   │   ├── product.routes.ts</div>
                <div className="ml-9">│   │   ├── order.routes.ts</div>
                <div className="ml-9">│   │   ├── task.routes.ts</div>
                <div className="ml-9">│   │   └── project.routes.ts</div>
                <div className="ml-6">│   ├── controllers/</div>
                <div className="ml-9">│   │   ├── auth.controller.ts</div>
                <div className="ml-9">│   │   ├── product.controller.ts</div>
                <div className="ml-9">│   │   └── ...</div>
                <div className="ml-6">│   ├── middleware/</div>
                <div className="ml-9">│   │   ├── auth.middleware.ts</div>
                <div className="ml-9">│   │   ├── error.middleware.ts</div>
                <div className="ml-9">│   │   └── validation.middleware.ts</div>
                <div className="ml-6">│   ├── services/</div>
                <div className="ml-9">│   │   ├── auth.service.ts</div>
                <div className="ml-9">│   │   └── ...</div>
                <div className="ml-6">│   ├── utils/</div>
                <div className="ml-9">│   │   └── helpers.ts</div>
                <div className="ml-6">│   └── server.ts <span className="text-gray-500">// Main entry point</span></div>
                <div className="ml-3">├── tests/</div>
                <div className="ml-6">│   ├── unit/</div>
                <div className="ml-6">│   └── integration/</div>
                <div className="ml-3">├── .env <span className="text-gray-500">// Environment variables</span></div>
                <div className="ml-3">├── package.json</div>
                <div className="ml-3">└── tsconfig.json</div>
              </div>

              <Alert className="mt-4">
                <Terminal className="h-4 w-4" />
                <AlertDescription>
                  <strong>Create folders:</strong> Run this in your backend directory
                  <CodeBlock
                    id="create-structure"
                    code={`mkdir src src\\config src\\models src\\models\\postgres src\\models\\mongodb src\\routes src\\controllers src\\middleware src\\services src\\utils tests tests\\unit tests\\integration`}
                  />
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-6 w-6" />
                Step 3: Create Express Server
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2 text-sm">src/config/database.ts - Database Connections:</p>
                <CodeBlock
                  id="database-config"
                  language="typescript"
                  code={`import { Pool } from 'pg';
import mongoose from 'mongoose';

// PostgreSQL Connection
export const pgPool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'enterprise_platform',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/enterprise_platform'
    );
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test PostgreSQL connection
pgPool.on('connect', () => {
  console.log('✓ PostgreSQL connected');
});

pgPool.on('error', (err) => {
  console.error('PostgreSQL error:', err);
});`}
                />
              </div>

              <div>
                <p className="font-medium mb-2 text-sm">src/server.ts - Main Server File:</p>
                <CodeBlock
                  id="server-main"
                  language="typescript"
                  code={`import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { connectMongoDB, pgPool } from './config/database';

// Import routes (you'll create these)
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import taskRoutes from './routes/task.routes';
import projectRoutes from './routes/project.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
const startServer = async () => {
  try {
    await connectMongoDB();
    await pgPool.connect();
    
    app.listen(PORT, () => {
      console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();`}
                />
              </div>

              <div>
                <p className="font-medium mb-2 text-sm">.env - Environment Variables:</p>
                <CodeBlock
                  id="env-file"
                  code={`PORT=5000
NODE_ENV=development

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=enterprise_platform
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/enterprise_platform

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Session
SESSION_SECRET=your_session_secret_change_this

# OAuth (get these from Google/GitHub)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Frontend
FRONTEND_URL=http://localhost:3000`}
                />
              </div>

              <div>
                <p className="font-medium mb-2 text-sm">package.json - Add scripts:</p>
                <CodeBlock
                  id="package-scripts"
                  language="json"
                  code={`{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}`}
                />
              </div>

              <Alert className="border-green-200 bg-green-50">
                <Play className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Start Development Server</AlertTitle>
                <AlertDescription>
                  <CodeBlock
                    id="start-server"
                    code={`npm run dev`}
                  />
                  <p className="text-sm mt-2">Server should start on http://localhost:5000 🚀</p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                Step 4: Example API Route & Controller
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2 text-sm">src/routes/product.routes.ts:</p>
                <CodeBlock
                  id="product-routes"
                  language="typescript"
                  code={`import express from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (require authentication)
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;`}
                />
              </div>

              <div>
                <p className="font-medium mb-2 text-sm">src/controllers/product.controller.ts:</p>
                <CodeBlock
                  id="product-controller"
                  language="typescript"
                  code={`import { Request, Response } from 'express';
import { pgPool } from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pgPool.query(\`
      SELECT p.*, c.name as category_name, i.quantity as stock
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      ORDER BY p.created_at DESC
    \`);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(\`
      SELECT p.*, c.name as category_name, i.quantity as stock
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.id = $1
    \`, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id, image_url } = req.body;
    
    const result = await pgPool.query(\`
      INSERT INTO products (name, description, price, category_id, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    \`, [name, description, price, category_id, image_url]);
    
    // Also create inventory record
    await pgPool.query(\`
      INSERT INTO inventory (product_id, quantity)
      VALUES ($1, 0)
    \`, [result.rows[0].id]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url } = req.body;
    
    const result = await pgPool.query(\`
      UPDATE products
      SET name = $1, description = $2, price = $3, 
          category_id = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    \`, [name, description, price, category_id, image_url, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(\`
      DELETE FROM products WHERE id = $1 RETURNING *
    \`, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};`}
                />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pattern to follow:</strong> Create similar routes and controllers for orders, tasks, projects, etc. This example shows the complete CRUD pattern.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AUTHENTICATION TAB */}
        <TabsContent value="auth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Authentication Implementation
              </CardTitle>
              <CardDescription>
                JWT, Sessions, Cookies, and OAuth - all covered!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 border rounded bg-blue-50">
                  <p className="font-medium text-sm mb-1">JWT Tokens</p>
                  <p className="text-xs text-gray-600">Stateless, scalable, works across domains</p>
                </div>
                <div className="p-3 border rounded bg-green-50">
                  <p className="font-medium text-sm mb-1">Sessions</p>
                  <p className="text-xs text-gray-600">Server-side storage, more secure</p>
                </div>
                <div className="p-3 border rounded bg-purple-50">
                  <p className="font-medium text-sm mb-1">OAuth</p>
                  <p className="text-xs text-gray-600">Login with Google/GitHub</p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Interview Tip:</strong> Be ready to explain the difference between JWT and Session-based auth, and when to use each!
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="mb-3 font-medium">1. JWT Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Create utility functions for JWT tokens:
                </p>
                <CodeBlock
                  id="jwt-utils"
                  language="typescript"
                  code={`// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(
    payload, 
    process.env.REFRESH_TOKEN_SECRET || 'refresh-secret',
    { expiresIn: '30d' }
  );
};`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">2. Auth Middleware</h3>
                <CodeBlock
                  id="auth-middleware"
                  language="typescript"
                  code={`// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

// Role-based middleware
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">3. Auth Controller (Register & Login)</h3>
                <CodeBlock
                  id="auth-controller"
                  language="typescript"
                  code={`// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pgPool } from '../config/database';
import { generateToken, generateRefreshToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'staff' } = req.body;
    
    // Check if user exists
    const existingUser = await pgPool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await pgPool.query(\`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
    \`, [name, email, password_hash, role]);
    
    const user = result.rows[0];
    
    // Generate tokens
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    const refreshToken = generateRefreshToken({ id: user.id });
    
    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const result = await pgPool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate tokens
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    const refreshToken = generateRefreshToken({ id: user.id });
    
    // Remove password from response
    delete user.password_hash;
    
    res.json({
      message: 'Login successful',
      user,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // With JWT, logout is handled client-side (delete token)
  // But you can also blacklist tokens if needed
  res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const result = await pgPool.query(\`
      SELECT id, name, email, role, avatar, team_id, created_at
      FROM users WHERE id = $1
    \`, [req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">4. OAuth Setup (Google & GitHub)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  First, get your OAuth credentials:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border mb-3">
                  <p className="font-medium text-sm mb-2">Google OAuth:</p>
                  <ol className="list-decimal ml-5 text-sm space-y-1">
                    <li>Go to: <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                    <li>Create a new project</li>
                    <li>Enable Google+ API</li>
                    <li>Create OAuth 2.0 credentials</li>
                    <li>Add redirect URI: <code className="bg-white px-2 py-0.5 rounded">http://localhost:5000/api/auth/google/callback</code></li>
                  </ol>
                </div>
                <div className="bg-gray-800 text-gray-100 p-4 rounded-lg border mb-3">
                  <p className="font-medium text-sm mb-2">GitHub OAuth:</p>
                  <ol className="list-decimal ml-5 text-sm space-y-1">
                    <li>Go to: Settings → Developer settings → OAuth Apps</li>
                    <li>Click "New OAuth App"</li>
                    <li>Homepage URL: <code className="bg-gray-900 px-2 py-0.5 rounded">http://localhost:3000</code></li>
                    <li>Callback URL: <code className="bg-gray-900 px-2 py-0.5 rounded">http://localhost:5000/api/auth/github/callback</code></li>
                  </ol>
                </div>

                <CodeBlock
                  id="passport-config"
                  language="typescript"
                  code={`// src/config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { pgPool } from './database';

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const result = await pgPool.query(
        'SELECT * FROM users WHERE email = $1',
        [profile.emails![0].value]
      );
      
      let user;
      if (result.rows.length === 0) {
        // Create new user
        const newUser = await pgPool.query(\`
          INSERT INTO users (name, email, password_hash, role, avatar)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        \`, [
          profile.displayName,
          profile.emails![0].value,
          'oauth-user', // No password for OAuth users
          'staff',
          profile.photos![0].value
        ]);
        user = newUser.rows[0];
      } else {
        user = result.rows[0];
      }
      
      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
));

// GitHub OAuth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: 'http://localhost:5000/api/auth/github/callback'
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const email = profile.emails?.[0]?.value || \`\${profile.username}@github.com\`;
      
      const result = await pgPool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      let user;
      if (result.rows.length === 0) {
        const newUser = await pgPool.query(\`
          INSERT INTO users (name, email, password_hash, role, avatar)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        \`, [
          profile.displayName || profile.username,
          email,
          'oauth-user',
          'staff',
          profile.photos?.[0]?.value
        ]);
        user = newUser.rows[0];
      } else {
        user = result.rows[0];
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pgPool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">5. OAuth Routes</h3>
                <CodeBlock
                  id="oauth-routes"
                  language="typescript"
                  code={`// src/routes/auth.routes.ts
import express from 'express';
import passport from 'passport';
import { register, login, logout, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { generateToken } from '../utils/jwt';

const router = express.Router();

// Standard auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

// Google OAuth
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user: any = req.user;
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    // Redirect to frontend with token
    res.redirect(\`\${process.env.FRONTEND_URL}?token=\${token}\`);
  }
);

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const user: any = req.user;
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    res.redirect(\`\${process.env.FRONTEND_URL}?token=\${token}\`);
  }
);

export default router;`}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Interview Questions: Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: JWT vs Session-based authentication?</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-blue-600 mb-1">JWT (Stateless)</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>✓ Token stored client-side</li>
                        <li>✓ Scalable (no server storage)</li>
                        <li>✓ Works across domains</li>
                        <li>✗ Can't revoke before expiry</li>
                        <li>✗ Token can be stolen</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-600 mb-1">Sessions (Stateful)</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>✓ More secure (server-side)</li>
                        <li>✓ Easy to revoke</li>
                        <li>✓ HttpOnly cookies</li>
                        <li>✗ Requires server storage</li>
                        <li>✗ Harder to scale</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: How does OAuth 2.0 work?</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Answer:</strong> OAuth is an authorization protocol. Flow:
                  </p>
                  <ol className="list-decimal ml-5 text-sm space-y-1 text-gray-600">
                    <li>User clicks "Login with Google"</li>
                    <li>Redirect to Google's authorization page</li>
                    <li>User grants permissions</li>
                    <li>Google redirects back with authorization code</li>
                    <li>Exchange code for access token</li>
                    <li>Use token to get user profile</li>
                    <li>Create/login user in your system</li>
                  </ol>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: How to secure passwords?</p>
                  <p className="text-sm text-gray-700">
                    <strong>Answer:</strong> Never store plain text! Use <code className="bg-gray-100 px-2 py-0.5 rounded">bcrypt</code> to hash passwords with a salt. Bcrypt is slow by design (prevents brute force attacks). Example: <code className="bg-gray-100 px-2 py-0.5 rounded">bcrypt.hash(password, 10)</code> - 10 is the salt rounds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* JEST TESTING TAB */}
        <TabsContent value="jest" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-6 w-6" />
                Jest Testing Setup
              </CardTitle>
              <CardDescription>
                Unit and integration tests for your backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 font-medium">1. Configure Jest</h3>
                <p className="text-sm text-gray-600 mb-3">Create jest.config.js in your backend folder:</p>
                <CodeBlock
                  id="jest-config"
                  language="javascript"
                  code={`// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">2. Unit Test Example (Service)</h3>
                <CodeBlock
                  id="unit-test"
                  language="typescript"
                  code={`// tests/unit/auth.service.test.ts
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../../src/utils/jwt';

describe('Authentication Service', () => {
  describe('Password Hashing', () => {
    it('should hash password correctly', async () => {
      const password = 'test123';
      const hash = await bcrypt.hash(password, 10);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(await bcrypt.compare(password, hash)).toBe(true);
    });

    it('should reject wrong password', async () => {
      const password = 'test123';
      const hash = await bcrypt.hash(password, 10);
      
      expect(await bcrypt.compare('wrong', hash)).toBe(false);
    });
  });

  describe('JWT Tokens', () => {
    it('should generate valid token', () => {
      const payload = { id: 1, email: 'test@example.com' };
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify valid token', () => {
      const payload = { id: 1, email: 'test@example.com', role: 'staff' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it('should reject invalid token', () => {
      const decoded = verifyToken('invalid.token.here');
      expect(decoded).toBeNull();
    });
  });
});`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">3. Integration Test Example (API Endpoints)</h3>
                <CodeBlock
                  id="integration-test"
                  language="typescript"
                  code={`// tests/integration/auth.test.ts
import request from 'supertest';
import app from '../../src/server'; // Your Express app
import { pgPool } from '../../src/config/database';

describe('Auth API', () => {
  // Clean up before tests
  beforeAll(async () => {
    await pgPool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
  });

  // Clean up after tests
  afterAll(async () => {
    await pgPool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
    await pgPool.end();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'staff'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should reject duplicate email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already registered');
    });

    it('should reject missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'incomplete@example.com'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should reject wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      token = response.body.token;
    });

    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', \`Bearer \${token}\`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(response.status).toBe(401);
    });
  });
});`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">4. Product API Integration Test</h3>
                <CodeBlock
                  id="product-integration-test"
                  language="typescript"
                  code={`// tests/integration/product.test.ts
import request from 'supertest';
import app from '../../src/server';
import { pgPool } from '../../src/config/database';

describe('Product API', () => {
  let authToken: string;
  let productId: number;

  beforeAll(async () => {
    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    if (productId) {
      await pgPool.query('DELETE FROM products WHERE id = $1', [productId]);
    }
    await pgPool.end();
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('should create product with authentication', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', \`Bearer \${authToken}\`)
        .send({
          name: 'Test Product',
          description: 'Test description',
          price: 99.99,
          category_id: 1
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Product');
      productId = response.body.id;
    });

    it('should reject creation without auth', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Test Product',
          price: 99.99
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get product by id', async () => {
      const response = await request(app)
        .get(\`/api/products/\${productId}\`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(productId);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/99999');

      expect(response.status).toBe(404);
    });
  });
});`}
                />
              </div>

              <Alert className="border-green-200 bg-green-50">
                <Play className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Run Tests</AlertTitle>
                <AlertDescription>
                  <CodeBlock
                    id="run-tests"
                    code={`# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage`}
                  />
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Interview Questions: Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: Unit tests vs Integration tests?</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-blue-600 mb-1">Unit Tests</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>• Test individual functions</li>
                        <li>• Fast and isolated</li>
                        <li>• Mock dependencies</li>
                        <li>• Example: Testing JWT generation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-600 mb-1">Integration Tests</p>
                      <ul className="text-gray-600 space-y-1 text-xs">
                        <li>• Test multiple components</li>
                        <li>• Test real API endpoints</li>
                        <li>• Use real database (test DB)</li>
                        <li>• Example: POST /api/auth/login</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What is mocking?</p>
                  <p className="text-sm text-gray-700">
                    <strong>Answer:</strong> Mocking is replacing real dependencies with fake versions for testing. Example: mock database calls to avoid hitting real DB during unit tests. Use <code className="bg-gray-100 px-2 py-0.5 rounded">jest.fn()</code> or <code className="bg-gray-100 px-2 py-0.5 rounded">jest.mock()</code>.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium text-sm mb-2">Q: What is test coverage?</p>
                  <p className="text-sm text-gray-700">
                    <strong>Answer:</strong> Percentage of code executed during tests. Good projects aim for 80%+ coverage. Run <code className="bg-gray-100 px-2 py-0.5 rounded">npm test -- --coverage</code> to see coverage report.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FRONTEND CONNECTION TAB */}
        <TabsContent value="connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Connect Frontend to Backend
              </CardTitle>
              <CardDescription>
                Final step: Make this app talk to your backend!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Almost Done!</AlertTitle>
                <AlertDescription>
                  Your backend should be running on <code className="bg-white px-2 py-1 rounded">http://localhost:5000</code>
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="mb-3 font-medium">Step 1: Update API Configuration</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Open <code className="bg-gray-100 px-2 py-1 rounded">/config/api.config.ts</code> in your frontend and update:
                </p>
                <CodeBlock
                  id="api-config-update"
                  language="typescript"
                  code={`export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  ENABLE_MOCK_DATA: false, // Change this to false!
  TIMEOUT: 10000,
};`}
                />
              </div>

              <div>
                <h3 className="mb-3 font-medium">Step 2: Test the Connection</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2">1. Start Backend Server</p>
                    <CodeBlock
                      id="start-backend"
                      code={`cd backend
npm run dev`}
                    />
                    <p className="text-xs text-gray-600 mt-2">✓ Should see: "Server running on http://localhost:5000"</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2">2. Frontend Already Running</p>
                    <p className="text-xs text-gray-600">Your React app is already running. Just refresh the page!</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2">3. Test Authentication</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Click "Logout" if you're logged in</li>
                      <li>• Click "Register" and create a new account</li>
                      <li>• Try logging in with your credentials</li>
                      <li>• Check browser DevTools Network tab - you should see API calls!</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2">4. Test CRUD Operations</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Go to Products page → Create a new product</li>
                      <li>• Go to Orders page → Create an order</li>
                      <li>• Go to Tasks page → Create a task</li>
                      <li>• All data now comes from YOUR database! 🎉</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 font-medium">Common Issues & Solutions</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      CORS Error
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Error: "Access blocked by CORS policy"</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>Solution:</strong> Check your backend CORS config:</p>
                    <CodeBlock
                      id="cors-fix"
                      language="typescript"
                      code={`app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));`}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      Network Error / Can't Connect
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Error: "Network Error" or "ERR_CONNECTION_REFUSED"</p>
                    <p className="text-sm text-gray-700"><strong>Solution:</strong></p>
                    <ul className="text-sm ml-4 mt-2 space-y-1">
                      <li>• Make sure backend is running: <code className="bg-gray-100 px-2 py-0.5 rounded">npm run dev</code></li>
                      <li>• Check correct port (5000)</li>
                      <li>• Check firewall isn't blocking</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      401 Unauthorized
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Can't access protected endpoints</p>
                    <p className="text-sm text-gray-700 mb-2"><strong>Solution:</strong> Make sure you're logged in and token is being sent:</p>
                    <CodeBlock
                      id="auth-header"
                      language="typescript"
                      code={`// Frontend should send token in headers
headers: {
  'Authorization': \`Bearer \${token}\`
}`}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      Database Connection Failed
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Can't connect to PostgreSQL or MongoDB</p>
                    <p className="text-sm text-gray-700"><strong>Solution:</strong></p>
                    <ul className="text-sm ml-4 mt-2 space-y-1">
                      <li>• PostgreSQL: <code className="bg-gray-100 px-2 py-0.5 rounded">net start postgresql-x64-15</code></li>
                      <li>• MongoDB: <code className="bg-gray-100 px-2 py-0.5 rounded">net start MongoDB</code></li>
                      <li>• Check .env file has correct credentials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 font-medium">🎉 Success Checklist</h3>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-lg border-2 border-green-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">PostgreSQL installed and running</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">MongoDB installed and running</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Backend server running on port 5000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Can register a new account</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Can login successfully</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Can create products/orders/tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Jest tests passing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-600"></div>
                      <span className="text-sm">Ready for interview! 💪</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-purple-600" />
                Final Interview Prep Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-2">💡 Be Ready to Explain:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Why you chose PostgreSQL for certain data and MongoDB for others</li>
                    <li>• How JWT authentication works end-to-end</li>
                    <li>• The difference between middleware and controllers</li>
                    <li>• How you handle errors in your API</li>
                    <li>• Your testing strategy (unit vs integration)</li>
                    <li>• How you would deploy this to production</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-2">🎯 Practice These SQL Queries:</p>
                  <CodeBlock
                    id="practice-queries"
                    language="sql"
                    code={`-- JOIN example
SELECT o.id, c.name, p.name, oi.quantity 
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;

-- Aggregation
SELECT c.name, COUNT(o.id) as order_count, SUM(o.total_amount) as total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total DESC;

-- Subquery
SELECT * FROM products WHERE price > (
  SELECT AVG(price) FROM products
);`}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-2">🚀 Bonus Points:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Add input validation with express-validator</li>
                    <li>• Implement pagination for list endpoints</li>
                    <li>• Add API documentation with Swagger</li>
                    <li>• Set up Docker containers</li>
                    <li>• Add rate limiting</li>
                    <li>• Implement refresh token rotation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                You're Ready! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                You now have a complete full-stack application with:
              </p>
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl mb-1">12</p>
                  <p className="text-xs text-gray-600">PostgreSQL Tables</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl mb-1">5+</p>
                  <p className="text-xs text-gray-600">MongoDB Collections</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-2xl mb-1">20+</p>
                  <p className="text-xs text-gray-600">API Endpoints</p>
                </div>
              </div>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Remember:</strong> The most important thing is understanding WHY you made each technical decision. Good luck with your interview! 💪
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
