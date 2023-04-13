const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


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