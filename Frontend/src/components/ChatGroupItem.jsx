import React from "react";

const ChatGroupItem = ({ chat, onSelect }) => {
  const lastMessage =
    chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

  return (
    <button className="chat-group-item" onClick={() => onSelect(chat)}>
      <div className="group-name">{chat.groupName}</div>
      {lastMessage && (
        <div className="last-message-preview">
          {lastMessage.sender.username}: {lastMessage.content.substring(0, 25)}
          ...
        </div>
      )}
    </button>
  );
};

export default ChatGroupItem;
