const express = require('express');
const router = express.Router();

const Event = require('../models/event.models.js');
const { generateCrudMethods } = require('../services');
const eventCrud = generateCrudMethods(Event);

router.get('/', (req, res) => {
    eventCrud.getAll()
        .then(data => res.send(data))
        .catch(err => console.log(err))
});

router.post('/create', (req, res) => {
    eventCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
});

module.exports = router
