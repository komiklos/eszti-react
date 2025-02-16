import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Gallery() {
    const { slug } = useParams(); // Get slug from URL
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!slug) return; // Guard clause

                const snapshot = await getDocs(
                    collection(db, 'categories', slug, 'images')
                );
                setImages(snapshot.docs.map(doc => doc.data()));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [slug]); // Re-fetch when slug changes

    if (!slug) return <div>Select a category</div>;

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