
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    address: {
      building: String,
      coord: {
        type: [Number],
        index: '2dsphere'
      },
      street: String,
      zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [
      {
        date: Date,
        grade: String,
        score: Number
      }
    ],
    name: String,
    restaurant_id: String
  });

module.exports = mongoose.model('restaurant', restaurantSchema);
  