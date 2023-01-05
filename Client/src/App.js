import Signin from './GoogleOAuth/Signin'
import {Routes, Route} from 'react-router-dom'
import Admin from './Admin/Admin';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Signin/>}/>
      <Route exact path='/admin' element={<Admin/>}/>
    </Routes>
    
  );
}

export default App;
