const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET
koalaRouter.get('/', (req, res) => {
    console.log('GET /koalas');

    let sqlText = 'SELECT * FROM "koalas";';

    pool.query(sqlText)
        .then((dbRes) => {
            let theKoalas = dbRes.rows;
            res.send(theKoalas);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('SQL query in GET /koalas failed:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500)
        })
})


// POST


// PUT
koalaRouter.put('/:id', (req, res) => {
    // req.params should look like: { id: '3' }
    let theIdToUpdate = req.params.id;
    let readyToTransfer = req.body.type;
    let sqlText = `
        UPDATE "koalas"
            SET "ready_to_transfer"=$1
            WHERE "id"=$2;
    `
    let sqlValues = [readyToTransfer, theIdToUpdate];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('PUT /koalaRouter fail:', dbErr);
            res.sendStatus(500);
        })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log(req.params);

    let theIdToDelete = req.params.id;

    // Will need to update the name of table for the
    //  delete from SQL query
    // Set up to sanitize the input when paired with
    //  sqlValues.
    let sqlText = `
        DELETE from "koalas"
            where "id"=$1;
    `;

    // Set up to pair with sqlText to sanitize input.
    let sqlValues = [theIdToDelete];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // Send "Okay" to the client that declares this
            //  delete was accepted/processed
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            // Log that there was an issue with this function
            console.log('delete /koalas/:id error:', dbErr);
            // Send "Internal Server Error" status to client
            res.sendStatus(500);
        })
})

module.exports = koalaRouter;