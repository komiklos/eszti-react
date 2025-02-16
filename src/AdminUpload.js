// AdminUpload.js
import { useState } from 'react';
import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

function AdminUpload() {
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);

    const handleUpload = async () => {
        const uploads = files.map(async (file) => {
            const storageRef = ref(storage, `images/${category}/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            // Add to Firestore
            await addDoc(collection(db, 'categories', category, 'images'), {
                url,
                createdAt: new Date()
            });
        });

        await Promise.all(uploads);
        alert('Upload complete!');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="file"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}