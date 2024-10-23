import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import PropertyList from './components/PropertyList';
import Map from './components/Map';


function App() {
  return (
    <div>
      <h1>Real Estate Website</h1>
      <Register />
      <Login />
      <PropertyList />
      <Map />
    </div>
  );
}

export default App;
