// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    test('should return all musicians' , async () => {
        const res = await request(app).get('/musicians');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

   });