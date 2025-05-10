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
import processImage from "../utilities/processImage.js";
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
        const logSpy = spyOn(console, 'log').and.callThrough();
        const height = '123';
        const width = '123';
        const filename = 'test.jpg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(logSpy.calls.count()).toBeGreaterThanOrEqual(6);
        expect(logSpy.calls.argsFor(6)).toEqual(['Valid parameters provided']);
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
describe('Test existing image for processing', () => {
    it('tests for output imgae already found message', () => __awaiter(void 0, void 0, void 0, function* () {
        const logSpy = spyOn(console, 'log').and.callThrough();
        const height = '123';
        const width = '123';
        const filename = 'test.jpg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(logSpy.calls.count()).toBeGreaterThanOrEqual(5);
        expect(logSpy.calls.argsFor(4)).toEqual(['Src image test.jpg found']);
        expect(logSpy.calls.argsFor(5)).toEqual(['Thumbnail Already Exists']);
    }));
});
describe('Test Missng source image', () => {
    it('tests for missing image message', () => __awaiter(void 0, void 0, void 0, function* () {
        const logSpy = spyOn(console, 'log').and.callThrough();
        const height = '123';
        const width = '123';
        const filename = 'test2.jpg';
        const response = yield request.get(`/api/images?filename=${filename}&height=${height}&width=${width}`);
        expect(logSpy.calls.count()).toBeGreaterThanOrEqual(5);
        expect(logSpy.calls.argsFor(4)).toEqual(['test2.jpg not found']);
    }));
});
describe('Process Image Test', () => {
    it('Test successful processing of image', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = 123;
        const width = 123;
        const filename = 'test.jpg';
        const response = yield processImage(filename, height, width);
        expect(response).toContain('thumb_w123_h123_test.jpg');
    }));
});
