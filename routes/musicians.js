const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Musician } = require("../models/index");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

router.get("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

router.put("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.json(musician);
});

router.delete("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
    res.json({ message: "Musician deleted" });
});

router.post("/", [
    check('name').not().isEmpty().trim().isLength({ min: 2, max: 20 }).withMessage('Name field must be between 2 and 20 characters and cannot be empty'),
    check('instrument').not().isEmpty().trim().isLength({ min: 2, max: 20 }).withMessage('Instrument field must be between 2 and 20 characters and cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const musician = await Musician.create(req.body);
    res.json(musician);
});

router.put("/:id", [
    check('name').isLength({ min: 2, max: 20 }).withMessage('Name field must be between 2 and 20 characters'),
    check('instrument').isLength({ min: 2, max: 20 }).withMessage('Instrument field must be between 2 and 20 characters')
], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const musician = await Musician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(musician);
});
























module.exports = router;