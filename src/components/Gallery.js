import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import MasonryGallery from './gallery/MasonryGallery';

export default function Gallery() {
    const { slug } = useParams(); // Get slug from URL
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Check if a file exists in Firebase Storage
    const checkImageExists = async (storagePath) => {
        try {
            const fileRef = ref(storage, storagePath);
            await getDownloadURL(fileRef); // Throws error if file doesn't exist
            return true;
        } catch (error) {
            return false;
        }
    };

    // Fetch images and filter out missing ones
    useEffect(() => {
        const fetchImages = async () => {
            if (!slug) return;

            setIsLoading(true);
            try {
                const snapshot = await getDocs(
                    collection(db, 'categories', slug, 'images')
                );

                // Check each image and filter out missing files
                const validImages = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const exists = await checkImageExists(data.storagePath);
                        return exists ? { id: doc.id, ...data } : null;
                    })
                );

                // Remove null values (images with missing files)
                setImages(validImages.filter(Boolean));
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [slug]);

    if (!slug) return <div>Select a category</div>;

    if (isLoading) return <div>Loading images...</div>;

    return (
        <div className="p-4">
            <MasonryGallery
                images={images.map(img => ({
                    url: img.url,
                    alt: img.title || `Artwork ${img.id}`,
                    id: img.id
                }))}
            />
        </div>
    );
}