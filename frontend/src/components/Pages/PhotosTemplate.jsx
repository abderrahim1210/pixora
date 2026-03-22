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
                                    to={`/photo/${p.id}/${slugiFy(p.title)}`}
                                >
                                    <img src={`http://localhost:8000/storage/photos/${p.filename}`} alt={p.title} onContextMenu={(e) => e.preventDefault()} />
                                </Link>
                            </div>
                            <div className="d-flex justify-content-between p-2">
                                <div>
                                    <Truncate text={p.title} maxChars={20}>
                                        {({ text }) => (
                                            <h5>{text}</h5>
                                        )}
                                    </Truncate>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <p>{p.visibility}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotosTemplate