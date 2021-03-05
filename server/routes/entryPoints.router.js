const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "entry_points" ORDER BY number ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
    
});

router.get('/:ep_number', (req, res) => {
    let queryText = `SELECT * FROM "entry_points" WHERE number = ${req.params.ep_number} ORDER BY number ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });

});

//update the entry point column with the chosen entry point
router.put('/:trip_id', (req, res) => {
    
    console.log('updating the entry point:', req.body, req.params);
    
    let queryText = `UPDATE "trips" SET entry_point = $1 WHERE "id" = ${req.params.trip_id} RETURNING *;`
    pool.query(queryText, [req.body.ep]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});

module.exports = router;