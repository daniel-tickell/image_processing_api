import supertest from 'supertest';
import app from '../index.ts';

const request = supertest(app);

describe('Test API endpoint', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toBe('main api route');
        }
    )
});

describe('Test Images endpoint', () => {
    it('gets the images endpoint & gets the mssing params response', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        expect(response.text).toBe('<html>parameters missing</html>');
        }
    )
});

describe('Test valid params on images endpoint', () => {
    it('gets the valid params response', async () => {
        const height = '123';
        const width = '456';
        const filename = 'test.jpeg';
        const response = await request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Valid');
    });
});

describe('Test invalid params on images endpoint', () => {
    it('gets the Invalid params response', async () => {
        const height = 'A6c';
        const width = '123';
        const filename = 'test.jpeg';
        const response = await request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Invalid');
    });
});

describe('Test missing parameter on images endpoint', () => {
    it('gets the params missing response', async () => {
        const height = '123';
        const filename = 'test.jpeg';
        const response = await request.get(`/api/images?filename=${filename}&height=${height}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('<html>parameters missing</html>');
    });
});
