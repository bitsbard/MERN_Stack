import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1> The Exercise Agenda </h1>
        <p> The Exercise Agenda allows you to plan your exercises every week! </p>
      </header>
      <Router>
        <div className="App-header">
        <nav>
          <Link className="App-link3" to="/">Home</Link>
          <Link className="App-link2" to="/add-exercise">Add exercise</Link>
        </nav>
		  <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
		  </Routes>
          </div>
      </Router>
      <footer className="App-footer">© 2022 Stuart Mills</footer>
    </div>
  );
}

export default App;