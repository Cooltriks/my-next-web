//block all /admin/* routes
//check if user is logged in cookie token is present and verify from /api/auth/verify

import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: { cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
    const token = req.cookies.get('token');
    //verify form server token is valid
    var userData = await verifyAuth();
    console.log(userData);
    // if (!userData) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
}

export const config = {
    matcher: '/admin/:path*',
};

