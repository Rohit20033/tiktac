import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Entery from '../Pages/Entry';
import Board from './Board';

function Allrouters() {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [symbols, setSymbols] = useState({ player1: 'x', player2: 'o' });
  
  return (
     <>
      <Routes>
        <Route path='/' element={<Entery setPlayers={setPlayers} setSymbols={setSymbols}/>}/>
        <Route path='/game' element={<Board players={players} symbols={symbols} />} />
      </Routes>
     </>
  );
}

export default Allrouters;
    