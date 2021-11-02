/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import Board from './Board';
import './css/HomePage.css';
import MineSweeper from '../containers/MineSweeper';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    const onclick = () => startGameOnClick(true);
    const onclick2 = () => setShowPanel(true);

    const judgeError = () => {
      setError(true)
    };
    
    return(
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
            <button className="btn" onClick = {onclick}>Start Game</button>
              <div className="controlContainer">
                <button className="btn" onClick = {onclick2}>Difficulty Adjustment</button>
                {showPanel ? <div className="controlWrapper">
                  {error ? <div className="error">ERROR: Mines number and board size are invalid!</div> : null}
                  <div className="controlPanel">
                    <div className="controlCol">
                      <p className="controlTitle">Mines Number</p>
                      <input type="range" step ='1' min="1" max ="50" defaultValue ="10"/>
                      <p className="controlNum">10</p>
                    </div>
                    <div className="controlCol">
                      <p className="controlTitle">Border Size(nxn)</p>
                      <input type="range" step ='2' min="1" max ="20" defaultValue ="8"/>
                      <p className="controlNum">5</p>
                    </div>
                  </div>
                </div> : null}
              </div>
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            
        </div>
    );

}
export default HomePage;   