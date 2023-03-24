const express = require('express');
const axios = require('axios');

const {port, stateNames, dataUrlArray} = require('./consts.js');

const app = express();


// simple Express.js RESTful API
'use strict';

// /hello/ GET request
app.get('/restapi/', (req, res) => {
  var data = [];

  console.log(req.query);

  clinics.forEach(clinic => {
    if (req.query.name != undefined && clinic.name.search(req.query.name) < 0) {
      return;
    }

    if (req.query.state != undefined && clinic.state != req.query.state && clinic.state != stateNames[req.query.state]) {
      return;
    }

    if (req.query.from != undefined && clinic.availability.from != req.query.from) {
      return;
    }

    if (req.query.to != undefined && clinic.availability.to != req.query.to) {
      return;
    }
    data.push(clinic);
  })

  res.json(
    { data: data }
  )

});

var clinics = [];

var addClinic = function (item) {
  var name;
  var state;
  var availability;

  if (item.name !== undefined) {
    name = item.name;
  }
  if (item.clinicName !== undefined) {
    name = item.clinicName;
  }
  if (item.stateName !== undefined) {
    state = stateNames[item.stateName];
  }
  if (item.stateCode !== undefined) {
    state = item.stateCode;
  }
  if (item.availability !== undefined) {
    availability = item.availability;
  }
  if (item.opening !== undefined) {
    availability = item.opening;
  }

  clinics.push({
    name: name,
    state: state,
    availability: availability
  });
}

var import_clinics_from_url = function (callback, i = 0) {

  if (dataUrlArray.length == i) {
    callback();
    return;
  }

  var url = dataUrlArray[i];

  axios.get(url)
    .then(function (response) {
      // handle success
      console.log(`Import Data From ${url} SUCCESS`);
      response.data.forEach(element => {
        addClinic(element);
      });
    })
    .catch(function (error) {
      // handle error
      console.log(`Import Data From ${url} ERROR ${error}`);
      return;
    })
    .finally(function () {
      // always executed
      import_clinics_from_url(callback, i + 1);
    });
}

var initialize = function () {
  var callback = function () {
    app.listen(port, () => {
      console.log(clinics);
      console.log(`Server started on port ${port}`);
    });
  };

  import_clinics_from_url(callback);
};

// start server

initialize();