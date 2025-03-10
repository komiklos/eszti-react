// Footer.js
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'; // Install react-icons if not already installed

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-6 mt-12">
            <div className="container mx-auto px-8 flex flex-col items-center gap-4">
                {/* Social Media Icons */}
                <div className="flex gap-6">
                    <a
                        href="https://instagram.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaInstagram size={24} />
                    </a>
                    <a
                        href="https://facebook.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>

                {/* Signature */}
                <p className="text-gray-600 text-sm">
                    © 2025 Eszti Kondász. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
