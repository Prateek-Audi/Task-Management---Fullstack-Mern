// src/config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { pgPool } from './database';

// Google OAuth - Only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        // Check if user exists
        const result = await pgPool.query(
          'SELECT * FROM users WHERE email = $1',
          [email]
        );
        
        let user;
        if (result.rows.length === 0) {
          // Create new user
          const newUser = await pgPool.query(`
            INSERT INTO users (name, email, password_hash, role, avatar)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
          `, [
            profile.displayName || 'User',
            email,
            'oauth-user', // No password for OAuth users
            'staff',
            profile.photos?.[0]?.value || null
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
  console.log('✓ Google OAuth configured');
} else {
  console.log('⚠ Google OAuth not configured (missing credentials)');
}

// GitHub OAuth - Only initialize if credentials are provided
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/github/callback'
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        
        const result = await pgPool.query(
          'SELECT * FROM users WHERE email = $1',
          [email]
        );
        
        let user;
        if (result.rows.length === 0) {
          const newUser = await pgPool.query(`
            INSERT INTO users (name, email, password_hash, role, avatar)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
          `, [
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
  console.log('✓ GitHub OAuth configured');
} else {
  console.log('⚠ GitHub OAuth not configured (missing credentials)');
}

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

export default passport;