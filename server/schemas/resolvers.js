const { User, ChordScribble, History, ChordPairScribble } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Key } = require("@tonaljs/tonal");
const MusicTheory = require('../modules/MusicTheory.js')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');
            
                return userData;
            }
        },
        
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        chordTwoList: async (parent, {chord})=>{
            // user has selected this chord in drop-down menu 1
            return await JSON.stringify(MusicTheory.getChord2List(chord))
        },
        getChordScribble : async (parent, {username,scribbleBox,chordName}) =>{

            return await ChordScribble.findOne({ username,scribbleBox,chordName });

        },
        getHistory: async (parent, {username})=>{
            let foo = await History.find({username})
            
            return foo.reverse()
        }

    },
    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);

             return { token, user };
        },
        login: async (parent,{ email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        chordScribble : async (parent, {username,scribbleText,scribbleBox,chordName}) =>{
           let newScribble 
            const chordScribble = await ChordScribble.findOne({ username,scribbleBox,chordName });
                if (chordScribble) {
                    // this chordScribble exists, therefore will update it 
                    newScribble = await ChordScribble.findOneAndUpdate({username,scribbleBox,chordName },{scribbleText: scribbleText},{new: true} )
                    
                }
                else {
                    // chordCribble doesn't exist yet, create it
                    newScribble = await ChordScribble.create({ username,scribbleText,scribbleBox,chordName });

                }
            
            
            
            return newScribble
        },
        chordPairScribble : async (parent, {username,scribbleText,scribbleBox,chord1,chord2}) =>{
            let newScribble 
             const chordPairScribble = await ChordPairScribble.findOne({ username,scribbleBox,chord1,chord2 });
                 if (chordPairScribble) {
                     // this chordPairScribble exists, therefore will update it 
                     newScribble = await ChordPairScribble.findOneAndUpdate({username,scribbleBox,chord1,chord2 },{scribbleText: scribbleText},{new: true} )
                     
                 }
                 else {
                     // chordCribble doesn't exist yet, create it
                     newScribble = await ChordPairScribble.create({ username,scribbleText,scribbleBox,chord1,chord2 });
 
                 }
             
             
             
             return newScribble
         },
        updateHistory: async(parent, {username, scribbleText, scribbleBox, chordName}) => {
            let timeStamp = new Date();
            return await History.create({ username,scribbleText,scribbleBox,chordName, timeStamp });
        }
        
      }

};
  
module.exports = resolvers;