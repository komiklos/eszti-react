// components/Gallery.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner';
import MasonryGallery from './gallery/MasonryGallery';

export default function Gallery() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setLoading(true);

                // Find category by slug
                const categoriesQuery = query(
                    collection(db, 'categories'),
                    where('slug', '==', slug)
                );
                const categoriesSnapshot = await getDocs(categoriesQuery);

                if (categoriesSnapshot.empty) {
                    throw new Error(`Category '${slug}' not found`);
                }

                const categoryDoc = categoriesSnapshot.docs[0];
                const categoryData = categoryDoc.data();
                setCategory({ id: categoryDoc.id, ...categoryData });

                // Fetch images
                const imagesRef = collection(db, 'categories', categoryDoc.id, 'images');
                const imagesSnapshot = await getDocs(imagesRef);

                const imagesWithUrls = await Promise.all(
                    imagesSnapshot.docs.map(async (doc) => {
                        const imageData = doc.data();
                        const url = await getDownloadURL(ref(storage, imageData.storagePath));
                        return {
                            id: doc.id,
                            url,
                            alt: imageData.description || categoryData.displayName,
                            caption: imageData.description || '',
                        };
                    })
                );

                setImages(imagesWithUrls);
            } catch (err) {
                console.error('Failed to load gallery:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug]);

    if (loading) return <LoadingSpinner />;

    if (error)
        return (
            <div className="p-8 text-center text-red-600">
                Error loading gallery: {error.message}
            </div>
        );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">{category.displayName}</h1>
            <MasonryGallery images={images} />
        </div>
    );
}
