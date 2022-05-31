import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
// import chordScribbles from '../utils/chordScribbles'
// import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import $ from "jquery"



class Home extends React.Component {
  componentDidMount(){
    
      // chord1menu interaction 
    $('.dropdown-item').on('click',  function(){
      console.log($(this).text())
      var btnObj = $(this).parent().siblings('button');
      $(btnObj).text($(this).text());
      $(btnObj).val($(this).text());
    });

    // chord1menu array
    chord1MenuItems = ["Major", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Minor", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"]
    // populate the chord1 menu (this is useful also for when we want to add indicators next to chords which have scribbles)
    $('ul.dropdown-menu').on('click', function(event){
      event.stopPropagation();
    });
    function updateChord1Menu(){
      var $dropdown = $(".dropdown-menu.chord1Menu");
      
      for(i=0; i<chord1MenuItems.length;i++){
          var menuItemNo = $dropdown.find("li").length;
          var menuItemId = "menuitem" + menuItemNo;    
          if(chord1MenuItems[i] === "Major" || chord1MenuItems[i] === "Minor"){
              // create a separator between major and minor keys        
              $dropdown.append(`<li>${chord1MenuItems[i]}</li>`);
          }else{
              $dropdown.append("<li><a href='#'><label for='chord1_" + chord1MenuItems[i] + "'>" + chord1MenuItems[i] +"</label></a></li>");
          }
      }
    }
    updateChord1Menu()
    
  }
  render() {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const thoughts = data?.thoughts || [];

    const loggedIn = Auth.loggedIn();
    
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
            {/* <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h1>ReCHORDr</h1>
              </div>
              <div className="col-md-4"></div>
            </div> */}
            <div className="row">
              <div className="col-md-8">
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="dropdown">
                      
                      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                        Chord One
                      </button>
                      <div className="dropdown-menu chord1Menu" aria-labelledby="dropdownMenuButton">

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dropdown">
                      
                      <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                        Chord Two
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        
                      </div>
                    </div>
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
                    <div className="form-outline">
                      <textarea className="form-control" id="chord2Scribble" placeholder="Write your progress for Chord 2 here" rows="4"></textarea>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-12">
                    
                    <div className="form-outline">
                      <textarea className="form-control" id="chordPairScribble" placeholder="Write your progress for this chord pairing here" rows="6"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
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
  }
};



export default Home;
