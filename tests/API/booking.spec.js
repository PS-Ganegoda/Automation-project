// Login-style API flow against Restful-Booker, a practice API with real authentication.
// Flow: get a token -> create a booking -> read it -> update it (needs the token) -> delete it.
// It is a shared public demo, so it can be slow or reset. If it is down, use posts.spec.js.
const { test, expect } = require('../../Fixtures/fixture');

test.use({
  baseURL: 'https://restful-booker.herokuapp.com',
  extraHTTPHeaders: { Accept: 'application/json' },
});

const booking = {
  firstname: 'Piumi',
  lastname: 'Ganegoda',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
};

test.describe('Booking lifecycle', () => {
  // Tests run in order and share the token and the booking id.
  test.describe.configure({ mode: 'serial' });

  let token;
  let bookingId;

  test('POST /auth with valid credentials returns a token', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(5);
    token = body.token;
  });

  test('POST /auth with a wrong password does not return a token', async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'wrong-password' },
    });

    // This API answers 200 with a reason instead of 401, so assert on the body.
    const body = await response.json();
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });

  test('POST /booking creates a booking', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.post('/booking', { data: booking });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toMatchObject(booking);
    bookingId = body.bookingid;
  });

  test('GET /booking/:id returns the booking that was created', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(booking);
  });

  test('PUT /booking/:id without a token is rejected', async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, { data: booking });
    expect(response.status()).toBe(403);
  });

  test('PUT /booking/:id with the token updates the booking', async ({ request }) => {
    const updated = { ...booking, firstname: 'Updated', totalprice: 200 };

    const response = await request.put(`/booking/${bookingId}`, {
      data: updated,
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(updated);
  });

  test('DELETE /booking/:id removes the booking', async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(201);

    const after = await request.get(`/booking/${bookingId}`);
    expect(after.status()).toBe(404);
  });
});
