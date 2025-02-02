import React from 'react';
import '../../styles/ImageModal.css';

const ImageModal = ({ isOpen, image, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="close-button" onClick={onClose}>X</div>
                <div className="image-container">
                    <img src={image} alt="modal" />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;