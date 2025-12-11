const axios = require('axios');

async function test() {
    try {
        const payload = {
            name: 'Test User',
            email: 'test' + Date.now() + '@example.com',
            phone: '1234567890',
            password: 'password123',
            role: 'USER'
        };
        console.log('Sending:', payload);
        const res = await axios.post('http://localhost:3000/api/auth/register', payload);
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Response Status:', err.response.status);
            console.error('Response Data:', err.response.data);
        }
    }
}

test();
