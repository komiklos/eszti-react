// src/components/Contact.js
import React from 'react';

export default function Contact() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact</h1>

            {/* Contact Information */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-2">
                    If you have any questions or would like to discuss a project, feel free to reach out!
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> eszti@example.com
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> +36 123 4567
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Address:</strong> Budapest, Hungary
                </p>
            </div>

        </div>
    );
}
