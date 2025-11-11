// src/routes/auth.routes.ts
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
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user: any = req.user;
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'], session: false })
);

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user: any = req.user;
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

export default router;