import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaBan, FaCamera, FaFacebook, FaGlobe, FaInstagram, FaMapPin, FaTwitter } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent'
import PageSkeleton from './PageSkeleton'
import PhotosTemplate from './PhotosTemplate'
import Spinner from './Spinner'
import { useAuth } from '../context/AuthProvider'
import {fetchFollows,toggleFollowAction} from '../utils/getFollows'
const Photograher = () => {
    const { id } = useParams();
    const [photographer, setPhotographer] = useState(null);
    const [statistics, setStatistics] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);
    useEffect(() => {
        fetchFollows(setFollows);
    }, []);

    const isFollowed = follows.includes(Number(id));
    const followClasse = isFollowed ? 'active' : '';
    const followText = isFollowed ? 'Followed' : 'Follow';

    const addFollow = async (id) => {
        toggleFollowAction(id,follows,setFollows,setStatistics,statistics);
    }

    useEffect(() => {
        const fetchInfos = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/get_infos_photographers/${id}`, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    setPhotographer(res.data.photographer);
                    setStatistics(res.data.statistics);
                    setPhotos(res.data.photos);
                    setLoading(false);
                }

            } catch (err) {
                console.log(err.response?.data);
            } finally {
                setLoading(false);
            }
        }
        fetchInfos();
    }, [id]);
    return (
        <div data-bs-page='myprofile'>
            {
                loading ? (<Spinner text='Photogrpaher page prepared for you ...' />) : (
                    <>
                        <Navbar />
                        <div
                            className="d-flex justify-content-start align-items-center mt-2 mb-3"
                            style={{ flexDirection: "column", gap: 5 }}
                        >
                            <div className="container-fluid p-0 profileImages">
                                <div
                                    className="coverImage"
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{
                                        backgroundImage: user?.cover_image
                                            ? `url("http://localhost:8000/storage/cover_images/${photographer.cover_image}")`
                                            : `linear-gradient(135deg, #454545 0%, #353535 100%)`,
                                        backgroundAttachment: "fixed",
                                        backgroundRepeat: "no-repeat",
                                        cursor: "pointer"
                                    }}
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
                                                photographer?.photo_profile
                                                    ? "http://localhost:8000/storage/profile_pictures/" + photographer.photo_profile
                                                    : "/outils/pngs/useracc2.png"
                                            }
                                            onContextMenu={(e) => e.preventDefault()}
                                            alt={user?.username}
                                            title="Your profile picture"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="photo-info-card w-100">
                            <div className="information">
                                <div>
                                    <h3 className="fw-semibold mb-1">{photographer?.display_name}</h3>
                                </div>
                                <div>
                                    {
                                        user?.role === "admin" && (
                                            <span className="badge">Admin</span>
                                        )
                                    }
                                    <p
                                        className="mb-1 mx-auto"
                                        style={{
                                            textDecoration: "underline",
                                            width: "max-content",
                                            cursor: "pointer",
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="View in map"
                                    >
                                        <FaMapPin id="location_icon" />
                                        {photographer?.country}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-1">@{photographer?.email}</p>
                                </div>
                                <div>
                                    <p>{user?.bio}</p>
                                </div>
                            </div>
                            <div className="container statistic_profile">
                                <div>{statistics?.followers ?? 0} Followers</div>
                                <div>{statistics?.followings ?? 0} Following</div>
                                <div>{statistics?.likes ?? 0} Likes</div>
                                <div>{statistics?.photosCount ?? 0} Photos</div>
                            </div>
                            <div className="social_media mt-2 mb-2">
                                {photographer?.facebook && (
                                    <div>
                                        <a href="" id="facebookIcon">
                                            <FaFacebook />
                                        </a>
                                    </div>
                                )}
                                {photographer?.instagram && (
                                    <div>
                                        <a href="" id="instagramIcon">
                                            <FaInstagram />
                                        </a>
                                    </div>
                                )}
                                {photographer?.x && (
                                    <div>
                                        <a href="" id="xIcon">
                                            <FaTwitter />
                                        </a>
                                    </div>
                                )}
                                {photographer?.website && (
                                    <div>
                                        <a href="" id="webIcon">
                                            <FaGlobe />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div>
                                {Number(id) !== user?.id ? (
                                    <div className="mt-3 mb-3">
                                        <button
                                            type="button"
                                            className={`followButton ${followClasse} ${photographer && photographer?.role === "admin" && "disabled"} btn`}
                                            id="followButton"
                                            onClick={() => addFollow(photographer.id)}
                                        >
                                            {followText}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-3 mb-3">
                                        <button
                                            type="button"
                                            className="followButton btn"
                                            id="followButton"
                                            onClick={() => navigate(`${user && user?.username}/myprofile`)}
                                        >
                                            View profile
                                        </button>
                                    </div>
                                )}
                            </div>


                            <div className="container-fluid">
                                <div className="mb-3">
                                    {loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos?.length > 0 ? (
                                        <PhotosTemplate photos={photos} />
                                    ) : user?.role === "user" ? (<EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />) : (<EmptyContent icon={<FaBan className="faIcon" />} text={"Upload is not availabe for adminstrators"} />)}
                                </div>
                                {user?.role === "user" && (<a href="#" style={{ textDecoration: "underline" }}>
                                    Show more
                                </a>)}
                            </div>
                        </div>
                        <Footer type={'footer'} />
                    </>
                )
            }
        </div >
    )
}

export default Photograher