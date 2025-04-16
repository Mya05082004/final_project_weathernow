import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log('Login request received:', { email, password: '****' }); 

    // validate input
    if (!email || !password) {
      console.log('Missing fields:', { email, password: '****' });
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }

    // find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log('User lookup:', user ? 'User found' : 'No user found');

    if (!user) {
      console.log('User not found:', email);
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log('Password check:', isPasswordCorrect ? 'Correct' : 'Incorrect');

    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    // 
    const userResponse = { id: user.id, name: user.name, email: user.email };
    console.log('Login successful:', userResponse);

    return new Response(JSON.stringify({ message: 'Login successful', user: userResponse }), { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}