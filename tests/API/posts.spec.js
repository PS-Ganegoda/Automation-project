// API tests against JSONPlaceholder, a free practice API: https://jsonplaceholder.typicode.com
// Note: it fakes writes. POST/PUT/PATCH/DELETE return realistic responses but nothing is stored,
// so verify the response, not a later GET.
const { test, expect } = require('../../Fixtures/fixture');

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test.describe('Posts API', () => {
  test('GET /posts/1 returns the expected post', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const post = await response.json();
    expect(post).toMatchObject({ id: 1, userId: 1 });
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });

  test('GET /posts returns the full list with the right shape', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.ok()).toBeTruthy();

    const posts = await response.json();
    expect(posts).toHaveLength(100);
    for (const post of posts) {
      expect(Object.keys(post).sort()).toEqual(['body', 'id', 'title', 'userId']);
    }
  });

  test('GET /posts?userId=1 filters by user', async ({ request }) => {
    const response = await request.get('/posts', { params: { userId: 1 } });
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.userId === 1)).toBeTruthy();
  });

  test('GET /posts/1/comments returns comments that belong to the post', async ({ request }) => {
    const response = await request.get('/posts/1/comments');
    expect(response.status()).toBe(200);

    const comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
    for (const comment of comments) {
      expect(comment.postId).toBe(1);
      expect(comment.email).toContain('@');
    }
  });

  // Data-driven: one test body, one generated test per id.
  for (const id of [1, 2, 3]) {
    test(`GET /posts/${id} returns post ${id}`, async ({ request }) => {
      const response = await request.get(`/posts/${id}`);
      expect(response.status()).toBe(200);
      expect((await response.json()).id).toBe(id);
    });
  }

  test('POST /posts creates a post and echoes the body', { tag: '@smoke' }, async ({ request }) => {
    const payload = { title: 'mock exam post', body: 'created by Playwright', userId: 7 };

    const response = await request.post('/posts', { data: payload });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('PUT /posts/1 replaces the post', async ({ request }) => {
    const payload = { id: 1, title: 'updated title', body: 'updated body', userId: 1 };

    const response = await request.put('/posts/1', { data: payload });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  test('PATCH /posts/1 changes only the title', async ({ request }) => {
    const response = await request.patch('/posts/1', { data: { title: 'patched title' } });

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe('patched title');
    expect(post.id).toBe(1);
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

  test('GET /posts/99999 returns 404', async ({ request }) => {
    const response = await request.get('/posts/99999');
    expect(response.status()).toBe(404);
  });
});
