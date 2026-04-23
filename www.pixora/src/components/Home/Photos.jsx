import React from 'react'
import { FaComment, FaCrown, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Truncate } from '../Pages/Truncate'

const Photos = ({ p, user, slugiFy, handleLike }) => {
    return (

        <div className="card">
            <Link
                key={p.id}
                id="caption"
                style={{ cursor: "pointer" }}
            ></Link>
            <div className="photo">
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
                <div className="info">
                    <a
                        id="caption"
                    >
                        <div>
                            <Truncate text={p.title} maxChars={25}>
                                {({ text }) => (
                                    <h5>{text}</h5>
                                )}
                            </Truncate>
                        </div>
                    </a>
                    <div>
                        <Link id="caption">
                            <input
                                type="hidden"
                                name="photo_id"
                                defaultValue={p.id}
                            />
                        </Link>
                        <div>
                            <a
                                className={`likeButton ${(user && p.isLiked) ? 'active' : ''}`}
                                data-photo-id={p.id}
                                onClick={() => handleLike(p.id)}
                            >
                                <FaHeart />{" "}
                            </a>
                            <a style={{ cursor: "pointer" }}>
                                <FaComment />{" "}
                                <span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Photos