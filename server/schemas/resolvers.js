const { User, ChordScribble, History, ChordPairScribble } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Key } = require("@tonaljs/tonal");
const MusicTheory = require('../modules/MusicTheory.js')
const ChordDiagrams = require('../modules/ChordDiagrams.js')
const fetch = require('node-fetch');
const axios = require('axios').default;


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
        // get a user by email
        getUsernameFromEmail: async (parent, { email }) => {
            return User.findOne({ email })
        },
        // gets ChordScribble
        getChordScribble : async (parent, {username,scribbleBox,chordName}) =>{

            return await ChordScribble.findOne({ username,scribbleBox,chordName });

        },
        // gets Chord highlight in dropdown
        getChordHighlighting : async (parent, {username,scribbleBox}) =>{
          
                return await ChordScribble.find({ username,scribbleBox});
        
        },
        // Get highlight for ChordPair
        getChordPairHighlighting : async(parent,{username})=> {
            return await ChordPairScribble.find({ username});
        },
       
        // gets History from User
        getHistory: async (parent, {username})=>{
            let foo = await History.find({username})
            return foo.reverse()
        },
        // gets ChordPairScribble
        getChordPairScribble : async (parent, {username,scribbleBox,chord1,chord2}) =>{

            return await ChordPairScribble.findOne({ username,scribbleBox,chord1,chord2 });
        },
        // gets Chord 2 list
        chordTwoList: async (parent, {chord})=>{
            // user has selected this chord in drop-down menu 1
            let choice = await JSON.stringify(MusicTheory.getChord2List(chord))
            console.log(choice)
            return choice
        },

    },
    
    Mutation: {
        //mutation for addUser
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);

             return { token, user };
        },
        // mutation for user login
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
        // gets mutation for chordScribble
        chordScribble : async (parent, {username,scribbleText,scribbleBox,chordName}) =>{
            console.log(username,scribbleText,scribbleBox,chordName)
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
        // mutation for ChordScribble
        chordPairScribble : async (parent, {username,scribbleText,scribbleBox,chord1,chord2}) =>{
            console.log(username,scribbleText,scribbleBox,chord1,chord2)
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
         // mutation to update user's history panel
        updateHistory: async(parent, {username, historyItem}) => {
            let timeStamp = new Date();
            return await History.create({ username, historyItem, timeStamp });
        }
        
      }

};
  
module.exports = resolvers;