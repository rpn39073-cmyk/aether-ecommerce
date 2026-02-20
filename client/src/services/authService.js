const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }

    // Usually you would store this in context or local storage
    localStorage.setItem('token', data.token);
    return data.user;
};

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    return data.user;
};

export const logoutUser = async () => {
    localStorage.removeItem('token');
    return true;
};
