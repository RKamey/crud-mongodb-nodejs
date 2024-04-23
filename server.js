const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')
const usersRoutes = require('./src/routes/users');
const restaurantsRoutes = require('./src/routes/restaurants');
const { isAuthenticated } = require('./src/middlewares/authMiddleware');

mongoose.Promise = global.Promise;
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(usersRoutes);
app.use(isAuthenticated);
app.use(restaurantsRoutes);

app.use('/assets', express.static(path.join(__dirname, 'src',  '/public')));

mongoose
    .connect(process.env.MONGODB_URI, { dbName: 'restaurants', useNewUrlParser: true, useUnifiedTopology: true, autoCreate: false })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(error => console.error(error));

app.listen(port, () => console.log(`Server running on port ${port}`));