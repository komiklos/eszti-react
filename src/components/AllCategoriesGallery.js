// components/AllCategoriesGallery.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner';
import ImageModal from './gallery/ImageModal';

export default function AllCategoriesGallery() {
    const [categoryPreviews, setCategoryPreviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalImage, setModalImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategoryPreviews = async () => {
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            const previews = await Promise.all(
                categoriesSnapshot.docs.map(async (doc) => {
                    const categoryData = doc.data();
                    const imagesSnapshot = await getDocs(
                        collection(db, 'categories', doc.id, 'images')
                    );

                    if (imagesSnapshot.empty) return { id: doc.id, ...categoryData, thumbnail: null };

                    const firstImage = imagesSnapshot.docs[0].data();
                    const thumbnailUrl = await getDownloadURL(ref(storage, firstImage.storagePath));

                    return { id: doc.id, ...categoryData, thumbnail: thumbnailUrl };
                })
            );

            setCategoryPreviews(previews);
            setLoading(false);
        };

        fetchCategoryPreviews();
    }, []);

    if (loading) return <LoadingSpinner />;

    const handleImageClick = (imageUrl, altText) => {
        setModalImage({ url: imageUrl, alt: altText });
        setIsModalOpen(true);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">All Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPreviews.map((cat) => (
                    <div key={cat.id} className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        {cat.thumbnail ? (
                            <img
                                src={cat.thumbnail}
                                alt={cat.displayName}
                                className="w-full h-64 object-cover cursor-pointer"
                                onClick={() => handleImageClick(cat.thumbnail, cat.displayName)}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-500">No images yet</span>
                            </div>
                        )}
                        <Link to={`/${cat.slug}`}>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <h2 className="text-white text-xl font-semibold">{cat.displayName}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                image={modalImage}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
