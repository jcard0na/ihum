// Online test for backend/index.js
// 

const supertest = require("supertest");
const app = require('../server')

let request;

beforeAll(() => {
      // construct a supertest request that makes it easier to test HTTP calls
      request = supertest(app);
      return;
});

afterAll(() => {
});

it('challenge returns a challenge', async (done) => {
      let actual = await request.get('/challenge').query({ difficulty: 0 })
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toEqual(expect.objectContaining({
            chord: expect.objectContaining({
                  name: expect.any(String),
                  intervals: expect.any(Array)
            }),
            time: expect.any(Number)
      }))
      done()
})

it('chord returns a chord', async (done) => {
      let actual = await request.get('/chord').query({ difficulty: 0 })
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toEqual(expect.objectContaining({
            name: expect.any(String),
            intervals: expect.any(Array)
      }))
      done()
})

it('chord difficulty 2 returns a diminished chord', async (done) => {
      let actual = await request.get('/chord').query({ difficulty: 2 })
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toEqual(expect.objectContaining({
            name: expect.stringContaining('dim'),
            intervals: expect.any(Array)
      }))
      done()
})

it('chord with too high difficulty returns nothing', async (done) => {
      let actual = await request.get('/chord').query({ difficulty: 5 })
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toEqual({})
      done()
})
