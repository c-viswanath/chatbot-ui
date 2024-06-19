// import React from 'react';
// import './MessageList.css';

// const MessageList = ({ messages }) => {
//     console.log(messages)
//   return (
//     <div className="message-list">
//       {messages.map((message, index) => (
//         <div key={index} className={`message ${message.user === 'Bot' ? 'bot-message' : 'user-message'}`}>
//           <div className="message-user">{message.user}</div>
//           <div className="message-text">{message.text}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;


import React, { useRef, useEffect } from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((messageArray, index) => (
        <div key={index}>

          {Array.isArray(messageArray) ? (
            messageArray.map((message, innerIndex) => (
              <div
                key={innerIndex}
                className={`message ${message.user === 'Bot' ? 'bot-message' : 'user-message'} ${message.user === 'User' ? 'user-message-right' : ''}`}
              >
                <div className='dp'></div>
                <div className='text'>
                {/* <div className="message-user">{message.user}</div> */}
                <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="message error-message">Invalid message format</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;



