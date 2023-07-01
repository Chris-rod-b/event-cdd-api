const mongoose = require('mongoose')

module.exports =  mongoose.model('Event', {
    id: { type: Number },
    name: { type: String },
    location: { type: String },
    startedDate: { type: Date },
    endedDate: { type: Date },
    concluded: { type: Boolean }
}, 'cdd');
