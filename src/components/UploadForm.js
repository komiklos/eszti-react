import { useState } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

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

    const handleUpload = async () => {
        if (!selectedSlug || !files.length) return;

        setIsUploading(true);

        try {
            await Promise.all(files.map(async (file) => {
                const storageRef = ref(storage, `images/${selectedSlug}/${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);

                await addDoc(collection(db, 'categories', selectedSlug, 'images'), {
                    url,
                    createdAt: new Date()
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
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Images</h2>

            <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                disabled={isUploading}
            >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.displayName}
                    </option>
                ))}
            </select>

            <input
                type="file"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
                className="w-full mb-4"
                disabled={isUploading}
            />

            <button
                onClick={handleUpload}
                disabled={!selectedSlug || !files.length || isUploading}
                className={`w-full py-2 px-4 rounded text-white ${
                    isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isUploading ? 'Uploading...' : `Upload ${files.length} Images`}
            </button>
        </div>
    );
}