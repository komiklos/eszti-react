// components/Gallery.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner';

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

                // 1. Find category by slug
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
                setCategory({
                    id: categoryDoc.id,
                    ...categoryData
                });

                // 2. Fetch category images
                const imagesRef = collection(db, 'categories', categoryDoc.id, 'images');
                const imagesSnapshot = await getDocs(imagesRef);

                const imagesWithUrls = await Promise.all(
                    imagesSnapshot.docs.map(async (doc) => {
                        const imageData = doc.data();
                        const url = await getDownloadURL(ref(storage, imageData.storagePath));
                        return {
                            id: doc.id,
                            ...imageData,
                            url
                        };
                    })
                );

                setImages(imagesWithUrls);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load gallery:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug]);

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div className="p-8 text-center text-red-600">
            Error loading gallery: {error.message}
        </div>
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">{category.displayName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="relative group">
                        <img
                            src={image.url}
                            alt={image.description || category.displayName}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
