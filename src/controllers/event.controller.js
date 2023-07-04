const express = require('express');
const router = express.Router();

const Event = require('../models/event.models.js');
const { generateCrudMethods } = require('../services');
const eventCrud = generateCrudMethods(Event);
const { validateDbId, raiseRecord404Error } = require('../middlewares')

router.get('/test', 
    (req, res, next) => {next()},
    (req, res) => {res.send('foo')}
)

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

router.put('/:id', validateDbId,  (req, res) => {
    Event.updateOne(req.params.id)
        .then(data => {
            if (data)
                res.send(data)
            else 
                raiseRecord404Error(req, res)
        })
});

router.delete('/:id', validateDbId, (req, res) => {});

module.exports = router
