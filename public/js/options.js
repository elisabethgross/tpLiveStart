'use strict';
/* global $ daysModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is associated
 * with an actual attraction object via jQuery's `data` system.
 * Clicking the "add" button will pass that attraction object to the
 * `daysModule` for addition.
 */

// var optionsObj = (function(){

//   var $optionsPanel = $('#options-panel');

//   // remember, second param of `forEach` is a `this` binding
//   hotels.forEach(makeOption, $optionsPanel.find('#hotel-choices'));
//   restaurants.forEach(makeOption, $optionsPanel.find('#restaurant-choices'));
//   activities.forEach(makeOption, $optionsPanel.find('#activity-choices'));

//   // make a single `option` tag & associate it with an attraction object
//   function makeOption (databaseAttraction) {
//     databaseAttraction.type = this.data('type');
//     var clientAttraction = attractionsModule.create(databaseAttraction);
//     var $option = $('<option></option>') // makes a new option tag
//       .text(clientAttraction.name) // with this inner text
//       .data({ obj: clientAttraction}); // associates the attraction object with this option
//     this.append($option); // add the option to this select
//   }

//   // what to do when the `+` button next to a `select` is clicked
//   $optionsPanel.on('click', 'button[data-action="add"]', function () {
//     var attraction = $(this)
//     .siblings('select')
//     .find(':selected')
//     .data()
//     .obj;
//     daysModule.addToCurrent(attraction);
//   });

// }());


$.get('/api/hotels')
.then(function (hotels) {
  var hotelNames = [];
  hotels.forEach(function(hotel) {
    hotelNames.push(hotel.name);
  });
  function makeOptions (hotelName) {
    var $option = $('<option></option>')
    .text(hotelName);
    $('select#hotel-choices').append($option);
  }
  hotelNames.forEach(function (hotelName) {
    makeOptions(hotelName);
  });
})
.catch(console.error.bind(console));

$.get('/api/restaurants')
.then(function (restaurants) {
  var restaurantNames = [];
  restaurants.forEach(function(restaurant) {
    restaurantNames.push(restaurant.name);
  });
  function makeOptions (restaurantName) {
    var $option = $('<option></option>')
    .text(restaurantName);
    $('select#restaurant-choices').append($option);
  }
  restaurantNames.forEach(function (restaurantName) {
    makeOptions(restaurantName);
  });
})
.catch(console.error.bind(console));

$.get('/api/activities')
.then(function (activities) {
  var activityNames = [];
  activities.forEach(function(activity) {
    activityNames.push(activity.name);
  });
  function makeOptions (activityName) {
    var $option = $('<option></option>')
    .text(activityName);
    $('select#activity-choices').append($option);
  }
  activityNames.forEach(function (activityName) {
    makeOptions(activityName);
  });
})
.catch(console.error.bind(console));
