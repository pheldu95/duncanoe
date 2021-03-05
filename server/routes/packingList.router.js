const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:trip_id', (req, res) => {
    let queryText = `SELECT * FROM "packing_list_items" WHERE "trip_id" = ${req.params.trip_id} ORDER BY id ASC`;
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
router.post('/:trip_id', (req, res) => {
    console.log(req.body, req.params.trip_id, 'item to add');
    let item = req.body;
    let queryText = `INSERT INTO "packing_list_items" ("name", "quantity", "trip_id")
                        VALUES ($1, $2, $3)`
    pool.query(queryText, [item.name, item.quantity, req.params.trip_id])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding to packing_list_items');
        res.sendStatus(500);
    })
});

//put request to update it's have value. as in, does the user have the item or not
router.put('/have/:item_id', (req, res)=>{
    console.log(req.body, req.params);
    let item_id = req.params.item_id;
    let have = req.body.have;
    //update the have value of the item to the boolean value that was sent
    let queryText = `UPDATE "packing_list_items" SET have = $1
                        WHERE "id" = ${item_id};`;
    pool.query(queryText, [have]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

//put request to update the quantity of the item
router.put('/quantity/:item_id', (req, res)=>{
    console.log(req.body, req.params);
    let item_id = req.params.item_id;
    let quantity = req.body.quantity;
    let queryText = `UPDATE "packing_list_items" SET quantity = $1
                        WHERE "id" = ${item_id};`;
    pool.query(queryText, [quantity]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

router.delete('/:item_id', (req, res) =>{
    let item_id = req.params.item_id;
    let queryText = `DELETE FROM "packing_list_items" WHERE "id" = ${item_id};`;
    pool.query(queryText).then((results)=>{
        res.sendStatus(200)
    }).catch((err)=>{
        res.sendStatus(500);
        console.log('error deleting item', err);
    })
})
module.exports = router;