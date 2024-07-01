const express = require('express');
const addTripModel = require('../model/addTripModel');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ msg: 'Cities test route.' });
});

router.get('/all', (req, res) => {
  addTripModel.find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log('Error type: ', err));
});

router.get('/onecity/:trip_id', (req, res) => {
  addTripModel.find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log('Error type: ', err));
});

router.post('/save', (req, res) => {
  //call out Schema and assign whatever we type on req.body.X as name and country
  const addTrip = new addTripModel({
    firstname: req.body.firstName,
    country: req.body.country,
    lastname: req.body.lastName,
    country: req.body.country,
    modeOfTrip: req.body.modeOfTrip,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })
  //Mongoose method .save() that returns a promise. If resolved, you can send the object you created in your response back to the DB
  addTripModel.findOne({ firstname: addTrip.firstname })
    .then(city => {
      if (city) res.status(500).send("Trip already exists.");
      else {
        addTrip.save()
          .then(city => {
            res.send(city)
          })
      }
    })
    .catch(err => {
      res.status(500).send("Server error: " + err)
    })
});

module.exports = router;
