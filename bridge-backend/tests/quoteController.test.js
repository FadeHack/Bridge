const request = require('supertest');
const app = require('../app');

describe('GET /api/quotes', () => {
    it('should return a quote', async () => {
        const response = await request(app)
            .post('/api/quotes?srcChainId=1&fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&amount=500000000000000000&destChainId=56&toTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            .send({ /* request body */ });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('quoteId');
    });
});
