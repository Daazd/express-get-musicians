const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

app.put("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.json(musician);
});

app.delete("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
    res.json({ message: "Musician deleted" });
});




module.exports = app;