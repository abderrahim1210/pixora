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
                                    <img src={`http://localhost:8000/storage/edited_images/${p?.path}`} alt={p?.parent?.title} onContextMenu={(e) => e.preventDefault()} />

                                </Link>
                            </div>
                            <div className="d-flex justify-content-between p-2">
                                <div>
                                    <Truncate text={p?.request?.requester?.username} maxChars={20}>
                                        {({ text }) => {
                                            const [name,hash] = text ? text.split('_') : ['',''];
                                            return (
                                                <div className='user-info-wrapper'>
                                                    <h6 className='info-row'>
                                                        Request By <span className='main-name'>{name}</span>
                                                        {hash && <span className='hash-tag'>#{hash}</span>}
                                                    </h6>
                                                    <h6 className='info-row'>
                                                        Edit by <span className='editor-name'>{p?.editor?.username.split('_')[0]}</span>
                                                    </h6>
                                                </div>
                                            )
                                        }}
                                    </Truncate>
                                </div>
                                {/* <div className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <p>{p.visibility}</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotosTemplate