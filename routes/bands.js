const express = require("express");
const router = express.Router();
const { Band, Musician } = require('../models');

router.get("/", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands);
});

router.get("/:id", async (req, res) => { 
    const band = await Band.findByPk(req.params.id);
    res.json(band);
});

router.put("/:id", async (req, res) => {
    const band = await Band.findByPk(req.params.id);
    await band.update(req.body);
    res.json(band);
});

router.delete("/:id", async (req, res) => {
    const band = await Band.findByPk(req.params.id);
    await band.destroy();
    res.json({ message: "Band deleted" });
});

router.post("/", async (req, res) => {
    const band = await Band.create(req.body);
    res.json(band);
});

router.get("/:id/musicians", async (req, res) => {
    const band = await Band.findByPk(req.params.id, {
        include: Musician
    });
    res.json(band.Musicians);
});

router.get("/:id/musicians/:musicianId", async (req, res) => {
    const band = await Band.findByPk(req.params.id);
    const musician = await Musician.findByPk(req.params.musicianId);
    res.json(musician);
});

module.exports = router;