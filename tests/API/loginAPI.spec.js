

const { test, expect } = require('../../Fixtures/fixture');

test('verify the login API - happy path', async ({ apicontext }) => {
    const response = await apicontext.post('/login', {
        data: {
            username: 'standard_user',
            password: 'secret_sauce'
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();

    console.log(data);

    expect(data.message).toBe('successfully login');
});
