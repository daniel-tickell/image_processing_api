import supertest from 'supertest';
import app from '../index.ts';
import processImage from '../utilities/processImage.ts';

const request = supertest(app);

describe('Test API endpoint', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.text).toBe('main api route');
  });
});

describe('Test Images endpoint', () => {
  it('gets the images endpoint & gets the mssing params response', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    expect(response.text).toBe('<html>parameters missing</html>');
  });
});

describe('Test valid params on images endpoint', () => {
  it('gets the valid params response', async () => {
    const logSpy = spyOn(console, 'log').and.callThrough() as jasmine.Spy;
    const height = '123';
    const width = '123';
    const filename = 'test.jpg';
    const response = await request.get(
      `/api/images?filename=${filename}&height=${height}&width=${width}`,
    );
    expect(logSpy.calls.count()).toBeGreaterThanOrEqual(6);
    expect(logSpy.calls.argsFor(6)).toEqual(['Valid parameters provided']);
  });
});

describe('Test invalid params on images endpoint', () => {
  it('gets the Invalid params response', async () => {
    const height = 'A6c';
    const width = '123';
    const filename = 'test.jpeg';
    const response = await request.get(
      `/api/images?filename=${filename}&height=${height}&width=${width}`,
    );
    expect(response.status).toBe(200);
    expect(response.text).toContain('Invalid');
  });
});

describe('Test missing parameter on images endpoint', () => {
  it('gets the params missing response', async () => {
    const height = '123';
    const filename = 'test.jpeg';
    const response = await request.get(
      `/api/images?filename=${filename}&height=${height}`,
    );
    expect(response.status).toBe(200);
    expect(response.text).toBe('<html>parameters missing</html>');
  });
});

describe('Test existing image for processing', () => {
  it('tests for output imgae already found message', async () => {
    const logSpy = spyOn(console, 'log').and.callThrough() as jasmine.Spy;
    const height = '123';
    const width = '123';
    const filename = 'test.jpg';
    const response = await request.get(
      `/api/images?filename=${filename}&height=${height}&width=${width}`,
    );
    expect(logSpy.calls.count()).toBeGreaterThanOrEqual(5);
    expect(logSpy.calls.argsFor(4)).toEqual(['Src image test.jpg found']);
    expect(logSpy.calls.argsFor(5)).toEqual(['Thumbnail Already Exists']);
  });
});

describe('Test Missng source image', () => {
  it('tests for missing image message', async () => {
    const logSpy = spyOn(console, 'log').and.callThrough() as jasmine.Spy;
    const height = '123';
    const width = '123';
    const filename = 'test2.jpg';
    const response = await request.get(
      `/api/images?filename=${filename}&height=${height}&width=${width}`,
    );
    expect(logSpy.calls.count()).toBeGreaterThanOrEqual(5);
    expect(logSpy.calls.argsFor(4)).toEqual(['test2.jpg not found']);
  });
});

describe('Process Image Test', () => {
  it('Test successful processing of image', async () => {
    const height: number = 123;
    const width: number = 123;
    const filename: string = 'test.jpg';
    const response = await processImage(filename, height, width);
    expect(response).toContain('thumb_w123_h123_test.jpg');
  });
});
