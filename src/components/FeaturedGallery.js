// components/FeaturedGallery.js
import { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import MasonrySkeletonLoader from './MasonrySkeletonLoader';
import MasonryGallery from './gallery/MasonryGallery';

export default function FeaturedGallery() {
    const [featuredImages, setFeaturedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedImages = async () => {
            try {
                setLoading(true);

                // Get featured items ordered by creation date
                const featuredQuery = query(collection(db, 'featured'), orderBy('createdAt', 'desc'));
                const featuredSnapshot = await getDocs(featuredQuery);

                // Fetch linked image data
                const imagesData = await Promise.all(
                    featuredSnapshot.docs.map(async (docSnap) => {
                        const { categoryId, imageId } = docSnap.data();

                        // Fetch original image document
                        const imageDocRef = doc(db, 'categories', categoryId, 'images', imageId);
                        const imageDocSnap = await getDoc(imageDocRef);

                        if (!imageDocSnap.exists()) return null;

                        const imageData = imageDocSnap.data();
                        const imageUrl = await getDownloadURL(ref(storage, imageData.storagePath));

                        return {
                            id: docSnap.id,
                            url: imageUrl,
                            alt: imageData.description || '',
                            caption: imageData.description || '',
                        };
                    })
                );

                setFeaturedImages(imagesData.filter(Boolean));
            } catch (err) {
                console.error('Error fetching featured images:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedImages();
    }, []);

    if (loading) return <MasonrySkeletonLoader hasTitle={false}/>;

    if (error)
        return (
            <div className="p-8 text-center text-red-600">
                Error loading featured images: {error.message}
            </div>
        );

    return (
        <div className="mt-8 lg:mt-16">
            <MasonryGallery images={featuredImages} />
        </div>
    );
}
