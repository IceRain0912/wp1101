import {useState} from 'react'
import './App.css';

import {startGame, guess, restart} from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = async () => {
    const response = await guess(number);

    if (response === 'Correct!!') 
      setHasWon(true);
    else
    {
      setStatus(response);
      setNumber('');
    }
  }

  const handleStart = async () => {
    await startGame();
    setHasStarted(true);
  }
  const handleRestart = async () => {
    await restart();
    setHasWon(false);
    setStatus('');
  }

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={(e) => {setNumber(e.target.value)}}></input>
      <button onClick={() => {handleGuess()}} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
  
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={() => {handleRestart()}}>restart</button>
    </>
  )

  const game = 
    <div className='game'>
      {hasWon ? winningMode : gameMode}
    </div>

  const startMenu = 
    <div className='start'>
      <button onClick={() => {handleStart()}}>
        start game
      </button>
    </div>

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
