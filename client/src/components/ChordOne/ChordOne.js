// see SignupForm.js for comments
import React, { useState } from 'react';
import { button } from 'react-bootstrap';

// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';
import {Helmet} from "react-helmet";
import $ from "jquery"

const ChordOne = () => {
    // chord1menu interaction 
    $('.dropdown-item').on('click',  function(){
        console.log($(this).text())
        var btnObj = $(this).parent().siblings('button');
        $(btnObj).text($(this).text());
        $(btnObj).val($(this).text());
      });
  
      // chord1menu array
      let chord1MenuItems = ["Major", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Minor", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"]
      // populate the chord1 menu (this is useful also for when we want to add indicators next to chords which have scribbles)
      $('ul.dropdown-menu').on('click', function(event){
        event.stopPropagation();
      });
      function updateChord1Menu(){
        var $dropdown = $(".dropdown-menu.chord1Menu");
        
        for(let i=0; i<chord1MenuItems.length;i++){
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

  return (
    <>
        <Helmet>
            <script
            src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
            
            <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

            <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>

            <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
                

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>

        </Helmet>
            
        <div className="dropdown">
                      
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
            Chord One
            </button>
            <div className="dropdown-menu chord1Menu" aria-labelledby="dropdownMenuButton">

            </div>
        </div>
    </>
  );
};

export default ChordOne;