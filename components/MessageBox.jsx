import React, { useState } from 'react';

const MessageBox = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="message-box">
          <button className="close-button" onClick={handleClose}>
            &#10006; {/* Unicode character for "x" */}
          </button>
          <div className="message-content">
            <p>{message}</p> {/* Display the message text */}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;