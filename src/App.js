import React from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;