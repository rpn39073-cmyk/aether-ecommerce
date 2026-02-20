const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
    }

    return data;
};
