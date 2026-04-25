import React from 'react'
import { Truncate } from '../Pages/Truncate'
import Avatar from '../Pages/Avatar'
import PageSkeleton from '../Pages/PageSkeleton'
import { FaPhotoFilm } from 'react-icons/fa6'
import Photos from './Photos'
import { Link } from 'react-router-dom'

const ForYou = ({ photos, user, isLoading, users, follows, addFollow, getGreeting, slugiFy, handleLike }) => {
    return (
        <div
            className="container-fluid tab-pane fade show active mt-3 mb-3"
            id="foryou"
        >
            {/* <h1 className="text-center fw-bold">For you</h1> */}
            <div className="for-you-header d-flex justify-content-center align-items-center flex-column text-center gap-1 mb-2">
                <h1 className="fw-bold text-center">For you</h1>
                <span className="text-muted fw-light greeting-text">
                    — {getGreeting()}, {user?.username || "Artist"}! Ready to create? —
                </span>
            </div>
            <div className="photos">
                {isLoading ? Array(4).fill().map((_, i) => <PageSkeleton key={i} page={'photos'} />) : photos.length > 0 ? photos.map((p, index) => (
                    <React.Fragment key={index}>
                        {(index + 1) % 4 === 0 && (
                            <div className="feed-break-section">
                                <div className="section-header">
                                    <h4>Photographers you might like</h4>
                                    <Link to="/photographers">See all</Link>
                                </div>
                                <div className="photographers-horizontal-scroll">
                                    {users.filter(u => u.id !== user?.id).slice(0, 6).map(u => (
                                        <div className="mini-user-card" key={u.id}>
                                            <Avatar src={`https://api.pixora.test/storage/profile_pictures/${u.photo_profile}`} size={60} />
                                            <Link to={`/photographer/${u.id}`} style={{textDecoration:'none',color:'#454545'}}>
                                                <Truncate text={u.username} maxChars={25}>
                                                    {({ text }) => (
                                                        <h6>{text.split('_')[0]}</h6>
                                                    )}
                                                </Truncate>
                                            </Link>
                                            <button className={`btn-follow-sm ${follows.includes(u.id) ? 'followed' : ''} ${user?.role === 'admin' && 'disabled'}`} disabled={user?.role === 'admin'} onClick={() => addFollow(u.id)}>{follows.includes(u.id) ? 'Followed' : 'Follow'}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Photos key={index} p={p} user={user} slugiFy={slugiFy} handleLike={handleLike} />
                    </React.Fragment>
                )) : <EmptyContent icon={<FaPhotoFilm className="faIcon" />} text={"No photos yet - try again later!"} />}
            </div>
        </div>
    )
}

export default ForYou