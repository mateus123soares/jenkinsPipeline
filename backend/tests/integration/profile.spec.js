const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {

    beforeEach(async () => {
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to list a profile', async () => {

        const responseONG = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "test2@hotma.com",
                whatsapp: "0000000000",
                city: "sp",
                uf: "sp"
            });

        const responseINC = await request(app)
            .post('/incidents')
            .set({ 'authorization': responseONG.body.id, Accept: 'application/json' })
            .send({
                title: "Test request",
                description: "Test request",
                value: 1
            });

        const token = await request(app)
            .post('/session')
            .set({ 'authorization': responseONG.body.id, Accept: 'application/json' })
            .send({
                id: responseONG.body.id,
            });

        const response = await request(app)
            .get('/profile')
            .set({ 'token': `Bearer ${token.body.token}` ,'authorization': responseONG.body.id, Accept: 'application/json' });

        expect(response.body[0]).toHaveProperty('id');

    })
})