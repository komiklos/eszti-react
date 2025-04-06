import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import ImageModal from './gallery/ImageModal';
import AllCategoriesSkeletonLoader from "./AllCategoriesSkeletonLoader";
import ceramics1 from "../assets/eszti_assets/ceramics1.png";
import editorial1 from "../assets/eszti_assets/editorial1.png";
import kidlit1 from "../assets/eszti_assets/kidlit1.png";
import personal1 from "../assets/eszti_assets/personal1.png";
import riso1 from "../assets/eszti_assets/riso1.png";

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
                    const thumbnailRef = ref(storage, firstImage.storagePath);
                    const thumbnailUrl = await getDownloadURL(thumbnailRef);

                    return { id: doc.id, ...categoryData, thumbnail: thumbnailUrl };
                })
            );

            setCategoryPreviews(previews);
            setLoading(false);
        };

        fetchCategoryPreviews();
    }, []);

    if (loading) return <AllCategoriesSkeletonLoader />;

    const handleImageClick = (imageUrl, altText) => {
        setModalImage({ url: imageUrl, alt: altText });
        setIsModalOpen(true);
    };

    const getCategoryImage = (slug) => {
        switch(slug) {
            case 'ceramics': return ceramics1;
            case 'editorial': return editorial1;
            case 'kids-editorial': return kidlit1;
            case 'personal-projects': return personal1;
            case 'paintings': return riso1;
            default: return null;
        }
    };
// ... (keep all imports and state logic the same)

    return (
        <div className="p-8 xl:pl-16 xl:pr-16">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 xl:gap-x-8 gap-y-8">
                {categoryPreviews.map((cat) => {
                    const categoryImage = getCategoryImage(cat.slug);

                    return (
                        <div key={cat.id} className="group relative block overflow-hidden transition-shadow">
                            {/* Thumbnail */}
                            {cat.thumbnail ? (
                                <div className="relative aspect-ratio-box">
                                    <img
                                        src={cat.thumbnail}
                                        alt={cat.displayName}
                                        className="w-full h-full object-cover cursor-pointer"
                                        onClick={() => handleImageClick(cat.thumbnail, cat.displayName)}
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-ratio-box bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500">No images yet</span>
                                </div>
                            )}

                            {/* Title Below Thumbnail - Modified Section */}
                            <div className="h-[1rem] min-w-[1rem] mt-4 flex items-center">
                                {categoryImage ? (
                                    <div className="relative h-full w-auto flex-none">
                                        <img
                                            src={categoryImage}
                                            alt={cat.displayName}
                                            className="h-full w-auto object-contain block"
                                            style={{
                                                height: '1.25rem',
                                                width: 'auto',
                                                minWidth: '1.5rem'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <h2 className="text-black text-xl font-semibold">
                                        {cat.displayName}
                                    </h2>
                                )}
                            </div>

                            {/* Overlay for Link */}
                            <Link to={`/${cat.slug}`}>
                                <div className="absolute inset-0 bg-black bg-opacity-0 transition-all" />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <ImageModal
                isOpen={isModalOpen}
                image={modalImage}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
