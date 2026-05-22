import React, { useEffect, useState } from 'react'
import { Navbar } from './Layouts/Navbar'
import { Footer } from './Layouts/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaBan, FaCamera, FaFacebook, FaGlobe, FaIdBadge, FaInstagram, FaMapPin, FaTwitter } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent'
import PageSkeleton from './PageSkeleton'
import PhotosTemplate from './Templates/PhotosTemplate'
import Spinner from './Spinner'
import { useAuth } from '../context/AuthProvider'
import { fetchFollows, toggleFollowAction } from '../utils/getFollows'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Flag, MoreHorizontal } from 'lucide-react'
import { useModal } from '../context/ModalProvider'
import ModalTemplate from './Templates/ModalTemplate'
import Report from './Report'
import { Helmet } from 'react-helmet-async'
const Photograher = () => {
    const { id } = useParams();
    const { show, openModal, closeModal } = useModal();
    const [visible, setVisible] = useState(8);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [followers, setFollowers] = useState(0);

    const { data: follows = [] } = useQuery({
        queryKey: ['follows'],
        queryFn: async () => {
            const res = await axios.get('https://api.pixora.test/follows', { withCredentials: true, withXSRFToken: true });
            return res.data?.users?.map(f => f.following_id) || [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const showMoreItems = () => {
        setVisible((prev) => prev + 8);
    }

    const queryClient = useQueryClient();
    const addFollow = async (id) => {
        await queryClient.cancelQueries({ queryKey: ['follows'] });
        const newFollows = follows.includes(id) ? follows.filter(fid => fid !== id) : [...follows, id];
        const previousFollows = queryClient.getQueryData(['follows']) || [];
        queryClient.setQueryData(['follows'], newFollows);

        try {
            const res = await axios.post('https://api.pixora.test/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
            if (res.data.status === 'followed'){
                setFollowers(prev => prev + 1);
            }else{
                setFollowers(prev => prev - 1);
            }
        } catch (err) {
            queryClient.setQueryData(['follows'], previousFollows);
            console.log(err?.response?.data);
        }
    }

    const fetchInfos = async () => {
        try {
            const res = await axios.get(`https://api.pixora.test/get_infos_photographers/${id}`, { withCredentials: true, withXSRFToken: true });
            return res.data;

        } catch (err) {
            console.log(err.response?.data);
        }
    }
    const { data, isLoading, errors } = useQuery({
        queryKey: ['photographer', id],
        queryFn: fetchInfos
    });

    const photographer = data?.photographer || [];
    const statistics = data?.statistics || [];
    const photos = data?.photos || [];

     useEffect(() => {
        if (data?.statistics){
            setFollowers(data?.statistics?.followers || 0);
        }
    },[data]);

    const isFollowed = follows.includes(Number(id));
    const followClasse = isFollowed ? 'active' : '';
    const followText = isFollowed ? 'Followed' : 'Follow';
    return (
        <div data-bs-page='myprofile'>
            <Helmet>
                <title>Pixora | Photographer</title>
            </Helmet>
            {
                show === 'report_user' && (
                    <ModalTemplate show={show} closeModal={closeModal}>
                        <Report id={photographer?.id} user={user} type={'user'} />
                    </ModalTemplate>
                )
            }
            {
                isLoading ? (<Spinner text='Photogrpaher page prepared for you ...' />) : (
                    <>
                        <Navbar />
                        <div
                            className="d-flex justify-content-start align-items-center mt-2 mb-3"
                            style={{ flexDirection: "column", gap: 5 }}
                        >
                            <div className="container-fluid p-3 profileImages">
                                <div
                                    className="coverImage"
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{
                                        backgroundImage: photographer?.cover_image
                                            ? `url("https://api.pixora.test/storage/cover_images/${photographer?.cover_image}")`
                                            : `linear-gradient(135deg, #454545 0%, #353535 100%)`,
                                        backgroundAttachment: "fixed",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
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
                                                    ? "https://api.pixora.test/storage/profile_pictures/" + photographer.photo_profile
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
                                        (photographer?.role === "admin" || photographer?.role === "editor") && (
                                            <span className={`badge badge-${photographer?.role}`}><FaIdBadge /> {photographer?.role}</span>
                                        )
                                    }
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(photographer?.country || '')}`}
                                        target='_blank'
                                        rel="noopener noreferrer"
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
                                    </a>
                                </div>
                                <div>
                                    <p className="mb-1">@{photographer?.email}</p>
                                </div>
                                <div>
                                    <p>{user?.bio}</p>
                                </div>
                            </div>
                            <div className="container statistic_profile">
                                <div>{followers ?? 0} Followers</div>
                                <div>{statistics?.followings ?? 0} Following</div>
                                <div>{statistics?.likes ?? 0} Likes</div>
                                <div>{statistics?.photosCount ?? 0} Photos</div>
                            </div>
                            <div className="social_media mt-2 mb-2">
                                {photographer?.facebook && (
                                    <div>
                                        <a href={photographer?.facebook} id="facebookIcon">
                                            <FaFacebook />
                                        </a>
                                    </div>
                                )}
                                {photographer?.instagram && (
                                    <div>
                                        <a href={photographer?.instagram} id="instagramIcon">
                                            <FaInstagram />
                                        </a>
                                    </div>
                                )}
                                {photographer?.x && (
                                    <div>
                                        <a href={photographer?.x} id="xIcon">
                                            <FaTwitter />
                                        </a>
                                    </div>
                                )}
                                {photographer?.website && (
                                    <div>
                                        <a href={photographer?.website} id="webIcon">
                                            <FaGlobe />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div>
                                {Number(id) !== user?.id ? (
                                    <div className="profile-actions-wrapper d-flex align-items-center gap-2 mt-3">
                                        <button
                                            type="button"
                                            className={`followButton ${followClasse} ${(user?.role === "admin" || user?.role === "editor") ? "disabled" : ""} btn`}
                                            id="followButton"
                                            onClick={() => addFollow(photographer.id)}
                                        >
                                            {followText}
                                        </button>
                                        <div className="dropdown">
                                            <button className="btn-more-options" data-bs-toggle="dropdown">
                                                <MoreHorizontal size={20} />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 pixora-dropdown">
                                                <li>
                                                    <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={() => openModal('report_user')}>
                                                        <Flag size={14} />
                                                        <span>Report User</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-3 mb-3">
                                        <button
                                            type="button"
                                            className="followButton btn"
                                            id="followButton"
                                            onClick={() => navigate(`/user/${user?.username}/myprofile`)}
                                        >
                                            View profile
                                        </button>
                                    </div>
                                )}
                            </div>


                            <div className="container-fluid">
                                <div className="mb-3">
                                    {isLoading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos?.length > 0 ? (
                                        <PhotosTemplate photos={photos.slice(0, visible)} />
                                    ) : user?.role === "user" ? (<EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />) : (<EmptyContent icon={<FaBan className="faIcon" />} text={"Upload is not availabe for adminstrators"} />)}
                                </div>
                                {user?.role === "user" && photos?.length > visible && (<button className='btn btn-link' onClick={showMoreItems} style={{ textDecoration: "underline" }}>
                                    Show more
                                </button>)}
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