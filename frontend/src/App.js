import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routers/Routers';
import ContextAPI from './Context/ContextAPI';
import './App.css'
function App() {

  
  return (
    <>
    <div className='App'>
    <BrowserRouter>
    
    <ContextAPI>

    <Router/>
    </ContextAPI>
    </BrowserRouter>

    </div>
    </>
  );
}

export default App;