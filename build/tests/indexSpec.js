import supertest from 'supertest';
import app from '../index.js';
const request = supertest(app);
describe('Test API endpoint', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toBe('main api route');
    });
});
describe('Test Images endpoint', () => {
    it('gets the images endpoint', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Images Route');
    });
});
describe('Test valid params on images endpoint', () => {
    it('gets the images endpoint', async () => {
        const response = await request.get('/api/images?filename=test.jpg&height=200&width=300');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Valid Paramaters');
    });
});
