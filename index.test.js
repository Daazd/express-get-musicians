// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const { Band } = require('./models/index')
const app = require('./server');
const seedMusician = require("./seedData");
const express = require('express');
const router = require('./routes/musicians');

app.use(express.json());
app.use(router);


describe('./musicians endpoint', () => {
    test('should return all musicians' , async () => {
        const res = await request(app).get('/musicians');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('should return a single musician', async () => {
        const musician = await Musician.findOne();
        const res = await request(app).get(`/musicians/${musician.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(musician.id);
    });

    test('should update a musician', async () => {
        const musician = await Musician.findOne();
        const res = await request(app).put(`/musicians/${musician.id}`).send({ name: "New Name" });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("New Name");
    });

    test('should delete a musician', async () => {
        const musician = await Musician.findOne();
        const res = await request(app).delete(`/musicians/${musician.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Musician deleted");
    });

    test('should return all bands', async () => {
        const res = await request(app).get('/bands');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('should return a single band', async () => {
        const band = await Band.findOne();
        const res = await request(app).get(`/bands/${band.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(band.id);
    });

    test('should update a band', async () => {
        const band = await Band.findOne();
        const res = await request(app).put(`/bands/${band.id}`).send({ name: "New Name" });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("New Name");
    }); 

    test('should delete a band', async () => {
        const band = await Band.findOne();
        const res = await request(app).delete(`/bands/${band.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Band deleted");
    }); 

    test('should return all musicians in a band', async () => {
        const band = await Band.findOne(); 
        const res = await request(app).get(`/bands/${band.id}/musicians`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(false);
    });

    test('should return a single musician in a band', async () => {
        const band = await Band.findOne();
        const musician = await Musician.findOne();
        const res = await request(app).get(`/bands/${band.id}/musicians/${musician.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(musician.id);
    });

    it('should create a new musician if name and instrument are valid', async () => {
        const res = await request(app)
            .post('/')
            .send({ name: 'Test Musician', instrument: 'Guitar' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Test Musician');
        expect(res.body).toHaveProperty('instrument', 'Guitar');
    });

    it('should return 400 if name is not between 2 and 20 characters', async () => {
        const res = await request(app)
            .post('/')
            .send({ name: 'T', instrument: 'Guitar' });

        expect(res.statusCode).toEqual(400);
    });

    it('should return 400 if instrument is not between 2 and 20 characters', async () => {
        const res = await request(app)
            .post('/')
            .send({ name: 'Test Musician', instrument: 'G' });

        expect(res.statusCode).toEqual(400);
    });
});