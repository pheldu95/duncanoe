const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('req.user', req.user);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    //if we are authenticated, then it will send the query, else it will send 403, which means forbidden
    if(req.isAuthenticated()){
        let queryText = `SELECT trips.id, trips.title, trips.user_id, trips.area, trips.difficulty, 
                            trips.start_date, trips.end_date, trips.entry_point, trips.experience, 
                            entry_points."name", entry_points.link, entry_points.address
                            FROM "trips" 
                            JOIN entry_points ON trips.entry_point = entry_points.number
                            WHERE user_id = ${req.user.id} ORDER BY id ASC`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

// no posts or anything. this router is just to get all trips for displaying

module.exports = router;