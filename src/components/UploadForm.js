// components/UploadForm.js
import { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, doc, deleteDoc, onSnapshot, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

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

    useEffect(() => {
        if (!selectedSlug) return;

        const unsubscribe = onSnapshot(
            collection(db, 'categories', selectedSlug, 'images'),
            (snapshot) => {
                const images = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setExistingImages(images);
            }
        );

        return () => unsubscribe();
    }, [selectedSlug]);

    // Add image to featured collection
    const handleFeature = async (imageId) => {
        if (!window.confirm('Add this image to featured collection?')) return;

        try {
            await addDoc(collection(db, 'featured'), {
                categoryId: selectedSlug,
                imageId,
                createdAt: new Date()
            });
            alert('Image added to featured collection!');
        } catch (error) {
            console.error('Error featuring image:', error);
            alert('Failed to feature image: ' + error.message);
        }
    };

    // Remove image from featured collection
    const handleRemoveFromFeatured = async (imageId) => {
        if (!window.confirm('Remove this image from featured collection?')) return;

        try {
            const q = query(
                collection(db, 'featured'),
                where('categoryId', '==', selectedSlug),
                where('imageId', '==', imageId)
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('This image is not in the featured collection.');
                return;
            }

            await Promise.all(querySnapshot.docs.map(async (docSnap) => {
                await deleteDoc(doc(db, 'featured', docSnap.id));
            }));

            alert('Image removed from featured collection!');
        } catch (error) {
            console.error('Error removing from featured:', error);
            alert('Failed to remove image from featured: ' + error.message);
        }
    };

    // Delete image completely
    const handleDelete = async (imageId, storagePath) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'categories', selectedSlug, 'images', imageId));
            await deleteObject(ref(storage, storagePath));
            alert('Image deleted successfully!');
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Delete failed: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    // Upload new images
    const handleUpload = async () => {
        if (!selectedSlug || !files.length) return;

        setIsUploading(true);
        try {
            await Promise.all(files.map(async (file) => {
                const storagePath = `images/${selectedSlug}/${file.name}`;
                const storageRef = ref(storage, storagePath);

                const snapshot = await getDocs(
                    query(
                        collection(db, 'categories', selectedSlug, 'images'),
                        where('storagePath', '==', storagePath)
                    )
                );

                if (!snapshot.empty) {
                    console.warn(`File already exists: ${storagePath}`);
                    return;
                }

                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);

                await addDoc(collection(db, 'categories', selectedSlug, 'images'), {
                    url,
                    storagePath,
                    createdAt: Timestamp.now(),
                    fileName: file.name
                });
            }));

            alert('Upload successful!');
            setFiles([]);
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Sign-out handler
    const handleSignOut = async () => {
        if (!window.confirm('Are you sure you want to sign out?')) return;

        try {
            await signOut(auth);
            alert('Signed out successfully.');
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Sign out failed: ' + error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Image Manager</h2>

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    className="py-1 px-3 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    Sign Out
                </button>
            </div>

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
                                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleFeature(image.id)}
                                        className="p-1 bg-green-500 text-white rounded-full"
                                        title="Add to Featured"
                                    >
                                        ★
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromFeatured(image.id)}
                                        className="p-1 bg-yellow-500 text-white rounded-full"
                                        title="Remove from Featured"
                                    >
                                        ☆
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image.id, image.storagePath)}
                                        disabled={isDeleting}
                                        className="p-1 bg-red-500 text-white rounded-full"
                                        title="Delete Image"
                                    >
                                        ✕
                                    </button>
                                </div>
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
