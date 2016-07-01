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

$(function(){

  var $optionsPanel = $('#options-panel');

  // remember, second param of `forEach` is a `this` binding
  hotels.forEach(makeOption, $optionsPanel.find('#hotel-choices'));
  restaurants.forEach(makeOption, $optionsPanel.find('#restaurant-choices'));
  activities.forEach(makeOption, $optionsPanel.find('#activity-choices'));

  // make a single `option` tag & associate it with an attraction object
  function makeOption (databaseAttraction) {
    databaseAttraction.type = this.data('type');
    var clientAttraction = attractionsModule.create(databaseAttraction);
    var $option = $('<option></option>') // makes a new option tag
      .text(clientAttraction.name) // with this inner text
      .data({ obj: clientAttraction}); // associates the attraction object with this option
    this.append($option); // add the option to this select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var attraction = $(this)
    .siblings('select')
    .find(':selected')
    .data()
    .obj;
    daysModule.addToCurrent(attraction);
  });

});
