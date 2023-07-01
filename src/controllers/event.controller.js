const express = require('express');
const router = express.Router();

const Event = require('../models/event.models.js');

router.get('/', (req, res) => {
    Event.find()
        .then(data => res.send(data))
        .catch(err => console.log(err))
});

router.post('/create', (req, res) => {
    Event.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err))
});

module.exports = router
