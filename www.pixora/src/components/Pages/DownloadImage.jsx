import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { Lock, Sparkles } from 'lucide-react';

export const DownloadImage = () => {
    const { req_id } = useParams();
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState('');
    useEffect(() => {
        axios.get(`https://api.pixora.test/image/get/${req_id}`, { withCredentials: true, withXSRFToken: true }).then(res => {
            if (res.data.success) {
                setImageURL(res.data.image);
            } else {
                setError(res.data.message);
            }
        });
    }, [req_id]);
    return (
        <>
            <Navbar />
            <div className="pixora-download-container">
                {
                    error ? (
                        <div className="pixora-error-card">
                            <div className="error-icon-wrapper">
                                <Lock />
                            </div>
                            <h3>Access Restricted</h3>
                            <p>{error}</p>
                            <button className="pixora-btn-primary" onClick={() => window.history.back()}>
                                Go Back
                            </button>
                        </div>
                    ) : (
                        <div className="download-card">
                            <div className="success-icon-wrapper"><Sparkles /></div>
                            <h1>Your photo is ready!</h1>
                            <p className="subtitle">Thank you for your payment. Your edited high-resolution photo is now unlocked.</p>

                            {imageURL && imageURL.path && (
                                <>
                                    <img src={imageURL.path} alt="Edited Preview" className="image-preview" />
                                    <a href={imageURL.path} download="pixora_edited.jpg" target="_blank" rel="noreferrer" className="btn-download">
                                        Download Edited Photo
                                    </a>
                                </>
                            )}
                        </div >
                    )
                }
            </div >
            <Footer type={'dash'} />
        </>
    )
}
