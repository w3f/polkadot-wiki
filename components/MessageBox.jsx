import React, { useState } from 'react';

const MessageBox = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to convert markdown links to HTML links
  const renderMarkdownLinks = (text) => {
    return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  };

  return (
    <>
      {isOpen && (
        <div className="message-box">
          <button className="close-button" onClick={handleClose}>
            &#10006; {/* Unicode character for "x" */}
          </button>
          <div
            className="message-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdownLinks(message) }} // Render HTML content
          ></div>
        </div>
      )}
    </>
  );
};

export default MessageBox;