import React, { useState, useRef, useEffect } from "react";

const ChatMessageArea = ({ chat, sendMessage, closeGroup }) => {
  const [messageContent, setMessageContent] = useState("");
  const messageAreaRef = useRef(null);

  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageContent.trim() !== "") {
      sendMessage(messageContent);
      setMessageContent("");
    }
  };

  useEffect(() => {
    // Auto-scroll to the bottom when new messages arrive
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chat.messages]);

  return (
    <div className="chat-message-area">
      <div className="messages-container" ref={messageAreaRef}>
        {chat.messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.sender._id === user._id ? "sent" : "received"
            }`}
          >
            <span className="sender">{message.sender.username}:</span>{" "}
            {message.content}
          </div>
        ))}
      </div>
      {!chat.isClosed && (
        <form className="message-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageContent}
            onChange={handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      )}
      {chat.admin._id === user._id && (
        <button className="close-group-button" onClick={closeGroup}>
          Close Group
        </button>
      )}
    </div>
  );
};

export default ChatMessageArea;
