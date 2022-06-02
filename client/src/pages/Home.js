import React, {useState} from 'react';
import { Dropdown, Input } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Select from 'react-select';
import { QUERY_FIRST_CHORD, QUERY_SCRIBBLE, QUERY_PAIR_SCRIBBLE, QUERY_GET_USERNAME_FROM_EMAIL } from '../utils/queries';
import { MUTATION_CHORD_SCRIBBLE } from '../utils/mutations';
// import chordScribbles from '../utils/chordScribbles'
// import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";

let username = localStorage.getItem('username');
let chord1Selection, chord2Selection
// we store the history in this, push to it and then send via the updateHistory mutation, and then use historyBuffer.join('\n') when updating the history panel state
let historyBuffer = []
const Home = () =>{
  const [chord1Scribble, setChord1Scribble] = useState('')
  const [chord2Scribble, setChord2Scribble] = useState('')
  const [chord2MenuItems, setChord2MenuItems] = useState( [])
  const [chord1Diagram, setChord1Diagram] = useState('')
  const [historyPanel, sethistoryPanel] = useState('')
  const [storeScribble1, { data }] = useMutation(MUTATION_CHORD_SCRIBBLE);
  const [storeScribble2, { scribble2Data }] = useMutation(MUTATION_CHORD_SCRIBBLE);



  function updateHistory(string){
    if(string != null){     
      historyBuffer.push(string)
      let history = historyBuffer.join('\n')
      // update the panel
      sethistoryPanel(history)
      // update the history in db
      // @echeta, pass var <string> thru mutation
    }
  }
  
  /*/////////////////////////////////////
   first things first, get username by their email, as we need it for all mutations/queries */
  // username = Auth.getProfile().data.username
  
  /*/////////////////////////////////////
   chord1menu code */

  // dropdown initial state
  let [chord1MenuItems, setChord1MenuItems] = useState( ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"])
  // USE A LAZYQUERY to run a query anytime after the component loads. in this case, use it to get the chord2List
  const [getChord2List, {data: myValues}] = useLazyQuery(QUERY_FIRST_CHORD, {
    onCompleted: someData => {
      let chord2List = JSON.parse(someData.chordTwoList)
      // populate chord2menu
      populateChord2Menu(chord2List)
    }
  });

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
    let history = `${username} selected ${chord1Selection} for Chord One`
    updateHistory(history)
  
  };
  
  

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
      getChord2Scribble({ variables: {username: username, scribbleBox: 1, chordName: value } })

      // update history panel
      let history = `${username} selected ${chord2Selection} for Chord Two`
      updateHistory(history)
      history = `${username} selected pairing of ${chord1Selection} and ${chord2Selection}`
      updateHistory(history)
      
    };

   /*/////////////////////////////////////
  chord1 scribble code */
  const [getChord1Scribble, {data: scribble1}] = useLazyQuery(QUERY_SCRIBBLE, {
    onCompleted: scribbleText => {
      
      // if scribbleText exists for chosen chord...
      if(scribbleText.getChordScribble){
        
        setChord1Scribble(scribbleText.getChordScribble.scribbleText)
        
      }
    }
  });
  
  // capture scribble1 input changes, update db
  const handleScribble1Change = async (event) => {
    let { value } = event.target;
    console.log('text:', value)

    storeScribble1({ variables: {  "username": username,
        "scribbleText": value,
        "scribbleBox": 1,
        "chordName": chord1Selection },
      }) 
  };
   /*/////////////////////////////////////
   chord2 scribble code */
   const [getChord2Scribble, {data: scribble2}] = useLazyQuery(QUERY_SCRIBBLE, {
    onCompleted: scribbleText => {
      
      // if scribbleText exists for chosen chord...
      if(scribbleText.getChordScribble){
        
        setChord2Scribble(scribbleText.getChordScribble.scribbleText)
      }
    }
  });
  
  // capture scribble1 input changes, update db
  const handleScribble2Change = async (event) => {
    let { value } = event.target;
    console.log('text:', value)

    storeScribble2({ variables: {  "username": username,
        "scribbleText": value,
        "scribbleBox": 2,
        "chordName": chord1Selection },
      }) 
  };

  // todo get enter/return and when user clicks outside of textarea to fire the updateHistory for that line in the textarea
  // update history panel
  // let history = `${username} added note to ${chord1Selection}: ${scribbleText.getChordScribble.scribbleText}`
  // updateHistory(history)

   /*/////////////////////////////////////
   chordpair scribble code */




   
    const loggedIn = Auth.loggedIn();

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
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    {/* Chord 1 Menu */}
                    <select onChange={handleMenu1Change} name="chord1Menu" id="chord1Menu">
                      <option>Select Chord One</option>
                      {
                        chord1MenuItems.map(chord => <option value={chord}>{chord}</option>)
                      }
                    </select>
                  </div>
                  <div className="col-md-6">
                    {/* Chord 2 Menu */}
                    <select onChange={handleMenu2Change} name="chord2Menu" id="chord2Menu">
                      <option>Select Chord Two</option>
                      {
                        chord2MenuItems.map(chord => <option value={chord}>{chord}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    chord1 diagrams...
                    <div>{chord1Diagram}</div>
                    {/* <!-- this is where the chord1 diagrams will go. Michael will take care of this code soonish --> */}
                  </div>
                  <div className="col-md-6">
                    chord2 diagrams...
                    {/* <!-- this is where the chord2 diagrams will go. Michael will take care of this code soonish --> */}
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-6">
                    {/* chord 1 scribble */}
                    <div className="form-outline">
                      <textarea onChange={handleScribble1Change}className="form-control" id="chord1Scribble" placeholder="Write your progress for Chord 1 here" rows="4" defaultValue={chord1Scribble} ></textarea>
                    
                    </div>
                  </div>
                      
                  <div className="col-md-6">
                    {/* chord 2 scribble */}
                      <div className="form-outline">
                        <textarea onChange={handleScribble2Change}className="form-control" id="chord2Scribble" placeholder="Write your progress for Chord 2 here" rows="4" defaultValue={chord2Scribble} ></textarea>
                      
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-12">
                    {/* chord pair scribble */}
                    <div className="form-outline">
                      <textarea className="form-control" id="chordPairScribble" placeholder="Write your progress for this chord pairing here" rows="6"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {/* History panel */}
                <h2>
                  History
                </h2>
                <div className="form-outline">
                  <textarea className="form-control" id="chord2Scribble" placeholder="Your progress will be listed here" rows="30" defaultValue={historyPanel}></textarea>
                </div>
              </div>
            </div>

          

        
        
        {/* </div> */}

      </main>

    );
  // }
  
};



export default Home;

