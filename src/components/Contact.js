// src/components/Contact.js
import React from 'react';
import letsWorkTogether from "../assets/eszti_assets/letsworktogether.png";
import { toast } from 'react-toastify';

export default function Contact() {
    const copyEmail = () => {
        navigator.clipboard.writeText('kondaszeszti@gmail.com');
        toast.success('Email copied to clipboard!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            {/* Lets Work Together Image */}
            <div className="mt-24 mb-32 flex justify-center">
                <img
                    src={letsWorkTogether}
                    alt="Let's Work Together"
                    className="max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={copyEmail}
                />
            </div>
        </div>
    );
}
