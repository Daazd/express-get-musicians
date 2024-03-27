const express = require('express');
const app = express();
const port = 3000;
const { db } = require('./db/connection');
const musiciansRouter = require('./routes/musicians');
const bandsRouter = require('./routes/bands');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/musicians', musiciansRouter);
app.use('/bands', bandsRouter);

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}`)
})

module.exports = app;