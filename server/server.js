
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const tripRouter = require('./routes/trip.router');
const membersRouter = require('./routes/members.router');
const allTripsRouter = require('./routes/allTrips.router');
const entryPointsRouter = require('./routes/entryPoints.router');
const packingList = require('./routes/packingList.router');
const groupPackingList = require('./routes/groupPackingList.router');
const outfittersRouter = require('./routes/outfitters.router');
const sendList = require('./routes/sendList.router');
const mealsRouter = require('./routes/meals.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/allTrips', allTripsRouter);
app.use('/api/trip', tripRouter);
app.use('/api/members', membersRouter)
app.use('/api/entryPoints', entryPointsRouter)
app.use('/api/packingList', packingList);
app.use('/api/groupPackingList', groupPackingList);
app.use('/api/outfitters', outfittersRouter);
app.use('/api/send', sendList);
app.use('/api/meals', mealsRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
