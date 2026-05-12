import React from 'react'
import { Link } from 'react-router-dom';

const GalleryCard = ({ g }) => {
    // const previewPhotos = gallery.photos?.slice(0, 3) || [];

    return (
        <div className="gallery-card-wrapper">
            <div className="gallery-stack">
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
                            <Link to={`/gallery/${g.id}`} style={{textDecoration:'none'}} className="view-btn">View</Link>
                        </div>
                        <span className='gallery-desc'>
                            By {g.user?.username?.split('_')[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryCard