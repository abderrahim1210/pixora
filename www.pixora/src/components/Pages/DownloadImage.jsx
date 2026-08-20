import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';

export const DownloadImage = () => {
    const { req_id } = useParams();
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        axios.get(`https://api.pixora.test/image/get/${req_id}`, { withCredentials: true, withXSRFToken: true }).then(res => setImageURL(res.data.image));
    }, [req_id]);
    return (
        <>
            <Navbar />
            <div className="pixora-download-container">
                <div className="download-card">
                    <div className="success-icon">🎉</div>
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
                </div>
            </div>
            <Footer type={'dash'} />
        </>
    )
}
