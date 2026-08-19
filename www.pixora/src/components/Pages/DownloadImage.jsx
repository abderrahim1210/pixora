import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const DownloadImage = () => {
    const { req_id } = useParams();
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        axios.get(`https://api.pixora.test/image/get/${req_id}`, { withCredentials: true, withXSRFToken: true }).then(res => setImageURL(res.data.image));
    }, [req_id]);
    return (
        <div>
            <h1>Your photo is ready!</h1>
            {imageURL && (
                <a href={imageURL.path} download="pixora_edited.jpg" className="btn-download">
                    Download Edited Photo
                </a>
            )}
        </div>
    )
}
