import React, { useState } from "react";

const CreateGroupModal = ({ onCreate, onCancel }) => {
  const [groupName, setGroupName] = useState("");

  const handleInputChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(groupName);
  };

  return (
    <div className="create-group-modal">
      <div className="modal-content">
        <h3>Create New Chat Group</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={handleInputChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
