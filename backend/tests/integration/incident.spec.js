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

    it('should be able to create a new incident', async () => {

        const responseONG = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "test@hotma.com",
                whatsapp: "0000000000",
                city: "sp",
                uf: "sp"
            });

        const response = await request(app)
            .post('/incidents')
            .set({ 'authorization': responseONG.body.id, Accept: 'application/json' })
            .send({
                title: "Test request",
                description: "Test request",
                value: 1
            });

        expect(response.body).toHaveProperty('id');
    })

    it('should be able to list a incident', async () => {

        const responseONG = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "test1@hotma.com",
                whatsapp: "0000000000",
                city: "sp",
                uf: "sp"
            });

        const response = await request(app)
            .get('/incidents/')

        expect(response.body[0]).toHaveProperty('id');
        expect(response.header).toHaveProperty('x-total-count');

    })

    it('should be able to delete a incident', async () => {

        const responseONG = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "test1@hotma.com",
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

        const responseINC2 = await request(app)
            .post('/incidents')
            .set({ 'authorization': responseONG.body.id, Accept: 'application/json' })
            .send({
                title: "Test request",
                description: "Test request",
                value: 1
            });

        const response = await request(app)
            .delete(`/incidents/${responseINC2.body.id}`)
            .set({ 'authorization': responseONG.body.id, Accept: 'application/json' })

        expect(response.status).toEqual(204)
    })
})