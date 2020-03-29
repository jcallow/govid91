import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MapComponent} from './Map/MapComponent'
import {CovidService} from "./Map/CovidService";

function App() {
  return (
      <div className="App">
        <MapComponent covidService={new CovidService()}/>
      </div>
  );
}

export default App;
