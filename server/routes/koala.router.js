const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// GET


// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('This is the new Koala(req.body in POST)', newKoala);
    let query = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query, [req.body.name, req.body.gender, req.body.age, req.body.ready_to_transfer, req.body.notes])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('Error adding new koala', error);
            res.sendStatus(500);
        });
});

// PUT


// DELETE

module.exports = koalaRouter;