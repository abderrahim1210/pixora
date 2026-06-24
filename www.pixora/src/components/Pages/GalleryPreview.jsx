import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { EmptyContent } from './EmptyContent';
import { MdPhotoAlbum } from 'react-icons/md';
import PhotosTemplate from './Templates/PhotosTemplate';
import { FaPencil, FaPhotoFilm } from 'react-icons/fa6';
import PageSkeleton from './PageSkeleton';
import { Truncate } from './Truncate';
import { FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { Calendar, ChevronDown, ImageIcon, Loader2, Trash2, User } from 'lucide-react';

const GalleryPreview = () => {
    const { id } = useParams();
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [dirty, setDirty] = useState(false);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(4);
    const [isEdit, setIsEdit] = useState({
        title: "",
        description: ""
    });

    const handleShowMore = () => {
        setVisible(prev => prev + 4);
    }
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const url = `https://api.pixora.test/get_gallery/${id}`;
                const res = await axios.get(url, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    setGallery(res.data.gallery);
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            } catch (err) {
                setLoading(true);
                console.log(err.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
    }, [id]);

    const edit = () => {
        return setDirty(true);
    }

    const deleteGallery = () => {
        Swal.fire({
            title: 'Delete gallery',
            text: 'Are you sure for delete this gallery ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , delete it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`https://api.pixora.test/delete_gallery/${id}`, { withCredentials: true, withXSRFToken: true });
                    console.log(res.data);
                    if (res.data.success) {
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err.response?.data);
                } finally {
                    if (user?.role === 'admin'){
                        return navigate('/galleries');
                    }else{
                        return navigate(`/user/${user.username}/myphotos`);
                    }
                }
            }
        })
    }

    function slugiFy(text) {
        return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }
    return (
        <div data-bs-page='gallery'>
            <Navbar />
            {
                loading ? (<PageSkeleton page={"gallery"} />) : (<div className="gallery-container">
                    {
                        gallery ? (
                            <>
                                <div className="gallery-container py-5">
                                    <header className="gallery-header-glass p-4 p-md-5 mb-5">
                                        <div className="header-content d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
                                            <div className="text-section">
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <span className="badge-category">Collection</span>
                                                    <span className="dot-separator"></span>
                                                    <span className="photo-count"><ImageIcon size={14} /> {gallery?.photos?.length || 0} Photos</span>
                                                </div>
                                                <h1 className="gallery-title-large">{gallery?.title}</h1>
                                                <p className="gallery-description-text">{gallery?.description || "No description provided for this collection."}</p>

                                                <div className="meta-info d-flex gap-4 mt-4">
                                                    <div className="meta-item">
                                                        <User size={16} className="text-primary" />
                                                        <Link style={{textDecoration:'none'}} to={`/photographer/${gallery?.user?.id}`}>{gallery?.user?.username || 'Anonymous'}</Link>
                                                    </div>
                                                    <div className="meta-item">
                                                        <Calendar size={16} className="text-primary" />
                                                        <span>April 2026</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                user?.id === gallery?.user_id || user?.role === 'admin' && (
                                                    <div className="action-section">
                                                        <button className="btn-delete-minimal" title="Delete Gallery" onClick={deleteGallery}>
                                                            <Trash2 size={20} />
                                                            <span>Delete Collection</span>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </header>

                                    <main className="gallery-masonry-grid">
                                        {gallery?.photos?.slice(0, visible)?.map((photo) => (
                                            <div key={photo.id} className="photo-card-wrapper">
                                                <img
                                                    src={photo.filename}
                                                    alt={photo.title}
                                                    className="photo-img"
                                                />
                                                <div className="photo-hover-overlay">
                                                    <h6 className="m-0 mb-2">{photo.title || 'Untitled'}</h6>
                                                    <Link to={`/photo/${photo.id}/${slugiFy(photo.title)}`} style={{ textDecoration: 'none' }} className="btn-view">View</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </main>
                                    {
                                        gallery?.photos?.length > visible && (
                                            <div className="show-more-container d-flex justify-content-center my-5">
                                                <button
                                                    className={`btn-pixora-more ${loading ? 'loading' : ''}`}
                                                    onClick={handleShowMore}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <Loader2 size={20} className="spinner-icon" />
                                                    ) : (
                                                        <>
                                                            <span>Discover More</span>
                                                            <ChevronDown size={20} className="arrow-icon" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <EmptyContent icon={<MdPhotoAlbum className='faIcon' />} text={"No galleries yet — create your first one!"} />
                        )
                    }
                </div>)
            }
            <div>
                <Footer type={'footer'} />
            </div>
        </div>
    )
}

export default GalleryPreview