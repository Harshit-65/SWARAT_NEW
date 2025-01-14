// socket.js
const socketIO = require("socket.io");
const Chat = require("./models/Chat");
const User = require("./models/User"); // Import the User model

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Authorization"],
    },
    pingTimeout: 60000,
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("User connected to socket:", socket.id);

    // Join a chat room
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat room: ${chatId}`);
    });

    // Handle sending messages
    // Handle sending messages
    socket.on("sendMessage", async (messageData) => {
      const { chatId, sender, content } = messageData;
      try {
        const chat = await Chat.findById(chatId);
        if (chat) {
          // Get the sender's username
          const senderUser = await User.findById(sender); // Fetch username from User model
          if (!senderUser) {
            throw new Error("Sender not found!");
          }

          const newMessage = {
            sender,
            content,
            timestamp: new Date(),
            username: senderUser.username, // Add username to newMessage
          };

          chat.messages.push(newMessage);
          await chat.save();

          // Emit to all users in the chat room
          const populatedChat = await Chat.findById(chatId).populate(
            "messages.sender",
            "username"
          );
          const sentMessage =
            populatedChat.messages[populatedChat.messages.length - 1];

          // Emit the populated message
          io.to(chatId).emit("newMessage", sentMessage);
        } else {
          socket.emit("error", "Chat not found");
        }
      } catch (error) {
        console.error("Error saving message to database:", error);
        socket.emit("error", "Failed to send message");
      }
    });

    // Handle user typing
    socket.on("typing", (data) => {
      socket.to(data.chatId).emit("userTyping", {
        userId: data.userId,
        username: data.username,
      });
    });

    // Handle stop typing
    socket.on("stopTyping", (data) => {
      socket.to(data.chatId).emit("userStopTyping", {
        userId: data.userId,
      });
    });

    // Handle user leaving chat
    socket.on("leaveChat", (chatId) => {
      socket.leave(chatId);
      console.log(`User ${socket.id} left chat room: ${chatId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  // Handle server-side errors
  io.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  return io;
};

module.exports = initializeSocket;
