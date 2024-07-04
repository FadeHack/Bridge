const request = require('supertest');
const app = require('../app');

describe('GET /api/tokens', () => {
    it('should return tokens', async () => {
        const response = await request(app).get('/api/tokens');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});
