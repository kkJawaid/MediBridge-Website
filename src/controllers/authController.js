import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { generateToken } from '../utils/token.js';

export const registerUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } }); //key:value shortform
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { full_name, email, password_hash: hashed },
    });
    //const token = generateToken(user); //should only be kept in login
    res.json({ message: 'Registered', user: { user_id: user.user_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token, role: user.role, user: { user_id: user.user_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

