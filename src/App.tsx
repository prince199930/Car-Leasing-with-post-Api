import React from 'react';
import './App.css';
import HomePage from './components/homePage/HomePage';
import { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CarDetails from './components/detailsPage/CarDetails';
import { QuickQuote } from './components/homePage/leasingmodel';

function App() {
    const [carData, setCarData] = useState<QuickQuote>({}as QuickQuote);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><HomePage  setCarData={setCarData} /></Route>
          <Route exact path="/cardetails" ><CarDetails carData={carData} /></Route>

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
