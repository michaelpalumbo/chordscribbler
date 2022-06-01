const { Key } = require("@tonaljs/tonal");

module.exports.getChord2List = (chord1) => {
    // chord1 could either be major and represented as "C", or minor and represented as "Cm"
    let chord
    let type = chord1.split('').slice(-1)[0]
    if(type === 'm'){
        chord = chord1.slice(0, -1)
        keyInfo = Key.minorKey(chord)
        return keyInfo.natural.chords
        
    }else {  
        keyInfo = Key.majorKey(chord1)
        return keyInfo.chords
    }
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
