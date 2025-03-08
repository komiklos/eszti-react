// components/FeaturedGallery.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner';

export default function FeaturedGallery() {
    const [featuredImages, setFeaturedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // 1. Get featured items from Firestore
                const q = query(collection(db, 'featured'), orderBy('createdAt', 'desc'));
                const featuredSnapshot = await getDocs(q);

                // 2. Get linked image data
                const images = await Promise.all(
                    featuredSnapshot.docs.map(async (featuredDoc) => {
                        try {
                            const { categoryId, imageId } = featuredDoc.data();

                            // Create document reference properly
                            const imageRef = doc(db, 'categories', categoryId, 'images', imageId);
                            const imageDoc = await getDoc(imageRef);

                            if (!imageDoc.exists()) {
                                console.warn(`Image ${imageId} not found in category ${categoryId}`);
                                return null;
                            }

                            const imageData = imageDoc.data();
                            const url = await getDownloadURL(ref(storage, imageData.storagePath));

                            return {
                                id: featuredDoc.id,
                                url,
                                ...imageData,
                                categoryId
                            };
                        } catch (err) {
                            console.error('Error processing featured item:', err);
                            return null;
                        }
                    })
                );

                // Filter out null values from failed fetches
                setFeaturedImages(images.filter(img => img !== null));
                setLoading(false);
            } catch (err) {
                console.error('Error loading featured images:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div className="p-8 text-center text-red-600">
            Error loading featured images: {error.message}
        </div>
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Featured Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredImages.map((img) => (
                    <Link
                        key={img.id}
                        to={`/${img.categoryId}`}
                        className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <img
                            src={img.url}
                            alt={img.description || 'Featured work'}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                        {img.description && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-white text-sm">{img.description}</p>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
