import React, { Component } from "react";
import '../../styles/MasonryGallery.css';
import MasonryGallery from '../../components/gallery/MasonryGallery';

import art1 from '../../assets/art1.jpeg';
import art2 from '../../assets/art2.jpeg';
import art3 from '../../assets/art3.jpeg';
import art4 from '../../assets/art4.jpeg';
import art5 from '../../assets/art5.jpeg';
import art6 from '../../assets/art6.jpeg';
import art7 from '../../assets/art7.jpeg';
import art8 from '../../assets/art8.jpeg';
import art9 from '../../assets/art9.jpeg';
import art10 from '../../assets/art10.jpeg';
import art11 from '../../assets/art11.jpeg';
import art12 from '../../assets/art12.jpeg';

export default class Category3Gallery extends Component {
    render() {
        const images = [
            art1,
            art2,
            art3,
            art4,
            art5,
            art6,
            art7,
            art8,
            art9,
            art10,
            art11,
            art12,
        ];

        const galleryConfig = {
            'data-animation': 'none',
            'data-lightbox': 'false',
            'data-width': 'full',
            'data-props': {
                scrollAnimation: 'none',
                gutter: 16,
                numColumns: 3,
                width: 'full',
                lightboxEnabled: false
            },
            'data-show-captions': 'false',
            'data-test': 'gallery-grid-masonry',
            'data-controllers-bound': 'GalleryMasonry'
        };

        return (
            <div className="container">
                <MasonryGallery images={images} {...galleryConfig} />
            </div>
        );
    }
}