const { Schema , model } = require('mongoose');

// Schema for chordPairScribble
const chordPairScribbleSchema = new Schema(
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
        chord1: {
            type: String,
            required: true
        },
        chord2: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
          getters: true
        }
      }
);

const ChordPairScribble = model('chordPairScribble', chordPairScribbleSchema);

module.exports = ChordPairScribble;
