// Online test for functions/index.js
// 
// See https://firebase.google.com/docs/functions/unit-testing for the
// difference between online and offline testing. The documentation only
// explains how to test Firebase Functions, not express.js apps. It took some
// trial and error to get this working, and it may break with changes to
// firebase-functions-test behavior.

// Required config:
// Get an account key from firebase console, app, Project Settings, Service
// Accounts and drop it under project root/.keys
// Note that the path below is relative to index.js, not tests subdirectory
const SERVICE_ACCOUNT_KEY = '../.keys/serviceAccountKey.json'

const firebase = require('firebase-admin');
const testEnv = require('firebase-functions-test')({
      databaseURL: 'https://ihum-c73d9.firebaseio.com',
      projectId: 'ihum-c73d9',
}, SERVICE_ACCOUNT_KEY);
const supertest = require("supertest");

let index, firebaseStub, request;

beforeAll(() => {
      // this will allow us to monitor that firebase Admin SDK was initialized,
      // see test down below
      firebaseStub = jest.spyOn(firebase, 'initializeApp');
      // import the function(s) to be tested
      index = require('../index');
      // construct a supertest request that makes it easier to test HTTP calls
      request = supertest(index.api);
      return;
});

afterAll(() => {
      // undo the spying
      firebaseStub.mockRestore();
      testEnv.cleanup();
});

it('firebase admin init was called from init.js', () => {
      expect(firebaseStub).toHaveBeenCalled();
});

it('api endpoint is exported', () => {
      expect(index.api !== null);
});

it('next-challenge returns a challenge', async (done) => {
      let actual = await request.get('/next-challenge')
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toEqual(expect.objectContaining({
            chord: expect.any(String),
            ask: expect.any(Array)
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