const { onObjectFinalized } = require('firebase-functions/v2/storage');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

exports.syncStorageToFirestore = onObjectFinalized(
    { region: 'europe-west1' }, // Specify the region here
    async (event) => {
            const filePath = event.data.name; // e.g., "images/kids-editorial/example.jpg"
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${event.data.bucket}/o/${encodeURIComponent(filePath)}?alt=media`;

            // Extract category from file path
            const categorySlug = filePath.split('/')[1]; // e.g., "kids-editorial"

            // Check if a document with the same storagePath already exists
            const firestore = getFirestore();
            const existingDoc = await firestore
                .collection('categories')
                .doc(categorySlug)
                .collection('images')
                .where('storagePath', '==', filePath)
                .limit(1)
                .get();

            if (!existingDoc.empty) {
                    console.log(`Document already exists for ${filePath}`);
                    return;
            }

            // Add document to Firestore
            await firestore
                .collection('categories')
                .doc(categorySlug)
                .collection('images')
                .add({
                        url: fileUrl,
                        storagePath: filePath,
                        createdAt: new Date().toISOString(),
                        fileName: filePath.split('/').pop() // e.g., "example.jpg"
                });

            console.log(`Created Firestore document for ${filePath}`);
    }
);