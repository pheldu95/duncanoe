const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:tripId', (req, res) => {
    console.log('trip id', req.params.tripId);
    
    let queryText = `SELECT trips.id, trips.title, trips.user_id, trips.area, trips.difficulty, 
                            trips.start_date, trips.end_date, trips.entry_point, trips.experience, 
                            entry_points."name", entry_points.link, entry_points.address
                            FROM "trips" 
                            JOIN entry_points ON trips.entry_point = entry_points.number
                            WHERE trips.id = ${req.params.tripId}`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});
router.post('/', (req, res) => {
    console.log('req.body in trip post', req.body);
    let newTrip = req.body;
    //RETURNING * comes back with all the info for the row that was just made
    let queryText = `INSERT INTO "trips" ("title", "user_id")
                        VALUES ($1, $2)
                        RETURNING *;`;
    pool.query(queryText, [newTrip.title, newTrip.user_id])
    .then(result => {    
        res.send(result);
    })
    .catch(error => {
        console.log(`Error adding new trip`, error);
        res.sendStatus(500);
    });
});

router.put('/:trip_id', (req, res) => {
    let pageOneData = req.body;
    console.log(pageOneData, req.params.trip_id);
    
    //we will RETURNING * here again so we can update the tripReducer
    let queryText = `UPDATE "trips" SET title = $1, start_date = $2, end_date = $3, difficulty = $4, experience = $5, area = $6 WHERE "id" = ${req.params.trip_id} RETURNING *;`
    pool.query(queryText, [pageOneData.title, pageOneData.startDate, pageOneData.endDate, pageOneData.difficulty, pageOneData.experience, pageOneData.area]).then((results) => {
        console.log(results.rows);
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});

//There might be a way to do this without repeating myself over and over
router.delete('/:trip_id', (req, res) => {
    ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryText = `DELETE FROM trip_members WHERE trip_id = $1;`
            await client.query(queryText, [req.params.trip_id]);
            queryText = `DELETE FROM packing_list_items WHERE trip_id = $1`
            await client.query(queryText, [req.params.trip_id]);
            queryText = `DELETE FROM group_packing_list_items WHERE trip_id = $1`
            await client.query(queryText, [req.params.trip_id]);
            queryText = `DELETE FROM trips WHERE id =$1`;
            await client.query(queryText, [req.params.trip_id]);
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            res.sendStatus(200)
            //must release the client at the end
            //or else the client will remain unavailable if you 
            //want to use it again?
            client.release()
        }
    })().catch(e => console.error(e.stack))
});

//will delete all packing list items.
//it is requested when we go back to new trip page 1 from new trip page 2
router.delete('/deleteItems/:trip_id', (req, res) => {
    ;(async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryText = `DELETE FROM packing_list_items WHERE trip_id = $1;`
            await client.query(queryText, [req.params.trip_id]);
            queryText = `DELETE FROM group_packing_list_items WHERE trip_id = $1;`
            await client.query(queryText, [req.params.trip_id]);
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            res.sendStatus(200)
            //must release the client at the end
            //or else the client will remain unavailable if you 
            //want to use it again?
            client.release()
        }
    })().catch(e => console.error(e.stack))
});

module.exports = router;