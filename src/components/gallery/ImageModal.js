// components/gallery/ImageModal.js
import React from 'react';
import ImageViewer from 'react-simple-image-viewer';

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

                {/* Image Viewer */}
                <ImageViewer
                    src={[image.url]} // Pass the image URL as an array
                    currentIndex={0} // Always show the first image
                    onClose={onClose}
                    backgroundStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                    }}
                    closeOnClickOutside={true}
                />

                {/* Title and Description */}
                <div className="mt-4 text-center text-white">
                    <h2 className="text-xl font-semibold">{image.title || "Untitled"}</h2>
                    <p className="text-sm text-gray-300">{image.description || "No description available."}</p>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
