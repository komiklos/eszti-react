// components/gallery/ImageModal.js
import React from 'react';

const ImageModal = ({ isOpen, image, onClose }) => {
    if (!isOpen || !image) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-6xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-8 -right-8 text-white hover:text-gray-300 transition-colors"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Image Container with White Background */}
                <div className="relative h-full w-full rounded-lg overflow-hidden bg-white">
                    <img
                        src={image.url} // Changed from image to image.url
                        alt={image.alt || "Artwork preview"}
                        className="object-contain max-h-[80vh] w-full rounded-lg"
                        loading="eager"
                    />

                    {/* Optional Caption */}
                    {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-sm md:text-base">{image.caption}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
