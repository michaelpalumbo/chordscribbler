const { Schema, model} = require ('mongoose');
const moment = require('moment')
const historySchema = new Schema(
    {
        username: { 
            type: String,
            required: true,
            
        },
        scribbleText: {
            type: String,
            required: 'You need to have a ScribbleText',
        },
        scribbleBox: {
            type: Number,
            required: true
        },
        chordName: {
            type: String,
            required: true
        },
        timeStamp:{
            type: Date,
            required: true,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
            default: Date.now
        }
    }
)

const History = model('History', historySchema)

module.exports = History