import { Request, Response } from 'express';
import { pgPool } from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pgPool.query(`
      SELECT p.*, c.name as category_name, i.quantity as stock
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      ORDER BY p.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pgPool.query(`
      SELECT p.*, c.name as category_name, i.quantity as stock
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.id = $1
    `, [id]);
    
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
    
    const result = await pgPool.query(`
      INSERT INTO products (name, description, price, category_id, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, description, price, category_id, image_url]);
    
    // Also create inventory record
    await pgPool.query(`
      INSERT INTO inventory (product_id, quantity)
      VALUES ($1, 0)
    `, [result.rows[0].id]);
    
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
    
    const result = await pgPool.query(`
      UPDATE products
      SET name = $1, description = $2, price = $3, 
          category_id = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `, [name, description, price, category_id, image_url, id]);
    
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
    const result = await pgPool.query(`
      DELETE FROM products WHERE id = $1 RETURNING *
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};