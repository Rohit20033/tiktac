// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entery from '../src/Pages/Entry'
import Board from './Components/Board'
import Allrouters from './Components/allrouters';


function App() {
  // const [players, setPlayers] = useState({ player1: '', player2: '' });
  // const [symbols, setSymbols] = useState({ player1: 'x', player2: 'o' });

  return (
    
    <>
     <Allrouters/>
    </>
  );
}

export default App;
