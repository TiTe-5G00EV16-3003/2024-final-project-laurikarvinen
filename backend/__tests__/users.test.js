const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const app = require('../app'); 
const users = require('../models/users'); 


jest.mock('bcryptjs');
jest.mock('../models/users');

describe('Auth Routes', () => {
  describe('/signup', () => {
    beforeEach(() => {
      users.findByEmail.mockResolvedValue([]);
      users.create.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('hashedPassword');
    });

    it('should sign up a new user and return a token', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return a 422 status if user exists', async () => {
      users.findByEmail.mockResolvedValue([{ id: uuidv4(), email: 'test@example.com' }]);
      
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toBe("Could not create user, user exists");
    });
  });

  describe('/login', () => {
    beforeEach(() => {
      bcrypt.compare.mockResolvedValue(true);
      users.findByEmail.mockResolvedValue([{ id: uuidv4(), email: 'test@example.com', password_hash: 'hashedPassword' }]);
    });

    it('should login an existing user and return a token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return a 401 status if credentials are wrong', async () => {
      bcrypt.compare.mockResolvedValue(false); // Simulate wrong password
      
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe("Could not identify user, credentials might be wrong");
    
    });
  });
});
