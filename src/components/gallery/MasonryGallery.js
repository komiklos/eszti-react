// components/gallery/MasonryGallery.js
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import ImageModal from './ImageModal';

const MasonryGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    // Responsive column configuration
    const breakpointColumns = {
        default: 3,
        1024: 3,
        768: 2,
        640: 1
    };

    return (
        <div className="px-4">
            <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
            >
                {images.map((image, index) => (
                    <div
                        key={image.id || index}
                        className="mb-4 group relative cursor-zoom-in"
                        onClick={() => handleImageClick(image)}
                    >
                        <div className="aspect-ratio-box">
                            <img
                                src={image.url}
                                alt={image.alt || `Artwork ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-95"
                                loading="lazy"
                            />
                        </div>

                        {/* Optional caption overlay */}
                        {image.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white rounded-b-lg">
                                <p className="text-sm line-clamp-2">{image.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </Masonry>

            <ImageModal
                isOpen={!!selectedImage}
                image={selectedImage}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default MasonryGallery;