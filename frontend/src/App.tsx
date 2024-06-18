import React, { useState } from 'react';
import './App.css';
import Header from './components/modules/Header/Header';
import { Route, Routes } from 'react-router';
import Landing from './components/pages/Landing/Landing';
import { useLocation } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Photographer from './components/pages/Photographer/Photographer';
import MessageBox from './components/pages/Popup/MessageBox/MessageBox';

function App() {
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
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
        <Route path='/login' element={<Login setMessageStatus={setMessageStatus} setMessage={setMessage} />}></Route>;
        <Route path='/photographer' element={<Photographer />}></Route>;
      </Routes>
    </div>

  );
}

export default App;
