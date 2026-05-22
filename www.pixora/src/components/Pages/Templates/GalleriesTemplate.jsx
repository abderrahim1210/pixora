import React from 'react'
import { EmptyContent } from '../EmptyContent'
import { MdPhotoLibrary } from 'react-icons/md'
import { Link } from 'react-router-dom'

const GalleriesTemplate = ({ galleries, visible }) => {
    return (
        <div data-bs-page="galleries">
            <div className="container-fluid">
                {
                    galleries.length > 0 ? (
                        <div className="galleries-grid mt-3 mb-3">
                            {
                                galleries?.slice(0, visible).map((g) => (
                                    <div key={g.id} className="gallery-card">
                                        <div className="gallery-cover">
                                            {
                                                g.photos && g.photos?.length > 0 ? (
                                                    <div className="gallery-preview">
                                                        {
                                                            g.photos.slice(0, 4).map((p, index) => (
                                                                <img key={index} src={`https://api.pixora.test/storage/photos/${p.filename}`} alt="" />
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="no-image">
                                                        {
                                                            g.title.charAt(0)
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="gallery-content">
                                            <h5 className="gallery-title">
                                                {g.title}
                                            </h5>
                                            <p className="gallery-desc">
                                                {g.description || 'No description'}
                                            </p>

                                            <div className="gallery-footer">
                                                <span>{g.photos.length ?? 0} Photos</span>
                                                <Link to={`/gallery/${g.id}`} className="view-btn">View</Link>
                                            </div>
                                            <span className='gallery-desc'>
                                                By {g.user?.username}
                                            </span>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    ) : (
                        <EmptyContent icon={<MdPhotoLibrary className="faIcon" />} text={'No galleries yet — create your first one!'} />
                    )
                }
            </div>
        </div>
    )
}

export default GalleriesTemplate