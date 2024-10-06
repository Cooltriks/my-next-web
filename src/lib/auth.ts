// verify JWT token form server side /api/auth/verify

export const verifyAuth = async () => {
    try {
        const response = await fetch('/api/auth/verify', {
            method: 'GET',
            credentials: 'include', // This is important for including cookies
        });
        if (response.ok) {
            const userData = await response.json();
            return userData;
        }
    } catch (error) {
        console.error('Error verifying authentication:', error);
    }
};