import React from "react";
import ChatGroupItem from "./ChatGroupItem";

const ChatList = ({ chats, onChatSelect }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatGroupItem key={chat._id} chat={chat} onSelect={onChatSelect} />
      ))}
    </div>
  );
};

export default ChatList;
