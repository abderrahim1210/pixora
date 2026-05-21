import React from 'react'
import { FaBan, FaCamera, FaFacebook, FaGlobe, FaIdBadge, FaInstagram, FaMapPin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PhotosTemplate from '../PhotosTemplate'
import { EmptyContent } from '../EmptyContent'
import PageSkeleton from '../PageSkeleton'

const Infos = ({ user, openModal, statistics, loading, photos, photosCount }) => {
    return (
        <div className="mt-2 mb-2 tab-pane fade show active" id="info">
            <div
                className="d-flex justify-content-start align-items-center mt-2 mb-3"
                style={{ flexDirection: "column", gap: 5 }}
            >
                <div className="container-fluid p-0 profileImages">
                    <div
                        className="coverImage"
                        onContextMenu={(e) => e.preventDefault()}
                        style={{
                            backgroundImage: user.cover_image
                                ? `url("https://api.pixora.test/storage/cover_images/${user?.cover_image}")`
                                : `linear-gradient(135deg, #454545 0%, #353535 100%)`,
                            backgroundAttachment: "fixed",
                            backgroundRepeat: "no-repeat",
                            cursor: "pointer"
                        }}
                        onClick={() => openModal('coverImage')}
                    >
                        <div className="d-flex justify-content-center">
                            <form
                                action="up_cover_picture.php"
                                id="coverPictureForm"
                                method="post"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    className="d-none"
                                    name="coverFile"
                                    id="cover_file"
                                    accept=".png, .jpeg"
                                />
                            </form>
                            <FaCamera />
                        </div>
                    </div>
                    <div className="profileImage">
                        <form
                            action="up_profile_picture.php"
                            id="profilePictureForm"
                            method="post"
                            encType="multipart/form-data"
                        >
                            <input
                                type="file"
                                name="profileImage"
                                className="d-none"
                                id="profile_img"
                                accept=".png, .jpeg"
                            />
                        </form>
                        <div className="avatar">
                            <img
                                src={
                                    user.photo_profile
                                        ? "https://api.pixora.test/storage/profile_pictures/" + user.photo_profile
                                        : "/outils/pngs/useracc2.png"
                                }
                                onClick={() => openModal("profilePicture")}
                                onContextMenu={(e) => e.preventDefault()}
                                alt={user.username}
                                title="Your profile picture"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="photo-info-card w-100">
                <div className="information">
                    <div>
                        <h3 className="fw-semibold mb-1">{user?.display_name}</h3>
                    </div>
                    <div>
                        {
                            (user.role === "admin" || user.role === "editor") && (
                                <span className={`badge badge-${user?.role}`}><FaIdBadge /> {user?.role}</span>
                            )
                        }
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user?.country || '')}`}
                            target='_blank'
                            rel="noopener noreferrer"
                            className="mb-1 mx-auto"
                            style={{
                                textDecoration: "underline",
                                width: "max-content",
                                cursor: "pointer",
                                color:'#1A1A1A'
                            }}
                            data-bs-toggle="tooltip"
                            title="View in map"
                        >
                            <FaMapPin id="location_icon" />
                            {user?.country}
                        </a>
                    </div>
                    <div>
                        <p className="mb-1">@{user?.email}</p>
                    </div>
                    <div>
                        <p>{user?.bio}</p>
                    </div>
                </div>
                <div className="container statistic_profile">
                    <div>{statistics?.followers ?? 0} Followers</div>
                    <div>{statistics?.followings ?? 0} Following</div>
                    <div>{statistics?.likes ?? 0} Likes</div>
                    {
                        user?.role === 'user' && (
                            <div>{photosCount ?? 0} Photos</div>
                        )
                    }
                </div>
                <div className="social_media mt-2 mb-2">
                    {user.facebook && (
                        <div>
                            <a href="" id="facebookIcon">
                                <FaFacebook />
                            </a>
                        </div>
                    )}
                    {user.instagram && (
                        <div>
                            <a href="" id="instagramIcon">
                                <FaInstagram />
                            </a>
                        </div>
                    )}
                    {user.x && (
                        <div>
                            <a href="" id="xIcon">
                                <FaTwitter />
                            </a>
                        </div>
                    )}
                    {user.website && (
                        <div>
                            <a href="" id="webIcon">
                                <FaGlobe />
                            </a>
                        </div>
                    )}
                </div>
                <div className="container-fluid pm-button mt-3">
                    <Link to={`/user/${user.username}/dashboard`} className={`btn ${(user?.role === "admin" || user?.role === "editor") ? "disabled" : ""}`} id="managePhotos">
                        manage my photos
                    </Link>
                </div>
                <div className="container-fluid">
                    <div className="mb-3">
                        {loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos.length > 0 ? (
                            <PhotosTemplate photos={photos} />
                        ) : user.role === "user" ? (<EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />) : (<EmptyContent icon={<FaBan className="faIcon" />} text={"Upload is not availabe for adminstrators or editors"} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Infos