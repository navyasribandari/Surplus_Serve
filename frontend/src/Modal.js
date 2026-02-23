import React from 'react';
import './assets/styles/Modal.css'; // Include styles for the modal

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
