const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    console.log('In GET route /koalas');
    // set variable to sql command
    let queryText = `SELECT * FROM "koalas";`;
    pool.query(queryText).then((result) => {
        // return the rows from the "koalas" table
        res.send(result.rows);
    }).catch((error) => {git 
        console.log('Error getting koalas', error);
        res.sendStatus(500);
    });
});

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
koalaRouter.put('/:koalaid', function (req,res){
    console.log('in PUT route', req.params, req.body);
    const query = 'UPDATE "koalas" SET "ready_to_transfer"=$1 WHERE id=$2;';
    pool.query(query, [req.body.ready_to_transfer, req.params.koalaid])
    .then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making PUT', error);
        res.sendStatus(500);
    });
    });

// DELETE
koalaRouter.delete('/:koalaid', (req,res) => {
    console.log('In DELETE route /koalas', req.body, req.params);
    let koalaid = req.params.koalaid;
    const queryText = `DELETE FROM "koalas" WHERE id=$1 RETURNING *;`;
    pool.query(queryText, [koalaid]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error deleting koala',error);
        res.sendStatus(500);
    });
});

module.exports = koalaRouter;