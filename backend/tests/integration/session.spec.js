const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
    
    beforeEach(async ()=>{
        await connection.migrate.latest();
    })

    afterAll(async ()=>{
        await connection.destroy();
    })

    it('should be able to create a session', async () => {

        const responseONG = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "test2@hotma.com",
                whatsapp: "0000000000",
                city: "sp",
                uf: "sp"
            });

        const token = await request(app)
            .post('/session')
            .send({
                id: responseONG.body.id,
            });
        
        expect(token.body).toHaveProperty('token');
    })
})