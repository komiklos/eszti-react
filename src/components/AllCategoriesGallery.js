// components/AllCategoriesGallery.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner';

export default function AllCategoriesGallery() {
    const [categoryPreviews, setCategoryPreviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, 'categories'), orderBy('displayName'));
                const querySnapshot = await getDocs(q);

                const previews = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        try {
                            const categoryData = doc.data();
                            const imagesRef = collection(db, 'categories', doc.id, 'images');
                            const imagesSnapshot = await getDocs(imagesRef);

                            if (imagesSnapshot.empty) {
                                return {
                                    id: doc.id,
                                    ...categoryData,
                                    thumbnail: null
                                };
                            }

                            // 1. Get first image data
                            const firstImage = imagesSnapshot.docs[0].data();

                            // 2. Validate and format storage path
                            let storagePath = firstImage.storagePath;

                            // Add file extension if missing
                            if (!storagePath.match(/\.[a-zA-Z]{2,4}$/)) {
                                storagePath += '.jpg'; // Default to JPG if extension missing
                            }

                            // 3. Create storage reference
                            const storageRef = ref(storage, storagePath);

                            // 4. Get download URL
                            const thumbnailUrl = await getDownloadURL(storageRef);

                            return {
                                id: doc.id,
                                ...categoryData,
                                thumbnail: thumbnailUrl
                            };
                        } catch (err) {
                            console.error(`Error processing category ${doc.id}:`, err);
                            return null;
                        }
                    })
                );

                setCategoryPreviews(previews.filter(Boolean));
                setLoading(false);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div className="p-8 text-center text-red-600">
            Error loading categories: {error.message}
        </div>
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">All Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPreviews.map((category) => (
                    <Link
                        key={category.id}
                        to={`/${category.slug}`}
                        className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        {category.thumbnail ? (
                            <img
                                src={category.thumbnail}
                                alt={category.displayName}
                                className="w-full h-64 object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-500">No images available</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="text-white text-xl font-semibold">
                                {category.displayName}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
