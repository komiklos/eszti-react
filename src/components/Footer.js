// Footer.js
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    const copyEmail = () => {
        navigator.clipboard.writeText('kondaszeszti@gmail.com');
        toast.success('Email copied to clipboard!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    return (
        <footer className="bg-gray-100 pt-12 pb-24 mt-12">
            <div className="container mx-auto px-8 flex flex-col items-center gap-4">
                {/* Social Media Icons */}
                <div className="flex gap-6">
                    <a
                        href="https://www.instagram.com/kondaszeszti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaInstagram size={24} />
                    </a>
                    <a
                        href="https://www.facebook.com/kondaase"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kondaszeszti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <button
                        onClick={copyEmail}
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                        aria-label="Copy email"
                    >
                        <FaEnvelope size={24} />
                    </button>
                </div>

                {/* Signature */}
                <p className="text-gray-600 text-sm">
                    © 2025 Kondász Eszter. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
