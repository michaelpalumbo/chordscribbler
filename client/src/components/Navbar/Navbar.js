import React from 'react';

import './Navbar.css'

function Navbar () {

  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <a href="/about" className="navbar-item">About</a>
      <a href="/using" className="navbar-item">Using Chord Scribblr</a>
      <a href="/contact" className="navbar-item">Contact</a>
      <a href="/login" className="navbar-item">Login</a>
      <a href="/signup" className="navbar-item">Sign Up</a>
  </section>
  )

}

export default Navbar;