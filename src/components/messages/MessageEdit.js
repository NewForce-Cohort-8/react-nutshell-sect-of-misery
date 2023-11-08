import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MessageEdit = () => {
  const [messages, setMessages] = useState([]);
  const [editedMessage, setEditedMessage] = useState(""); 
  const [editMessageId, setEditMessageId] = useState(null); 
  const localHoneyUser = localStorage.getItem("honey_user")
  const honeyUserObject = JSON.parse(localHoneyUser)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch messages from the API endpoint
    fetch("http://localhost:8088/messages")
      .then((response) => response.json())
      .then((messageArray) => {
        setMessages(messageArray);
      });
  }, []);

  const getAllMessages = () => {
    fetch("http://localhost:8088/messages")
        .then((response) => response.json())
        .then((messageArray) => {
            setMessages(messageArray);
    });
  }

  const handleEditClick = (messageId) => {
    const selectedMessage = messages.find((message) => message.id === messageId);
    if (selectedMessage) {
      setEditedMessage(selectedMessage.msg);
      setEditMessageId(messageId);
    }
  };

  const handleSaveEdit = (messageId) => {
    // Update the message with the edited text
    const updatedMessages = messages.find((message) => message.id === messageId);
    // setMessages(updatedMessages);
    // setEditedMessage(""); // Clear the edited message text
    // setEditMessageId(null); // Clear the edit message ID
    const messageToSendToAPI = {
        userId: honeyUserObject.id,
        msg: editedMessage,
        id: messageId
    }
    return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then(setEditedMessage(""))
            .then(setEditMessageId(null))
            .then(getAllMessages())
            .then(() => {
                navigate("/")
            })
  };




  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {editMessageId === message.id ? (
            <>
              <input
                type="text"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(message.id)}>Save</button>
            </>
          ) : (
            <>
              <p>{message.msg}</p>
              <button onClick={() => handleEditClick(message.id)}>Edit Me</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
