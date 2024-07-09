import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LargeArraySorting from './Components/LargeArraySorting/LargeArraySorting';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route element={<LargeArraySorting/>} path='/sorting'/>
          <Route element={<Navigate to={'/sorting'}/>} path='*'/>
        </Routes>      
      </div>
    </Router>
  );
}

export default App;
