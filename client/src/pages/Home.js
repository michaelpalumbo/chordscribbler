import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  // const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    // <head>
    // <meta charset="utf-8">
    // <meta http-equiv="X-UA-Compatible" content="IE=edge">
    // <meta name="viewport" content="width=device-width, initial-scale=1">
    //   <!-- <link href="css/style.css" rel="stylesheet"> -->
    // <!-- Latest compiled and minified CSS -->
    // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

    // <!-- Optional theme -->
    // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
    // <!-- JQUERY -->
    // <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    // <!-- Latest compiled and minified JavaScript -->
    // <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>  
    // </head>
    <main>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

  <script
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    crossOrigin="true"></script>

  <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossOrigin="true"></script>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossOrigin="anonymous"
  />
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
};

export default Home;
