import React from 'react';
import './ChatHeader.css';


const ChatHeader = ({ botName, botImage }) => {
    return (
        <div className="chat-header">
            <img src={botImage} alt="Bot" className="bot-image" />
            <h1 className="bot-name">{botName}</h1>
        </div>
    );
};

export default ChatHeader;
