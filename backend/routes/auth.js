import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();
let users = [];
// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '14d' }
  );
};
// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};
// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    // Check if user exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = { id: String(users.length + 1), name, email, password: hashedPassword, createdAt: new Date().toISOString() };
    users.push(newUser);
    // Generate token
    const token = generateToken(newUser);
    const { password: _, ...userResponse } = newUser;
    const userWithToken = { ...userResponse, token };
    res.status(201).json({ message: 'User registered successfully', user: userWithToken });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    const { password: _, ...userResponse } = user;
    const userWithToken = { ...userResponse, token };
    res.json({ message: 'Login successful', user: userWithToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get current user
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { password: _, ...userResponse } = user;
    res.json({ user: userResponse });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default router;