var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from 'supertest';
import app from "../index.js";
const request = supertest(app);
describe('Test API endpoint', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toBe('main api route');
    }));
});
describe('Test Images endpoint', () => {
    it('gets the images endpoint & gets the mssing params response', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(200);
        expect(response.text).toBe('<html>parameters missing</html>');
    }));
});
describe('Test valid params on images endpoint', () => {
    it('gets the valid params response', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = '123';
        const width = '456';
        const filename = 'test.jpeg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Valid');
    }));
});
describe('Test invalid params on images endpoint', () => {
    it('gets the Invalid params response', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = 'A6c';
        const width = '123';
        const filename = 'test.jpeg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Invalid');
    }));
});
describe('Test missing parameter on images endpoint', () => {
    it('gets the params missing response', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = '123';
        const filename = 'test.jpeg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('<html>parameters missing</html>');
    }));
});
