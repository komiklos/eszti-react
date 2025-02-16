// src/components/Gallery.js
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function TestGallery({ categorySlug }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const querySnapshot = await getDocs(
                collection(db, 'categories', categorySlug, 'images')
            );
            setImages(querySnapshot.docs.map(doc => doc.data()));
        };
        fetchImages();
    }, [categorySlug]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img.url}
                    alt="Artwork"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
            ))}
        </div>
    );
}