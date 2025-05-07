import supertest from 'supertest';
import app from '../index';

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
    it('gets the images endpoint', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Images Route');
        }
    )
});