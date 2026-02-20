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

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch orders');
    return data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update status');
    return data;
};

export const createRazorpayOrder = async (amount) => {
    const response = await fetch(`${API_URL}/orders/razorpay/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to initiate payment');
    return data;
};
