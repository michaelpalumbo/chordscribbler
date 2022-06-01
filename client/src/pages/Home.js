import React, {useState} from 'react';
import { Dropdown, Input } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { FIRSTCHORD} from '../utils/queries';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
// import chordScribbles from '../utils/chordScribbles'
// import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";


const Home = () =>{
    const [chord1MenuItems, setChord1MenuItems] = useState( ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"])
    const [chord2MenuItems, setChord2MenuItems] = useState([])

  const { loading, data } = useQuery(FIRSTCHORD);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const thoughts = data?.thoughts || [];

    const loggedIn = Auth.loggedIn();
    
    
//Attempted to kickstart menu option, but code not working
    // const Dropdown = ({
    //   options
    // }) => {
    //   const [chord2MenuItems, setChord2MenuItems] = useState(options[0].chord);
    //   return (
    //       <select
    //         value={chord2MenuItems}
    //         onChange={e => setChord2MenuItems(e.target.chord)}>
    //         {options.map(o => (
    //           <option key={o.chord2MenuItems} value={chord2MenuItems}>{chord2MenuItems}</option>
    //         ))}
    //       </select>
    //   );
    // };
    
    // useEffect(() => {
    //   setLoadingTypes(true);
    //   FIRSTCHORD("DEFAULT");
    //   const availableOptions = async () => {
    //     const availableTypes = await Axios.get();
        
    //     if(availableTypes.data.length > 0) {
    //       setAvailableTypes(availableTypes.data.map(FIRSTCHORD => ({name: chordTwoList})));
    //       setLoadingTypes(false);
    //     }
    //   };
    //   availableOptions();
    // }, [FIRSTCHORD]);

    return (    
      <main>
        <Helmet>
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
                    <select name="chord1Menu" id="chord1Menu">
                      
                      {
                        chord1MenuItems.map(chord => <option value={chord}>{chord}</option>)
                      }
                    </select>
                  </div>
                  <div className="col-md-6">
                    {/* Chord 2 Menu */}
                    <select name="chord2Menu" id="chord2Menu">
                      {
                        chord2MenuItems.map(chord => <option value={chord}>{chord}</option>)
                      }
                      <select> options={this.state.FIRSTCHORD} </select>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    chord1 diagrams...
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
                      <textarea className="form-control" id="chord1Scribble" placeholder="Write your progress for Chord 1 here" rows="4"></textarea>
                    
                    </div>
                  </div>
                      
                  <div className="col-md-6">
                    {/* chord 2 scribble */}
                    <div className="form-outline">
                      <textarea className="form-control" id="chord2Scribble" placeholder="Write your progress for Chord 2 here" rows="4"></textarea>
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
                  <textarea className="form-control" id="chord2Scribble" placeholder="Your progress will be listed here" rows="30"></textarea>
                </div>
              </div>
            </div>
          </div>

          

        
        
        {/* </div> */}

      </main>

    );
  // }
  
};



export default Home;

