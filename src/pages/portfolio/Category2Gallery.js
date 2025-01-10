import React, { Component } from "react";
import '../../styles/MasonryGallery.css';
import MasonryGallery from '../../components/gallery/MasonryGallery';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../../assets/category2', false, /\.(jpeg|jpg|png|gif)$/));

export default class Category2Gallery extends Component {
    render() {
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