import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
// import db from '../db/sqlite.js';

// beforeAll(() => {
//   db._clearAll();
// });

// afterAll(() => {
//   db._clearAll();
// });

describe('String Analyzer API - Endpoints', () => {
  it('POST /strings - create new string', async () => {
    const res = await request(app)
      .post('/strings')
      .send({ value: 'Racecar' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('value', 'Racecar');
    expect(res.body).toHaveProperty('properties');
    expect(res.body.properties).toHaveProperty('is_palindrome', true);
    expect(res.body.properties).toHaveProperty('sha256_hash');
  });

  it('POST /strings - 409 on duplicate', async () => {
    const res = await request(app)
      .post('/strings')
      .send({ value: 'Racecar' });

    expect(res.status).toBe(409);
  });

  it('GET /strings/:value - fetch by raw value', async () => {
    const res = await request(app).get('/strings/Racecar');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('value', 'Racecar');
  });

  it('GET /strings - filter is_palindrome=true', async () => {
    const res = await request(app).get('/strings').query({ is_palindrome: 'true' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /strings/filter-by-natural-language - parsed query', async () => {
    const res = await request(app).get('/strings/filter-by-natural-language').query({ query: 'all single word palindromic strings' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('interpreted_query');
    expect(res.body.interpreted_query.parsed_filters).toHaveProperty('word_count', 1);
    expect(res.body.interpreted_query.parsed_filters).toHaveProperty('is_palindrome', true);
  });

  it('DELETE /strings/:value - delete existing', async () => {
    const resDel = await request(app).delete('/strings/Racecar');
    expect(resDel.status).toBe(204);

    const resGet = await request(app).get('/strings/Racecar');
    expect(resGet.status).toBe(404);
  });
});
