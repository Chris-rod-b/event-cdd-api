const express = require('express');
const bodyParser = require('body-parser');

const connectDb = require('./util.js');

const eventRoutes = require('./src/controllers/event.controller.js');

const { errorHandler } = require('./src/middlewares/index.js');

const app = express();

//CORS Issues
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*")
    next();
});
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
