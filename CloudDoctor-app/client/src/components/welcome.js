// import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./welcome.scss";

export default function Welcome() {
  return (
    <div align="center">
      <header id='messageB'>
      <h1 id="bien">Bienvenue sur Cloud Doctor!</h1>
      </header>
      <div id="main" align="center">
      <Link to="/login" className="welcome" id="W">
        <div  id="bot">
          
            <button className="bien">
              <i id="comm"></i>
            </button>
          
        </div>
        <div id="top">
          <h2 id="mess">Cliquer ici</h2>
        </div>
        </Link>
      </div>
    </div>
  );
}
