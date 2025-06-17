import request from 'supertest';
import app from '../../app' // Import your configured Express app

describe('GET /api/items', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with an array of items', async () => {
    const response = await request(app).get('/api/items');
    //We expect the body to be an array, even if it's empty
    expect(response.body).toBeInstanceOf(Array);
  });
}) ;
