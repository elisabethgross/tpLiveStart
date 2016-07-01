var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotels = require('../../models/hotel');
var Restaurants = require('../../models/restaurant');
var Activities = require('../../models/activity');

router.get('/hotels', function(req, res, next) {
  Hotels.findAll()
  .then(function(dbHotels) {
    res.send(dbHotels);
  })
  .catch(next);
});

router.get('/restaurants', function(req, res, next) {
  Restaurants.findAll()
    .then(function(dbRestaurants) {
      res.send(dbRestaurants);
    })
    .catch(next);
});

router.get('/activities', function(req, res, next) {
  Activities.findAll()
  .then(function(dbActivities) {
    res.send(dbActivities);
  })
  .catch(next);
});

module.exports = router;
