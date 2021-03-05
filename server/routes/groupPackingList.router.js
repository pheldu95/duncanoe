const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:trip_id', (req, res) => {
    
    let queryText = `SELECT * FROM "group_packing_list_items" WHERE "trip_id" = ${req.params.trip_id} AND "rental" = false ORDER BY id ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//get request for the rentals
router.get('/rentals/:trip_id', (req, res) => {
    console.log('getting rentals for', req.params.trip_id);
    
    let queryText = `SELECT * FROM "group_packing_list_items" WHERE "trip_id" = ${req.params.trip_id} AND "rental" = true ORDER BY id ASC`;
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
    let item = req.body;
    let queryText = `INSERT INTO "group_packing_list_items" ("name", "quantity", "trip_id", "rental")
                        VALUES ($1, $2, $3, $4)`
    pool.query(queryText, [item.name, item.quantity, req.params.trip_id, item.rental])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding to group_packing_list_items');
        res.sendStatus(500);
    })
});

//put request to update it's have value. as in, does the user have the item or not
router.put('/have/:item_id', (req, res)=>{
    console.log(req.body, req.params);
    let item_id = req.params.item_id;
    let have = req.body.have;
    //update the have value of the item to the boolean value that was sent
    let queryText = `UPDATE "group_packing_list_items" SET have = $1
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
    let queryText = `UPDATE "group_packing_list_items" SET quantity = $1
                        WHERE "id" = ${item_id};`;
    pool.query(queryText, [quantity]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

//put request to update if an item will be rented or not
router.put('/rental/:item_id', (req, res)=>{
    console.log(req.body, req.params);
    let item_id = req.params.item_id;
    let rentalStatus = req.body.rentalStatus;
    let queryText = `UPDATE "group_packing_list_items" SET rental = $1
                        WHERE "id" = ${item_id};`;
    pool.query(queryText, [rentalStatus]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
})

router.delete('/:item_id', (req, res) =>{
    let item_id = req.params.item_id;
    let queryText = `DELETE FROM "group_packing_list_items" WHERE "id" = ${item_id};`;
    pool.query(queryText).then((results)=>{
        res.sendStatus(200)
    }).catch((err)=>{
        res.sendStatus(500);
        console.log('error deleting item', err);
    })
})
module.exports = router;