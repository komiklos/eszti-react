// components/Footer.js
import React from 'react';
import { toast } from 'react-toastify';
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/insta.png";
import linkedin from "../assets/icons/linkedin.png";
import mail from "../assets/icons/mail.png";

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
        <footer className="bg-gray-100 pt-12 pb-24 mt-auto w-full">
            <div className="container mx-auto px-8 flex flex-col items-center gap-4">
                {/* Social Media Icons */}
                <div className="flex gap-6">
                    <a
                        href="https://www.instagram.com/kondaszeszti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-60 transition-opacity"
                    >
                        <img src={instagram} alt="Instagram" className="h-6 w-auto" />
                    </a>
                    <a
                        href="https://www.facebook.com/kondaase"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-60 transition-opacity"
                    >
                        <img src={facebook} alt="Facebook" className="h-6 w-auto" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kondaszeszti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-60 transition-opacity"
                    >
                        <img src={linkedin} alt="LinkedIn" className="h-6 w-auto" />
                    </a>
                    <button
                        onClick={copyEmail}
                        className="hover:opacity-60 transition-opacity"
                        aria-label="Copy email"
                    >
                        <img src={mail} alt="Email" className="h-6 w-auto" />
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