import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log('Register request received:', { name, email, password: '****' });

    // validate input
    if (!name || !email || !password) {
      console.log('Missing fields:', { name, email, password: '****' });
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log('Existing user check:', existingUser ? 'User found' : 'No user found');

    if (existingUser) {
      console.log('Email already exists:', email);
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // create new user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    console.log('User created:', { id: user.id, name: user.name, email: user.email });

    return new Response(JSON.stringify({ message: 'User registered successfully', user }), { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}