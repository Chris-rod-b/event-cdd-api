const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://admin:123admin456' +
                '@cluster-api.9i4fwlh.mongodb.net/' +
                'event_db?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
                
module.exports = () => {
    return mongoose.connect(dbURI, 
        { useNewUrlParser: true, useUnifiedTopology: true });
}
