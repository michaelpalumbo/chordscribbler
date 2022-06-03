const { Schema, model} = require ('mongoose');
const moment = require('moment')

//Schema for the History Panel
const historySchema = new Schema(
    {
        username: { 
            type: String,
            required: true,
            
        },
        historyItem: {
            type: String,
            required: 'You need to have a historyItem',
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