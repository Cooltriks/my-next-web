//api/auth/login/route.ts
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    await dbConnect();
    // Fetch the request body
    const { email, password } = await request.json();

    // Fetch the user from the database
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Generate a JWT token with the user's ID
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '7d' });

    // Send the JWT token as a response
    return new Response(JSON.stringify({ token, userId:user.id }), {
        headers: { 'Content-Type': 'application/json' },
    });
}




