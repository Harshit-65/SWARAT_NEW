import { Link } from "react-router-dom";
import { MessageCircle, MapPin } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState, useContext } from "react";
import CreateGroupModal from "./CreateGroupModal"; // Import the modal
import { chatService } from "../services/chatService";
import { AuthContext } from "../context/authContext"; // Import AuthContext

const Post = ({
  _id,
  location,
  description,
  images,
  createdBy,
  onJoinChat,
}) => {
  const { user } = useContext(AuthContext); // Get the user object

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [existingChatId, setExistingChatId] = useState(null);

  useEffect(() => {
    // console.log("Post images:", images);
  }, [images]);

  const handleJoinChat = async () => {
    try {
      // 1. Check if a chat room already exists for this post
      const chatRoom = await chatService.getChatByPostId(_id);

      if (chatRoom) {
        // 2a. Chat room exists:
        //     * If user is already a member, redirect to the chat
        //     * If not, add the user to the chat on the backend
        const userId = user._id;

        if (chatRoom.members.includes(userId)) {
          onJoinChat(chatRoom._id); // Redirect to chat
        } else {
          const updatedChat = await chatService.addUserToChat(
            chatRoom._id,
            userId
          );
          onJoinChat(updatedChat._id); // Redirect to chat
        }
      } else {
        // 2b. No chat room - Show the CreateGroupModal
        setShowCreateGroupModal(true);
      }
    } catch (error) {
      // 2b. No chat room (404 error or other error) - Show the CreateGroupModal
      if (error.response && error.response.status === 404) {
        console.log("Chat room not found. Showing modal to create a new chat.");
        setShowCreateGroupModal(true);
      } else {
        console.error("Error checking for existing chat room:", error);
        // Handle other errors appropriately
      }
    }
  };

  const handleCreateGroup = async (groupName) => {
    try {
      const newChat = await chatService.createChat({
        groupName,
        postId: _id, // Pass both groupName and postId
      });
      onJoinChat(newChat._id);
      setShowCreateGroupModal(false);
    } catch (error) {
      console.error("Error creating chat group:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img
              src={createdBy?.profilePicture || "/default-profile-picture.png"}
              alt={`${createdBy?.username || "User"}'s profile`}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <Link
              to={`/profile/${createdBy?._id}`}
              className="font-bold hover:underline"
            >
              {createdBy?.username || "Anonymous"}
            </Link>
            {location?.coordinates?.length === 2 && (
              <div className="flex items-center mt-1 text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">
                  {location.coordinates[1]}, {location.coordinates[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="mt-3">{description}</p>

        {/* Image Carousel */}
        {Array.isArray(images) && images.length > 0 ? (
          <div className="mt-3">
            <ImageCarousel images={images} />
          </div>
        ) : (
          <div className="mt-3 h-20 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )}
        {/* Join Chat Button */}
        <button
          onClick={handleJoinChat}
          className="flex items-center mt-3 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
        >
          <MessageCircle className="w-5 h-5 mr-2" /> Join Chat Room
        </button>

        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <CreateGroupModal
            postId={_id}
            onCreate={handleCreateGroup}
            onCancel={() => setShowCreateGroupModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
