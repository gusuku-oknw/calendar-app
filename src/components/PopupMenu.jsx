import React, { useEffect, useRef } from 'react';

const PopupMenu = ({ onClose, onContentChange }) => {
    const popupRef = useRef(null); // Create a ref
    useEffect(() => {
      // Define the click handler
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          onClose();
        }
      };
  
      // Attach the click handler
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);
  
    const pupupStyle = {
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      padding: '9rem',
      borderRadius: '1rem',
      zIndex: 1000
    }
    const buttonStyle = {
      width: '100px',
      height: '40px',
      borderradius: '5px',
      border: 'none',
      padding: '0 16px',
      borderRadius: 8,
      color: '#fff',
      background: '#639',
    }
  
    const handleContentChange = (content) => {
      onContentChange(content);
      onClose();
    };
  
    return (
      <div style={pupupStyle} ref={popupRef}>
        {/* <button onClick={() => handleContentChange('講義')} style={buttonStyle}>講義</button> */}
        <button onClick={() => handleContentChange('バイト')} style={buttonStyle}>バイト</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
};

export default PopupMenu;
