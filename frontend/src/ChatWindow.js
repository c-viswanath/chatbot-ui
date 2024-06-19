import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import './ChatWindow.css';
import botImage from "./bot_icon.gif";

const ChatWindow = ({ messages, onSendMessage }) => {
    const botName = "ChatBot";

    return (
        <div className="chat-window">
            <ChatHeader botName={botName} botImage={botImage} />
            <MessageList messages={messages} />
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;

