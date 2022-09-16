const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// GET


// POST


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

module.exports = koalaRouter;