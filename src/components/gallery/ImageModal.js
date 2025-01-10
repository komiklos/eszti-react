// src/components/ImageModal.js
import React from 'react';
import '../../styles/ImageModal.css';

const ImageModal = ({ isOpen, image, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={image} alt="modal" />
                {/*<button className="close-button" onClick={onClose}>Close</button>*/}
            </div>
        </div>
    );
};

export default ImageModal;