// components/gallery/ImageModal.js
import React, { useEffect, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import rArrow from "../../assets/icons/jobbnyil.png";
import lArrow from "../../assets/icons/balnyil.png";
import xIcon from "../../assets/icons/Xicon.png";


const ImageModal = ({ isOpen, images, startIndex, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const formattedImages = images.map(image => ({
        original: image.url,
        thumbnail: image.url,
        description: image.caption || ""
    }));

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose}  // Close when clicking anywhere in the background
        >
            <div
                className="relative w-full max-w-[90vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}  // Prevent clicks inside from closing
                ref={modalRef}
            >
                <button
                    className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <img
                        src={xIcon}
                        alt="Close"
                        className="opacity-100 hover:opacity-60 h-4 md:h-6 w-auto transition-opacity"
                    />
                </button>

                <ImageGallery
                    items={formattedImages}
                    startIndex={startIndex}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}
                    additionalClass="image-gallery-modal"
                    slideDuration={0}
                    slideInterval={0}
                    disableSwipe={true}
                    renderRightNav={(onClick, disabled) => (
                        <button
                            type="button"
                            className={`opacity-100 hover:opacity-60 image-gallery-icon image-gallery-right-nav ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            onClick={onClick}
                            aria-label="Next Slide"
                        >
                            <img
                                src={rArrow}
                                alt="Next"
                                className="h-8 w-auto transition-opacity"
                            />
                        </button>
                    )}
                    renderLeftNav={(onClick, disabled) => (
                        <button
                            type="button"
                            className={`opacity-100 hover:opacity-60 image-gallery-icon image-gallery-left-nav ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            onClick={onClick}
                            aria-label="Previous Slide"
                        >
                            <img
                                src={lArrow}
                                alt="Previous"
                                className="h-8  w-auto  transition-opacity"
                            />
                        </button>
                    )}
                    renderCloseButton={(onClick) => (
                        <button
                            type="button"
                            className="opacity-100 hover:opacity-60 image-gallery-icon image-gallery-close"
                            onClick={onClick}
                            aria-label="Close Gallery"
                        >
                            <img
                                src={xIcon}
                                alt="Close"
                                className="h-6 md:h-8 w-auto transition-opacity"
                            />
                        </button>
                    )}
                    renderItem={(item) => (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                className="image-gallery-image max-h-[70vh] object-contain"
                                src={item.original}
                                alt={item.description}
                            />
                            {item.description && (
                                <div className="image-gallery-description text-white mt-4 max-w-2xl text-center text-sm px-4">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default ImageModal;
