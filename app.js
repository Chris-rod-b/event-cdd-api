const express = require('express');
const bodyParser = require('body-parser');

const connectDb = require('./util.js');

const eventRoutes = require('./src/controllers/event.controller.js');

const { errorHandler } = require('./src/middlewares/index.js');

const app = express();

//middleware
app.use(bodyParser.json());
app.use('/api/events', eventRoutes);
app.use(errorHandler)

connectDb()
    .then(() => {
        console.log('db connection succeeded.');
        app.listen(3030, () => console.log('server started at 3030.'));
    })
    .catch(err => console.log(err));
