// src/pages/portfolio/MasonryGallery.js
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import '../../styles/MasonryGallery.css';
import ImageModal from '../../components/gallery/ImageModal.js';

const MasonryGallery = ({ images, ...config }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const breakpointColumnsObj = {
        default: config['data-props'].numColumns || 3,
        768: 2
        // 700: 1
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="eszti-masonry-grid"
                columnClassName="eszti-masonry-grid_column"
                {...config}
            >
                {images.map((image, index) => (
                    <div key={index} onClick={() => handleImageClick(image)}>
                        <img src={image} alt={`art-${index}`} />
                    </div>
                ))}
            </Masonry>
            <ImageModal isOpen={!!selectedImage} image={selectedImage} onClose={handleCloseModal} />
        </>
    );
};

export default MasonryGallery;