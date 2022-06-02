const fetch = require('node-fetch');

module.exports.getFingers = async (chord) => {
    // chord1 could either be major and represented as "C", or minor and represented as "Cm"
    fetch(`https://api.uberchord.com/v1/chords/${chord}`)
    .then(res => res.json())
    .then(json => {
        
        return json
})
    
}