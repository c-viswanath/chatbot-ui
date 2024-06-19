
// import React, { useState } from 'react';
// import './MessageInput.css';

// const MessageInput = ({ onSendMessage }) => {
//   const [input, setInput] = useState('');

//   const handleSend = async () => {
//     if (input.trim() !== '') {
//       onSendMessage({ user: 'User', text: input });

//       try {
//         const response = await fetch('https://www.botlibre.com/rest/json/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             application:2233569591134151137, 
//             instance: 160, 
//             message: input,
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Response from Bot Libre:', data);

//           if (data && data.message) {
//             onSendMessage({ user: 'Bot', text: data.message });
//           }
//         } else {
//           console.error('Error:', response.status);
//         }
//       } catch (error) {
//         console.error('Error sending message to Bot Libre API:', error);
//       }

//       setInput('');
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         type="text"
//         className="input-field"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//       />
//       <button className="send-button" onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default MessageInput;


import React, { useState } from 'react';
import './MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() !== '') {
        const userMessage={ user: 'User', text: input }
      onSendMessage([userMessage,{user:'Bot',text:'.....'}]);

      try {
        const json = `{"application":"2233569591134151137", "instance":"160","message":"${input}"}`;
        const response = await fetch('https://www.botlibre.com/rest/json/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: json,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from Bot Libre:', data);

          if (data && data.message) {
            const botMessage = { user: 'Bot', text: data.message };
            onSendMessage([userMessage,botMessage]);
          }
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error sending message to Bot Libre API:', error);
      }

      setInput('');
    }
  };

  return (
    <div className="message-input">
      <textarea
        className="input-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        rows="1"
      />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;