import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './App.css';
import logo from "./NM-logo.png"
import Sidebar from './Sidebar';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  // const handleFileUpload = (event) => {
  //   const uploadedFiles = Array.from(event.target.files);
  //   setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  // };

  return (
    <div className="app">
      <div className='main-view'>
      <div className="sidebar">
      <Sidebar/>
      </div>
      <div className='main-chat'>
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
      </div>
      </div>
    </div>
  );
};

export default App;

