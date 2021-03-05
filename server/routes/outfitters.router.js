const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:ep_number', (req, res) => {
    let queryText = `SELECT outfitters.name, outfitters.link, outfitters.address, outfitters.description, outfitters.phone FROM outfitters
                    JOIN outfitter_reference_table ON outfitter_reference_table.outfitter_id = outfitters.id
                    WHERE entry_point_number = ${req.params.ep_number};`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;