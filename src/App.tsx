import React, { useEffect, useState } from 'react';
import './App.css';
import GenerationDropdown from './components/GenerationDropdown';
import { useSelector } from 'react-redux';

function App() {
  const pokemon = useSelector((state: any) => state.pokemon);

  console.log(pokemon);
  return (
    <div className="w-screen h-screen p-10">
      <div className="flex items-center gap-2">
        <p>Filter:</p>
        <GenerationDropdown />
      </div>
    </div>
  );
}

export default App;
