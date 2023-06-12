const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const restaurantsRoutes = require('./routes/restaurants');
const moment = require('moment');

mongoose.Promise = global.Promise;
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(restaurantsRoutes);
app.use('/assets', express.static(__dirname + '/public'));

mongoose
    .connect(process.env.MONGODB_URI, { dbName: 'restaurants', useNewUrlParser: true, useUnifiedTopology: true, autoCreate: false })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(error => console.error(error));

app.listen(port, () => console.log(`Server running on port ${port}`));