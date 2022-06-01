const {describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')
describe('API suite test', () => {
    describe('', () => {
        it('should request the contact page and retur HTTP status 200',async () => {
            const response = await request(app)
            .get('/contact')
            .expect(200)
            assert.deepStrictEqual(response.text,'contact us page')
        });
        describe('/hello', () => {
            it('should request a inexistent route /hi and redirect to defaut hout hello world',async () => {
                const response = await request(app)
            .get('/w')
            .expect(200)
            assert.deepStrictEqual(response.text,'Hello World')
            });
        });
    });
});