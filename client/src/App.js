import './App.css';
import './css/Game.css';
import './css/Profile.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Iverify from './components/Iverify';
import AuthState from './context/notes/AuthState';
import Profile from './components/protected/Profile';
import MainGame from './components/protected/MainGame';
import Auth from './components/protected/Auth';


function App() {

  const [register, setRegister] = useState(true);

  useEffect(() => {
  },[]);

  return (
    <div className="App">
      <div>
        <AuthState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register setRegister={setRegister} register={register}/>} />
            <Route path='/iverify' element={<Iverify />} />
            <Route path='/profile' element={<Auth> <Profile /> </Auth>} />
            <Route path='/maingame' element={<Auth><MainGame/></Auth>} />
          </Routes>
        </Router>
        </AuthState>
      </div>
      
    </div>
  );
}

export default App;
