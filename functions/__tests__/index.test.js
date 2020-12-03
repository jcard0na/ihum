const testEnv = require('firebase-functions-test')({
      databaseURL: 'https://ihum-c73d9.firebaseio.com',
      projectId: 'ihum-c73d9',
}, '../.keys/serviceAccountKey.json');
const admin = require('firebase-admin');
const supertest = require("supertest");

let index, adminStub, request;

beforeAll(() => {
      adminStub = jest.spyOn(admin, 'initializeApp');
      index = require('../index');
      request = supertest(index.api)
      return;
});

afterAll(() => {
      adminStub.mockRestore();
      testEnv.cleanup();
});


it('api endpoint is exported', () => {
      expect(index.api !== null);
      expect(index.app !== null);
});


it('get app', () => {
      console.log(request)
      let actual = request.get('/next-challenge')
      let { ok, status, body } = actual
      expect(ok).toBe(true)
      expect(status).toBeGreaterThanOrEqual(200)
      expect(body).toBeDefined()
})
