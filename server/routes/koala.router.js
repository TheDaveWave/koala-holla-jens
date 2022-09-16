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
    }).catch((error) => {
        console.log('Error getting koalas', error);
        res.sendStatus(500);
    });
});

// POST


// PUT


// DELETE
koalaRouter.delete('/:koalaid', (req,res) => {
    console.log('In DELETE route /koalas', req.body, req.params);
    let koalaid = req.params.koalaid;
    
});

module.exports = koalaRouter;