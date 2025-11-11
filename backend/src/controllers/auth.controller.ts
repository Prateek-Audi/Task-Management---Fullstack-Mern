// src/controllers/auth.controller.ts
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
    const result = await pgPool.query(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
    `, [name, email, password_hash, role]);
    
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
    if (!req.user || (req.user as any).id === undefined) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userId = (req.user as any).id;
    const result = await pgPool.query(`
      SELECT id, name, email, role, avatar, team_id, created_at
      FROM users WHERE id = $1
    `, [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};