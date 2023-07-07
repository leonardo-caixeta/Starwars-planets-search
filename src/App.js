import React from 'react';
import './App.css';
import TableOfPlanets from './components/TableOfPlanets';
import FetchProvider from './context/FetchProvider';

function App() {
  return (
    <FetchProvider>
      <TableOfPlanets />
    </FetchProvider>
  );
}

export default App;
