import React from 'react'
import Photos from './Photos'
import GalleryCard from '../Pages/GalleryCard';
import { Link } from 'react-router-dom';

const Explore = ({ photos, user, slugiFy, handleLike, galleries }) => {
    const getExploreGreeting = () => {
        const messages = [
            "Uncover hidden gems from our community.",
            "Your next favorite photographer is right here.",
            "Expanding your horizons, one click at a time.",
            "Step outside your bubble and see more."
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };
    return (
        <div
            className="container-fluid tab-pane fade show mt-3 mb-3"
            id="explore"
        >
            <div className="explore-header d-flex justify-content-center align-items-center flex-column text-center gap-1 mb-4">
                <h1 className="fw-bold text-center">Explore</h1>
                <span className="text-muted fw-light greeting-text">
                    — {getExploreGreeting()} —
                </span>
            </div>
            <div className='photos'>
                {
                    photos?.map((p, index) => (
                        <React.Fragment key={index}>
                            {(index + 1) % 5 === 0 && (
                                <div className="feed-break-section">
                                    <div className="section-header">
                                        <h4>Featured Galleries</h4>
                                        <Link to="/galleries">See all</Link>
                                    </div>
                                    <div className='galleries-grid-inner'>
                                        {
                                            galleries && galleries.length > 0 && galleries.slice(0, 4).map(g => (
                                                <GalleryCard g={g} key={g.id} />
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                            <Photos key={p.id} p={p} user={user} slugiFy={slugiFy} handleLike={handleLike} />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default Explore