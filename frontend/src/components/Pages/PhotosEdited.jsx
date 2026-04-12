import React from 'react'
import { Link } from 'react-router-dom'
import { Truncate } from './Truncate'

const PhotosTemplate = ({ photos }) => {
    function slugiFy(text) {
        return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }
    return (
        <div className='myphotos'>
            {
                photos.map((p) => (
                    <div className="card" key={p.id}>
                        <div className="card-body p-0">
                            <div className="image">
                                <Link
                                    id="caption"
                                    style={{ cursor: "pointer" }}
                                >
                                    <img src={`http://localhost:8000/storage/edited_images/${p?.path}`} alt={p?.parent.title} onContextMenu={(e) => e.preventDefault()} />

                                </Link>
                            </div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotosTemplate