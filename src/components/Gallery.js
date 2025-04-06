// components/Gallery.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import MasonryGallery from './gallery/MasonryGallery';
import MasonrySkeletonLoader from './MasonrySkeletonLoader';
import ceramics1 from "../assets/eszti_assets/ceramics1.png";
import editorial1 from "../assets/eszti_assets/editorial1.png";
import kidlit1 from "../assets/eszti_assets/kidlit1.png";
import personal1 from "../assets/eszti_assets/personal1.png";
import riso1 from "../assets/eszti_assets/riso1.png";

export default function Gallery() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <MasonrySkeletonLoader hasTitle={true}/>;

    if (error)
        return (
            <div className="p-8 text-center text-red-600">
                Error loading gallery: {error.message}
            </div>
        );

    const categoryImage = getCategoryImage(slug);

    return (
        <div>
            <div className="my-8 sm:ml-2 xl:ml-2">
                    <img
                    src={categoryImage}
                    alt={category.displayName}
                    className="h-full ml-8 xl:ml-16 w-auto object-contain block"
                    style={{
                        height: '1.5rem',
                        width: 'auto',
                        minWidth: '1.5rem'
                    }}
                />
            </div>
            <MasonryGallery images={images}/>
        </div>
    );
}
