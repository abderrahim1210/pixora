import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { EmptyContent } from './EmptyContent';
import { MdPhotoAlbum } from 'react-icons/md';
import PhotosTemplate from './PhotosTemplate';
import { FaPencil } from 'react-icons/fa6';
import PageSkeleton from './PageSkeleton';
import { Truncate } from './Truncate';
import { FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const GalleryPreview = () => {
    const { id } = useParams();
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [dirty, setDirty] = useState(false);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState({
        title: false,
        description: false
    });
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const url = `http://localhost:8000/get_gallery/${id}`;
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
                    const res = await axios.delete(`http://localhost:8000/delete_gallery/${gallery?.id}`, { withCredentials: true, withXSRFToken: true });
                    console.log(res.data);
                    if (res.data.success) {
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err.response?.data);
                } finally {
                    return navigate(`/${user.username}/myphotos`);
                }
            }
        })
    }
    return (
        <div data-bs-page='gallery'>
            <Navbar />
            {
                loading ? (<PageSkeleton page={"gallery"} />) : (<div className="gallery-container">
                    {
                        gallery ? (
                            <>
                                <div className="gallery-header">
                                    <div>
                                        {isEdit.title ? (<input type='text' value={gallery?.title} className='form-control' />) : (<Truncate text={gallery?.title}>
                                            {({ text, open, toggle, showMore, className, style }) => (
                                                <div><h1 className={className} style={style}>{text}</h1>{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</div>
                                            )}
                                        </Truncate>)}
                                        {user?.id === gallery?.user_id && (<a className='gallery-header-icon' style={{ cursor: 'pointer' }} onClick={() => { setIsEdit(prev => ({ ...prev, title: !isEdit.title })); edit() }}>{!isEdit.title ? (<FaPencil />) : (<FaCheck />)}</a>)}
                                    </div>
                                    <div>
                                        {isEdit.description ? (<textarea rows={1} value={gallery?.description} className='form-control' />) : (<Truncate text={gallery?.description}>
                                            {({ text, open, toggle, showMore, className, style }) => (
                                                <div><p className={className} style={style}>{text}</p>{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</div>
                                            )}
                                        </Truncate>)}
                                        {user?.id === gallery?.user_id && (<a className='gallery-header-icon' style={{ cursor: 'pointer' }} onClick={() => { setIsEdit(prev => ({ ...prev, description: !isEdit.description })); edit() }}>{!isEdit.description ? (<FaPencil />) : (<FaCheck />)}</a>)}
                                    </div>
                                    <div className='floating-actions'>
                                        {
                                            dirty && (
                                                <div><button className='save-changes'>Save changes</button></div>
                                            )
                                        }
                                        <div><button className='delete-gallery' onClick={deleteGallery}>Delete gallery</button></div>
                                    </div>
                                </div>

                                <div className='photos-grid'>
                                    {
                                        gallery?.photos.length > 0 && (<PhotosTemplate photos={gallery.photos} />)
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