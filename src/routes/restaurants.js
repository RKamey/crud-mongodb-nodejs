const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getIcon } = require('../utils/iconUtils');
let Restaurant = require('../models/restaurants');

router.get('/', (req, res) => { 
    res.render('index');
});

router.get('/restaurants', async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1; 
  const pageSize = 10; 

  try {
    const totalRestaurants = await Restaurant.countDocuments({});
    const totalPages = Math.ceil(totalRestaurants / pageSize);

    const Restaurants = await Restaurant.find({})
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.render('restaurants', { Restaurants, currentPage, totalPages, getIcon });
  } catch (error) {
    console.log(error);
  }
});

router.get('/deleteRestaurant/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.get('/findById/:id', (req, res) => {
  Restaurant.findById(req.params.id)
  .then((restaurant) => {res.render('updateRestaurant', {restaurant})})
  .catch((error) => {res.json({message:error})});
});

router.post('/updateRestaurant', (req, res) => {
  const { id, name, borough, cuisine, street, zipcode, building, latitude, longitude } = req.body;

 Restaurant.findByIdAndUpdate(id, {
    name: name,
    borough: borough,
    cuisine: cuisine,
    address: {
      street: street,
      zipcode: zipcode,
      building: building,
      coord: [longitude, latitude]
    }
  })
    .then(() => {
      res.redirect('/restaurants'); 
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.get('/viewDetails/:id', (req, res) => {
  Restaurant.findById(req.params.id)
  .then((restaurant) => {res.render('viewDetails', {restaurant})})
  .catch((error) => {res.json({message:error})});
});

router.get('/addRestaurant', (req, res) => {
  res.render('addRestaurant');
});

router.post('/addRestaurant', (req, res) => {
  const newRestaurant = Restaurant({
    name: req.body.name,
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    address: {
      street: req.body.street,
      zipcode: req.body.zipcode,
      building: req.body.building,
      coord: [req.body.longitude, req.body.latitude]
    },
    restaurant_id: req.body.restaurant_id
  });

  newRestaurant
  .save()
  .then((data) => {res.redirect('restaurants')})
  .catch((error) => {res.json({message:error})});
});

router.post('/find', async (req, res) => {
  try {
    const searchName = req.body.criteria;
    const Restaurants = await Restaurant.find({ name: { $regex: searchName, $options: 'i' } });

    if (Restaurants.length === 0) {
      return res.render('restaurants', { message: 'No se encontraron restaurantes con ese nombre.' });
    }

    const currentPage = 1; 
    const pageSize = 10;

    const totalRestaurants = Restaurants.length;
    const totalPages = Math.ceil(totalRestaurants / pageSize);

    res.render('restaurants', { Restaurants, currentPage, totalPages, getIcon });
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/filter', async (req, res) => {
  try {
    const { cuisine, borough, zipcode, startDate, endDate } = req.body;
    const currentPage = req.query.page || 1;

    const query = {};

    if (cuisine) {
      query.cuisine = cuisine;
    }

    if (borough) {
      query.borough = borough;
    }

    if (zipcode) {
      query['address.zipcode'] = zipcode;
    }

    if (startDate && endDate) {
      query['grades.date'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const pageSize = 10;
    const skipCount = (currentPage - 1) * pageSize; 

    const filteredRestaurants = await Restaurant.find(query)
      .skip(skipCount)
      .limit(pageSize);

    const totalRestaurants = await Restaurant.countDocuments(query);
    const totalPages = Math.ceil(totalRestaurants / pageSize);

    res.render('restaurants', { Restaurants: filteredRestaurants, currentPage, totalPages, getIcon });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;  