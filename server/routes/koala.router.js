const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    console.log('GET /koalas');

    let sqlText = 'SELECT * FROM koalas'

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
koalaRouter.post('/', (req, res) => {
    console.log('POST /koalas');
    let newKoala = req.body;
    let sqlText = `INSERT INTO "koalas" ('name', 'age', 'gender','ready_for_transfer','notes');
                VALUES($1,$2,$3,$4,$5);`;
    let sqlValues = [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, newKoala.notes];
    pool.query(sqlText, sqlValue)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new koala`, error);
            res.sendStatus(500);
        })
})


// PUT


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