import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

const CATEGORIES = [
    { slug: 'kids-editorial', displayName: 'Kids Editorial' },
    { slug: 'editorial', displayName: 'Editorial' },
    { slug: 'ceramics', displayName: 'Ceramics' },
    { slug: 'paintings', displayName: 'Paintings' },
    { slug: 'personal-projects', displayName: 'Personal Projects' }
];

export default function UploadForm() {
    const [selectedSlug, setSelectedSlug] = useState('');
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [existingImages, setExistingImages] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

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
        if (!selectedSlug) return;

        const unsubscribe = onSnapshot(
            collection(db, 'categories', selectedSlug, 'images'),
            async (snapshot) => {
                const images = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const exists = await checkImageExists(data.storagePath);
                        return exists ? { id: doc.id, ...data } : null;
                    })
                );
                setExistingImages(images.filter(Boolean)); // Remove null values
            }
        );

        return () => unsubscribe();
    }, [selectedSlug]);

    const handleDelete = async (imageId, storagePath) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        setIsDeleting(true);
        try {
            // Delete Firestore document
            await deleteDoc(doc(db, 'categories', selectedSlug, 'images', imageId));

            // Delete file from Storage
            const fileRef = ref(storage, storagePath);
            await deleteObject(fileRef);

            alert('Image deleted successfully!');
        } catch (error) {
            alert('Delete failed: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedSlug || !files.length) return;

        setIsUploading(true);
        try {
            await Promise.all(files.map(async (file) => {
                const storagePath = `images/${selectedSlug}/${file.name}`;
                const storageRef = ref(storage, storagePath);

                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);

                await addDoc(collection(db, 'categories', selectedSlug, 'images'), {
                    url,
                    storagePath,
                    createdAt: new Date(),
                    fileName: file.name
                });
            }));

            alert('Upload successful!');
            setFiles([]);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Image Manager</h2>

            {/* Category Selector */}
            <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                disabled={isUploading || isDeleting}
            >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.displayName}</option>
                ))}
            </select>

            {/* Upload Section */}
            <div className="mb-8 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-4">Upload New Images</h3>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles([...e.target.files])}
                    className="w-full mb-4"
                    disabled={isUploading || isDeleting}
                />
                <button
                    onClick={handleUpload}
                    disabled={!selectedSlug || !files.length || isUploading || isDeleting}
                    className={`w-full py-2 px-4 rounded text-white ${
                        isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isUploading ? 'Uploading...' : `Upload ${files.length} Images`}
                </button>
            </div>

            {/* Existing Images Section */}
            {selectedSlug && (
                <div className="p-4 border rounded">
                    <h3 className="text-lg font-semibold mb-4">
                        Existing Images ({existingImages.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="relative group">
                                <img
                                    src={image.url}
                                    alt="Uploaded content"
                                    className="w-full h-32 object-cover rounded"
                                />
                                <button
                                    onClick={() => handleDelete(image.id, image.storagePath)}
                                    disabled={isDeleting}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full
                                    opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                                <div className="text-xs text-gray-600 mt-1 truncate">
                                    {image.fileName || 'untitled'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}