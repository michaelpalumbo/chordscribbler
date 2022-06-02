import React, {useEffect, useState} from 'react';
import AuthService from '../utils/auth';
import { useQuery, useLazyQuery, useMutation, createHttpLink } from '@apollo/client';
import { QUERY_FIRST_CHORD, QUERY_SCRIBBLE, QUERY_PAIR_SCRIBBLE, QUERY_HISTORY } from '../utils/queries';
import { MUTATION_CHORD_SCRIBBLE, UPDATE_HISTORY, MUTATION_CHORD_PAIR_SCRIBBLE } from '../utils/mutations';
import moment from 'moment'
import {Helmet} from "react-helmet";
import GuitarChord from 'react-guitar-chords';
const axios = require('axios').default;
let username = localStorage.getItem('username');
let chord1Selection, chord2Selection
// we store the history in this, push to it and then send via the updateHistory mutation, and then use historyBuffer.join('\n') when updating the history panel state
let historyBuffer = []
const Home = () =>{
  // STATE UPDATES
  const [chord1Scribble, setChord1Scribble] = useState('')
  const [chord2Scribble, setChord2Scribble] = useState('')
  const [chordPairScribble, setChordPairScribble] = useState('')
  const [chord2MenuItems, setChord2MenuItems] = useState( [])
  const [chord1Diagram, setChord1Diagram] = useState([])
  const [chord2Diagram, setChord2Diagram] = useState([])
  const [historyPanel, sethistoryPanel] = useState('')
  
  // MUTATIONS
  const [storeScribble1, { data }] = useMutation(MUTATION_CHORD_SCRIBBLE);
  const [storeScribble2, { scribble2Data }] = useMutation(MUTATION_CHORD_SCRIBBLE);
  const [storeChordPairScribble, { data: chordPairScribbles }] = useMutation(MUTATION_CHORD_PAIR_SCRIBBLE);
  const [ saveHistoryData ] = useMutation(UPDATE_HISTORY);
  // QUERIES
  // USE A LAZYQUERY to run a query anytime after the component loads. in this case, use it to get the chord2List
  const [getChord2List, {data: myValues}] = useLazyQuery(QUERY_FIRST_CHORD, {
    onCompleted: someData => {
    
      let chord2List = JSON.parse(someData.chordTwoList)
      // populate chord2menu
      populateChord2Menu(chord2List)
    }
  });
  const [getChord1Scribble, {data: scribble1}] = useLazyQuery(QUERY_SCRIBBLE, {
    onCompleted: scribbleText => {
      // if scribbleText exists for chosen chord...
      if(scribbleText.getChordScribble){
        

        setChord1Scribble(scribbleText.getChordScribble.scribbleText)
      }
    }
  });
  const [getChord2Scribble, {data: scribble2}] = useLazyQuery(QUERY_SCRIBBLE, {
    onCompleted: scribbleText => {
      
      // if scribbleText exists for chosen chord...
      if(scribbleText.getChordScribble){
        setChord2Scribble(scribbleText.getChordScribble.scribbleText)
      }
    }
  });
  const [getChordPairScribble, {data: chordPairScribbleReturn}] = useLazyQuery(QUERY_PAIR_SCRIBBLE, {
    onCompleted: scribbleText => {
      // if scribbleText exists for chosen chord...
      
      if(scribbleText.getChordPairScribble){
        
        setChordPairScribble(scribbleText.getChordPairScribble.scribbleText)
      }
      // if(scribbleText.getChordScribble){

      //   setChord1Scribble(scribbleText.getChordScribble.scribbleText)
      // }
    }
  });
  const [getHistory, {data: fullHistory}] = useLazyQuery(QUERY_HISTORY, {
    onCompleted: theHistory => {
        
      let h = theHistory.getHistory
      
      for(let i=0;i<h.length;i++){
        historyBuffer.push(h[i].historyItem)
      }
      let history = historyBuffer.join('\n---------------\n')
      // update the panel
      sethistoryPanel(history)
      
      // // if scribbleText exists for chosen chord...
      // if(scribbleText.getChordScribble){
        
      //   setChord2Scribble(scribbleText.getChordScribble.scribbleText)
      // }
    }
  });

  // const { get, post, response, loading, error } = useFetch(fetchUrl)
  
  // get history, inject it into the panel
  useEffect(() => {
    getHistory({variables: {username: username}})
    // test fetch
    
  }, [])


  
  function updateHistory(string){
    if(string != null){     
      let timestamp = moment().format('MMMM Do YYYY, h:mm a');
      let str = `${timestamp}: ${string}`
      historyBuffer.unshift(str)
      let history = historyBuffer.join('\n---------------\n')
      // update the panel
      sethistoryPanel(history)
      // update the history in db
      // @echeta, pass var <string> thru mutation
      saveHistoryData( { variables: {username: username, historyItem: str} });
    }
  }

  /*/////////////////////////////////////
   chord1menu code */

  // dropdown initial state
  let [chord1MenuItems, setChord1MenuItems] = useState( ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"])


  // setChord1Scribble('')
  // capture menu1 input changes, doo a buncha things
  const handleMenu1Change = async (event) => {
    // reset scribble text box to empty string
    setChord1Scribble('')
    let { value } = event.target;
   
    chord1Selection = value
    // pass values to chord2menu state
    getChord2List({ variables: {chord: value } });
    // retrieve chord1 scribble text
    getChord1Scribble({ variables: {username: username, scribbleBox: 1, chordName: value } })
    // update history panel
    let history = `Chord One: ${chord1Selection}`
    updateHistory(history)

    // get diagram
    if(value.includes('m')){
      // hack, technically incorrect but needed for mvp
      let key = value.slice(0, value.indexOf('m7'))
      value = key + '_m'
    }
    axios.get(`https://api.uberchord.com/v1/chords/${value}`)
    .then(resp => {
        let fingering = resp.data[0].fingering.split( ' ')
        
        setChord1Diagram(convertFingering(fingering))
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });
  
  };
  
  function convertFingering(fingers){
      let convertedFingering = []
      for(let i=0;i<fingers.length; i++){
          let finger;
          if(fingers[i] === 'X'){
              finger = 'x'
          } else {
              finger = Number.parseInt(fingers[i], 10)
              // 
             
          }
          convertedFingering.push(finger)
      }
      return convertedFingering
    }

  /*/////////////////////////////////////
   chord2menu code */
  function populateChord2Menu(array){
    // clear the select before repopulating
    setChord2MenuItems([])
    // populate:
    setChord2MenuItems(array)
  }

    // capture menu1 input changes, doo a buncha things
    const handleMenu2Change = async (event) => {
      // reset scribble text box to empty string
      setChord2Scribble('')
      let { value } = event.target;
      
      chord2Selection = value

      // retrieve chord2 scribble text
      getChord2Scribble({ variables: {username: username, scribbleBox: 2, chordName: value } })

      // retrieve chordpair scribble
      getChordPairScribble({ variables: {username: username, scribbleBox: 3, chord1: chord1Selection, chord2: chord2Selection } })
      // update history panel
      let history = `Chord Two: ${chord2Selection}`
      updateHistory(history)
      history = `Chord Pairing: ${chord1Selection} and ${chord2Selection}`
      updateHistory(history)
        if(value.includes('maj7')){
          // hack, technically incorrect but needed for mvp
          let key = value.slice(0, value.indexOf('maj7'))
          value = key + '_maj7'
        }
        if(value.includes('m7')){
          // hack, technically incorrect but needed for mvp
          let key = value.slice(0, value.indexOf('m7'))
          value = key + '_m7'
        }
        if(value.includes('m7b5')){
          // hack, technically incorrect but needed for mvp
          let key = value.slice(0, value.indexOf('m7b5'))
          value = key + '_m7b5'
        }
        
          // get diagram
        axios.get(`https://api.uberchord.com/v1/chords/${value}`)
        .then(resp => {
          
          let fingering = resp.data[0].fingering.split( ' ')
           
            setChord2Diagram(convertFingering(fingering))
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      
    };

   /*/////////////////////////////////////
  chord1 scribble code */

  
  // capture scribble1 input changes, update db
  const handleScribble1Change = async (event) => {
    let { value } = event.target;
   

    storeScribble1({ variables: {  "username": username,
        "scribbleText": value,
        "scribbleBox": 1,
        "chordName": chord1Selection },
      }) 
  };
   /*/////////////////////////////////////
   chord2 scribble code */

  
  // capture scribble1 input changes, update db
  const handleScribble2Change = async (event) => {
    let { value } = event.target;
   

    storeScribble2({ variables: {  username: username,
        scribbleText: value,
        scribbleBox: 2,
        chordName: chord2Selection },
      }) 
  };

  // todo get enter/return and when user clicks outside of textarea to fire the updateHistory for that line in the textarea
  // update history panel
  // let history = `${username} added note to ${chord1Selection}: ${scribbleText.getChordScribble.scribbleText}`
  // updateHistory(history)

   /*/////////////////////////////////////
   chordpair scribble code */
  const handlePairScribbleChange = async(event) => {
    let {value} = event.target;
    // do the query
    storeChordPairScribble({ variables: {
      username: username,
      scribbleText: value,
      scribbleBox: 3,
      chord1: chord1Selection,
      chord2: chord2Selection
    },
      }) 
  }


   
    const loggedIn = AuthService.loggedIn();

    return (    
      <main>
        <Helmet>
         {/* chord diagrams api BEGIN THIS NEEDS TO STAY UP HERE */}
        <script async type="text/javascript" src="https://www.scales-chords.com/api/scales-chords-api.js"></script>
          <script
          src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        
          <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

          <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>

          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
            

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>

        </Helmet>

     

          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col">
                         {/* Chord 1 Menu */}
                          <select onChange={handleMenu1Change} name="chord1Menu" id="chord1Menu" class="form-select form-select-lg shadow-lg p-3 mb-5 bg-body rounded">
                            <option>Select Chord One</option>
                            {
                              chord1MenuItems.map(chord => <option value={chord}>{chord}</option>)
                            }
                          </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                      <GuitarChord
                        // chordName='Cm'
                        frets={chord1Diagram}
                      />
                        {/* <div>{chord1Diagram}</div> */}
                        {/* <!-- this is where the chord1 diagrams will go. Michael will take care of this code soonish --> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                         {/* chord 1 scribble */}
                    <div className="form-outline shadow-lg p-3 mb-5 bg-body rounded">
                      <textarea onChange={handleScribble1Change}className="form-control" id="chord1Scribble" placeholder="Write your progress for Chord 1 here" rows="4" defaultValue={chord1Scribble} ></textarea>
                    </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col">
                        {/* Chord 2 Menu */}
                          <select onChange={handleMenu2Change} name="chord2Menu" id="chord2Menu" class="form-select form-select-lg mb-3 shadow-lg p-3 mb-5 bg-body rounded">
                            <option>Select Chord Two</option>
                            {
                              chord2MenuItems.map(chord => <option value={chord}>{chord}</option>)
                            }
                          </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                      <GuitarChord
                        // chordName='Cm'
                        frets={chord2Diagram}
                      />
                      {/* <!-- this is where the chord2 diagrams will go. Michael will take care of this code soonish --> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {/* chord 2 scribble */}
                        <div className="form-outline shadow-lg p-3 mb-5 bg-body rounded">
                        <textarea onChange={handleScribble2Change}className="form-control" id="chord2Scribble" placeholder="Write your progress for Chord 2 here" rows="4" defaultValue={chord2Scribble} ></textarea>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {/* chord pair scribble */}
                    <div className="form-outline shadow-lg p-3 mb-5 bg-body rounded">
                      <textarea className="form-control" onChange={handlePairScribbleChange}id="chordPairScribble" placeholder="Write your progress for this chord pairing here" defaultValue={chordPairScribble} rows="6"></textarea>
                    </div>
                  </div>
                </div>                  
              </div>
              <div className="col-md-4 alert alert-secondary" role="alert">
                 {/* History panel */}
                 <p class="text-center"><h4 class="alert-heading">{username}'s History</h4></p>
                  
                  <textarea readonly className="form-control" id="chordHistory" placeholder="Your progress will be listed here" rows="30" defaultValue={historyPanel}></textarea>
            
              </div> 
            </div>
          </div>
                   
        
        {/* </div> */}

      </main>

    );
  // }
  
};



export default Home;

