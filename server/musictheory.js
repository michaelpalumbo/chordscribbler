const { Key } = require("@tonaljs/tonal");


// const musicKeys = {
//     major: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
//     minor: ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
// }

// drop-down menu 1 is hardcoded, and these are the list elements (please type exactly):
// C major
// Db Major
// .. 

// user has selected this chord in drop-down menu 1
let chord1Choice = "Db major"


let chord = chord1Choice.split(' ')[0]
let type = chord1Choice.split(' ')[1]

console.log('chord', chord, 'type', type)


// let keyInfo;
// // if(process.argv[2]){
// //     chord = process.argv[2]
// // }
// // if(process.argv[3]){
// //     type = process.argv[3]
// // }

// console.log('using chord', chord, type)

switch(type){
    case "major":
        keyInfo = Key.majorKey(chord)
        console.log(keyInfo.chords)
        return keyInfo.chords

    break

    case "minor":
        keyInfo = Key.minorKey(chord)
        console.log(keyInfo.natural.chords)
        return keyInfo.natural.chords
    break
}

// songs this chord progression is found in:
// if I and IV are selected, send GET request to hooktheory api at ~/trends/songs?cp=4,1
// we might want to scrape the database in advance and have this data in our db so users don't need to 
// sign into hooktheory to use this feature. 

/* example of what is returned:
[
    {  
        "artist":"Buddy Holly",
        "song":"That'll Be The Day",
        "section":"Verse",
        "url":"http://local.www.hooktheory.com/theorytab/view/buddy-holly/thatll-be-the-day#verse"
    },
    {  
        "artist":"Carly Rae Jepsen",
        "song":"Call Me Maybe",
        "section":"Chorus",
        "url":"http://local.www.hooktheory.com/theorytab/view/carly-rae-jepsen/call-me-maybe#chorus"
    }
]
*/

// notice that in the url, the string 'local' precedes the 'www'. When i removed this, the link worked, so could just use a regex to filter 'local' out if/when it appears. Or, we don't have to include this at all, could just dynamically list "Artist, Song title, and section"
