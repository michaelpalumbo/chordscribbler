const { Schema , model } = require('mongoose');


const chordScribbleSchema = new Schema(
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
    },
    {
        toJSON: {
          getters: true
        }
      }
);

const ChordScribble = model('ChordScribble', chordScribbleSchema);

module.exports = ChordScribble;
