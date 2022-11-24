import logo from './logo.svg';
import './App.css';
import Signin from './GoogleOAuth/Signin'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Signin/>}/>
    </Routes>
    
  );
}

export default App;
