import React, { useState } from 'react';
import './App.css';
import Header from './components/modules/Header/Header';
import { Route, Routes } from 'react-router';
import Landing from './components/pages/Landing/Landing';
import { useLocation } from 'react-router-dom';
import Photographer from './components/pages/Photographer/Photographer';
import MessageBox from './components/pages/Popup/MessageBox/MessageBox';
import Register from './components/pages/Authentication/Register';
import Login from './components/pages/Authentication/Login';
import { ROLE } from './constants/consts';
import StaffList from './components/pages/Admin/StaffList';
import "./constants/styles/Filter.css";

function App() {
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
  const [roleLogin, setRoleLogin] = useState<string>(ROLE.couple);
  return (
    <div className="App">
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
      {(() => {
        {
          return <Header isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        }
      })()}
      <Routes>
        <Route path='/' element={<Landing />}></Route>;
        <Route path='/login' element={<Login setRoleLogin={setRoleLogin} setMessageStatus={setMessageStatus} setMessage={setMessage} />}></Route>;
        <Route path='/register' element={<Register roleLogin={roleLogin} setMessageStatus={setMessageStatus} setMessage={setMessage} />}></Route>;
        <Route path='/photographer' element={<Photographer />}></Route>;
        // Admin
        <Route path='/staff' element={<StaffList setMessageStatus={setMessageStatus} setMessage={setMessage} />}></Route>;
      </Routes>
    </div>

  );
}

export default App;
