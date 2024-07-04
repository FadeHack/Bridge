const request = require('supertest');
const app = require('../app');

describe('POST /api/transactions', () => {
    it('should return transaction parameters', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .send({ /* request body */ });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('transactionId');
    });
});
