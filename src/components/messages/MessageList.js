import React, { useEffect, useState } from "react";
import "./Message.css";

export const MessageList = () => {
  const [filteredMessages, setFiltered] = useState([]);
  const [editedMessage, setEditedMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8088/messages/`)
      .then((response) => response.json())
      .then((messageArray) => {
        setFiltered(messageArray);
        console.log(messageArray);
      });
  }, []);

  const handleEditClick = (message) => {
    setEditedMessage(message);
  };

  const handleSaveEdit = () => {
    if (editedMessage) {
      fetch(`http://localhost:8088/messages/${editedMessage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: editedMessage.msg }),
      })
      .then((response) => {
        if (response.ok) {
          // Message successfully updated in the database
          // Refresh the message list by making a GET request again
          return fetch(`http://localhost:8088/messages/`);
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => response.json())
      .then((messageArray) => {
        setFiltered(messageArray);
        setEditedMessage(null); // Reset editedMessage state variable
      })
      .catch((error) => {
        console.error("Error updating message:", error);
      });
    }
  };

  return (
    <>
      <h2>List of Messages</h2>
      <article className="messages">
        {filteredMessages.map((message) => {
          return (
            <section className="message" key={`message--${message.id}`}>
              <div>
                {message?.user?.username}{" "}
                {editedMessage && editedMessage.id === message.id ? (
                  <input
                    type="text"
                    value={editedMessage.msg}
                    onChange={(e) => {
                      setEditedMessage({
                        ...editedMessage,
                        msg: e.target.value,
                      });
                    }}
                  />
                ) : (
                  message.msg
                )}
              </div>
              {editedMessage && editedMessage.id === message.id ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(message)}>Edit Me</button>
              )}
            </section>
          );
        })}
      </article>
    </>
  );
};





























// import { useEffect, useState } from "react"
// import "./Message.css"


// //defines the react functional component MessageList
// export const MessageList = () => {

//   //filteredMessages holds the array, setFiltered is used to update it.
//     const [filteredMessages, setFiltered] = useState([])

  

 

// //get the honeyUser out of storage login 
//     const localHoneyUser = localStorage.getItem("honey_user")
//     const honeyUserObject = JSON.parse(localHoneyUser)

   


// //useEffect hook used to fetch messages from the URL and stores them in state
//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/messages?_expand=user/`)
//             .then (response => response.json())
//             .then((messageArray) => {
//                 setFiltered(messageArray)
//                 console.log(messageArray)
//             })
//         },
//         []
//     )

// //rendering the list of messages. 
// return <> 

// <h2>List of Messages</h2>

// <article className="messages">
//     {
//         filteredMessages.map(
//             (message) => {
//                 return <section className="message" key={`message--${message.id}`}>   
//                     <div>{message?.user?.username} {message.msg}</div>
//                     {/* <button onClick >Edit Me</button> */}
//                     </section>
//             }
//         )
//     }
//           </article>
//     </>
// }
