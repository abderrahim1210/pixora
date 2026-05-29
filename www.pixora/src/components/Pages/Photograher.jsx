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
import GalleriesTemplate from './Templates/GalleriesTemplate'
import Tooltip from '../Overlays/Tooltip'
import moment from 'moment'
import { FollowListe } from './FollowListe'
import { FollowButton } from './FollowButton'
import { MergeModalFollows } from './MergeModalFollows'
const Photograher = () => {
    const { id } = useParams();
    const { show, openModal, closeModal } = useModal();
    const [visible, setVisible] = useState(8);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [followers, setFollowers] = useState(0);

    const showMoreItems = () => {
        setVisible((prev) => prev + 8);
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
    const galleries = data?.galleries || [];

    useEffect(() => {
        if (data?.statistics) {
            setFollowers(data?.statistics?.followers || 0);
        }
    }, [data]);

    useEffect(() => {
        closeModal();
    }, [id]);

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
                (show === 'followers' || show === 'followings') && (
                    <MergeModalFollows key={`${photographer?.id}-${show}`} show={show} closeModal={closeModal} id={photographer?.id} type={show} />
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
                                    <Tooltip text={`Account created at : ${moment(photographer?.created_at).fromNow()} | Last updated : ${moment(photographer?.updated_at).fromNow()}`}>
                                        <p className="mb-1">@{photographer?.email}</p>
                                    </Tooltip>
                                </div>
                                <div>
                                    <p>{user?.bio}</p>
                                </div>
                            </div>
                            <div className="container statistic_profile">
                                <div>{followers ?? 0} <Link className='follow-list-links' onClick={() => openModal('followers')}>Followers</Link></div>
                                <div>{statistics?.followings ?? 0} <Link className='follow-list-links' onClick={() => openModal('followings')}>Followings</Link></div>
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
                                <div className="profile-actions-wrapper d-flex align-items-center gap-2 mt-3">
                                    <FollowButton user_id={photographer?.id} />
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
                            </div>


                            <div className="container-fluid">


                                <div className={galleries?.length > 0 ? 'row' : ''}>
                                    <div className='col-lg-8 col-12'>
                                        {isLoading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} />) : photos?.length > 0 ? (
                                            <>
                                                <PhotosTemplate photos={photos.slice(0, visible)} />
                                                {user?.role === "user" && photos?.length > visible && (<button className='btn btn-link' onClick={showMoreItems} style={{ textDecoration: "underline" }}>
                                                    Show more
                                                </button>)}
                                            </>
                                        ) : user?.role === "user" ? (<EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />) : (<EmptyContent icon={<FaBan className="faIcon" />} text={"Upload is not availabe for adminstrators"} />)}

                                    </div>

                                    {
                                        galleries?.length > 0 && (
                                            <div className="col-lg-4 col-12 galleries-photographer">
                                                <h4 className='fw-bold'>Galleries</h4>
                                                <GalleriesTemplate galleries={galleries} />
                                            </div>
                                        )
                                    }
                                </div>
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