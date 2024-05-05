const {describe, expect, test} = require('@jest/globals');
const request = require('supertest');
const pool = require('../db/pool');
const app = require('../app');
const supertest = require('supertest');
describe('GET items endpoint', () => {

    test('should return 200 and valid JSON', async() => {
        const response = await request(app)
            .get('/api/items')
            .set('Accept', 'application/json')
        
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
       
              
    });

    test('should return item 1', async() => {
        const response = await request(app)
            .get('/api/items/1')
            .set('Accept', 'application/json')
        
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,  
                name: "Bicycle",
                price: "8.99",  
                description: "Has wheels",
                image: "image"
            })
        );

    });

    test('should return 404 for unknown item', async() => {
        const response = await request(app)
            .get('/api/items/432')
            .set('Accept', 'application/json')
        
        expect(response.status).toEqual(404);
        expect(response.headers['content-type']).toMatch(/json/);
       
        expect(response.body).toEqual(
            expect.objectContaining({
                message: "Item not found",
            })
        );   
    });
    describe('POST items endpoint', () => {

        const loggedInUser = {
            userId: '',
            email: '',
            token: ''
        }
    beforeAll(async () => {
        pool.query('DELETE FROM users WHERE email=?', ['john@wayne.com'])
        
        const data = {
            name: 'John Wayne',
            email: 'john@wayne.com',
            password: 'john12345'
        }
        
        const response = await supertest(app)
            .post('/api/users/signup')
            .set('Accept', 'application/json')
            .send(data);
        
            loggedInUser.userId = response.body.id;
            loggedInUser.email = response.body.email;
            loggedInUser.token = response.body.token;
        });
    test('should create a new item', async () => {
        const item = {
            name: "Moped",
            price: "50",
            description: "Has 2 wheels",
            image: "image"
        };

        const response = await request(app)
            .post('/api/items')
            .set('Accept', 'application/json')
            .set('Content', 'application/json')
            .set('Authorization', 'BEARER ' + loggedInUser.token)
            .send(item);
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.name).toEqual('Moped');
        expect(response.body.price).toEqual('50.00');
    });
    
    

    test('should create a new item only if it doesnt exist', async() => {
        const newItem = {
            name: "Mac & Cheese",
            price: "8.99",
        };
        const response = await request(app)
            .post('/api/items/')
            .set('Accept', 'application/json')
            .set('Content', 'Application/json')
            .send(newItem);
        
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.price).toEqual('8.99');

    });

    test('should fail with no name', async() => {
        const newItem = {
            name: "",
            price: "33",
        };
        const response = await request(app)
            .post('/api/items/')
            .set('Accept', 'application/json')
            .set('Content', 'Application/json')
            .send(newItem);
        
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({"message": "\"name\" is not allowed to be empty"})
        
    });

    test('should fail with empty name', async() => {
        const newItem = {
            price: 8.99,

        };
        const response = await request(app)
            .post('/api/items/')
            .set('Accept', 'application/json')
            .set('Content', 'Application/json')
            .send(newItem);
        
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({"message": "\"name\" is required"})
});

    });



test('should delete an existing item', async () => {
    const response = await request(app)
        .delete('/api/items/1')
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
        expect.objectContaining({
            message: "Item deleted successfully",
        })
    );
});

test('should return 404 when deleting a non-existing item', async () => {
    const response = await request(app)
        .delete('/api/items/432')  
        .set('Accept', 'application/json');

    expect(response.status).toEqual(404);  
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
        expect.objectContaining({
            message: "Item not found",
        })
    );
});


});
