import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import PropertyList from './components/PropertyList';

function App() {
  return (
    <div>
      <h1>Real Estate Website</h1>
      <Register />
      <Login />
      <PropertyList />
    </div>
  );
}

export default App;
