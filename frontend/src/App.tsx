import React, { useState } from 'react';
import './App.css';
import Header from './components/modules/Header/Header';
import { Route, Routes } from 'react-router';
import Landing from './components/pages/Landing/Landing';
import { useLocation } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Photographer from './components/pages/Photographer/Photographer';

function App() {
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <div className="App">
      {(() => {
        {
          if (location.pathname != "/login") {
            return <Header isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
          }
        }
      })()}
      <Routes>
        <Route path='/' element={<Landing />}></Route>;
        <Route path='/login' element={<Login />}></Route>;
        <Route path='/photographer' element={<Photographer />}></Route>;
      </Routes>
    </div>

  );
}

export default App;
