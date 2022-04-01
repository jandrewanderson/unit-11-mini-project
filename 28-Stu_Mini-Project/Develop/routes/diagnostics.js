const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) =>
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
diagnostics.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { time, error_id, errors } = req.body;
  console.log(req.body);
  // If all the required properties are present
  if (time && error_id && errors) {
    // Variable for the object we will save
    const newDiagnostics = {
      time,
      error_id: uuidv4(),
      errors:{
        tip: "",
        topic: "",
        username: "",
      }
    };

    readAndAppend(newDiagnostics, './db/diagnostics.json');

    const response = {
      status: 'success',
      body: newDiagnostics,
    };

    res.json(response);
  } else {
    res.json('Error in posting diagnostic');
  }
});

module.exports = diagnostics;
