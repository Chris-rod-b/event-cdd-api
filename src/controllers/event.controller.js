const express = require('express');
const router = express.Router();

const Event = require('../models/event.models.js');
const { generateCrudMethods } = require('../services');
const eventCrud = generateCrudMethods(Event);
const { validateDBId, raiseRecord404Error } = require('../middlewares')

router.get('/test', 
    (req, res, next) => {next()},
    (req, res) => {res.send('foo')}
)

router.get('/', (req, res, next) => {
    eventCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.post('/create', (req, res, next) => {
    eventCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});

router.put('/:id', validateDBId,  (req, res, next) => {
    eventCrud.update(req.params.id, req.body)
        .then(data => {
            if (data)
                res.send(data)
            else 
                raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
});

router.delete('/:id', validateDBId, (req, res) => {
    eventCrud.delete(req.params.id)
    .then(data => {
        if (data)
            res.send(data)
        else 
            raiseRecord404Error(req, res)
    })
    .catch(err => next(err))
});

module.exports = router
