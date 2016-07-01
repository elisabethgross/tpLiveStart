'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var daysModule = (function () {

  // application state

  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', function() {
      $.post('/api/days')
      .then(function(newDay) {
        addDay(newDay.number);
      });
    });
    $removeButton.on('click', function() {
      console.log(currentDay)
      $.ajax({
        method: 'DELETE',
        url: '/api/days/' + currentDay.number,
      })
      .then(function(theDay) {
        deleteCurrentDay();
      });
    });
  });



  function addDay (num) {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create({ number: num }); // dayModule
    days.push(newDay);
    switchTo(newDay);
    if (days.length === 1) {
      currentDay = newDay;
      switchTo(currentDay);
    }
  }

  $.get('/api/days')
  .then(function (daysArr) {

    daysArr.forEach(function (day) {
      // days.push(day);
      addDay(day.number);
    });

  });

  function deleteCurrentDay () {
    console.log(days);
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var methods = {

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return methods;

}());
