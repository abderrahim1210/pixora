import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truncate } from './Truncate'
import { FaCrown } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import ShowMoreButton from './ShowMoreButton';

const PhotosTemplate = ({ photos }) => {
    const [visibility, setVisibility] = useState(4);

    const showMore = () => {
        setVisibility(prev => prev + 4);
    }
    function slugiFy(text) {
        return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }
    return (
        <>
            <div className='myphotos'>
                {
                    photos.slice(0, visibility).map((p) => (
                        <div className="card" key={p.id}>
                            <div className="card-body p-0">
                                <div className="image">
                                    {
                                        !!p.is_featured && (
                                            <div className="featured-badge">
                                                <FaCrown />
                                                <span className="featured-text">Choose from Pixora</span>
                                            </div>
                                        )
                                    }

                                    <Link
                                        id="caption"
                                        style={{ cursor: "pointer" }}
                                        to={`/photo/${p.id}/${slugiFy(p.title)}`}
                                    >
                                        <img src={`https://api.pixora.test/storage/photos/${p.filename}`} alt={p.title} onContextMenu={(e) => e.preventDefault()} />
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
            <div className='d-flex justify-content-center mb-3'>
                {
                    photos?.length > visibility && (
                        <ShowMoreButton showMore={showMore} />
                    )
                }
            </div>
        </>
    )
}

export default PhotosTemplate