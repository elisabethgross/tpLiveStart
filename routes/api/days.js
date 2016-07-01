var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Days = require('../../models/day');


router.use('/', function(req, res, next) {
  Days.findAll()
  .then(function(dbDays) {
    req.dbDays = dbDays;
    next();
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  var err = new Error();
  if (req.dbDays.length === 0) {
    Days.create({
      number: 1
    })
    .then(function (createdDay) {
      res.json([createdDay]);
    })
    .catch(err);
  } else {
    res.send(req.dbDays);
  }
});

router.get('/:dayNum', function(req, res, next) {
  var err = new Error();
  Days.findOne({
    where: {
      number : req.params.dayNum
    }
  })
  .then(function (foundDay) {
    console.log('found day: ' + foundDay.number);
    res.send(200);
  })
  .catch(err);
});

router.post('/:dayNum/:attractionType', function(req, res, next) {
  var err = new Error();
  var attractionType = req.params.attractionType;

  Days.findOne( {
    where: {
      number : req.params.dayNum
    }
  })
  .then(function (foundDay) {
    if (attractionType === 'hotel') {
      Hotel.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (hotel) {
        foundDay.setHotel(hotel);
        res.send(204);
      })
      .catch(err);
    } else if (attractionType === 'restaurant') {
      Restaurant.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (restaurant) {
        foundDay.setRestaurant(restaurant);
        res.send(204);
      })
      .catch(err);
    } else if (attractionType === 'activity') {
      Activity.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (activity) {
        foundDay.setActivity(activity);
        res.send(204);
      })
      .catch(err);
    }
  })
  .catch(err);
});

router.post('/', function(req, res, next) {
  var err = new Error();
  Days.create({
    number: req.dbDays.length + 1
  })
  .then(function (createdDay) {
    res.json(createdDay);
  })
  .catch(err);
});

router.delete('/:dayNum/:attractionType', function(req, res, next) {
  var err = new Error();
  var attractionType = req.params.attractionType;

  Days.findOne( {
    where: {
      number : req.params.dayNum
    }
  })
  .then(function (foundDay) {
    if (attractionType === 'hotel') {
      Hotel.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (hotel) {
        foundDay.destroy(hotel);
        res.send(204);
      })
      .catch(err);
    } else if (attractionType === 'restaurant') {
      Restaurant.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (restaurant) {
        foundDay.destroy(restaurant);
        res.send(204);
      })
      .catch(err);
    } else if (attractionType === 'activity') {
      Activity.findOne({
        where: {
          id : req.body.id
        }
      })
      .then(function (activity) {
        foundDay.destroy(activity);
        res.send(204);
      })
      .catch(err);
    }
  })
  .catch(err);
});


router.delete('/:dayNum', function(req, res, next) {
  var err = new Error();
  Days.findOne( {
    where: {
      number : req.params.dayNum
    }
  })
  .then(function (foundDay) {
    return foundDay.destroy();
  })
  .then(function(result) {
    res.send(204);
  })
  .catch(err);
});


module.exports = router;
