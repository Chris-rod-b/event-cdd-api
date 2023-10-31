const mongoose = require('mongoose')

module.exports =  mongoose.model('Event', {
    name: { type: String },
    location: { type: String },
    startedDate: { type: Date },
    endedDate: { type: Date },
    concluded: { type: Boolean },
    banner: {type: String }
}, 'cdd');
