import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { FiCalendar, FiCommand, FiHeart, FiImage, FiTag, FiUser } from "react-icons/fi";
import { FaCalendar, FaCheck, FaCheckCircle, FaCircle, FaClock, FaComment, FaCommentAlt, FaHeart, FaLayerGroup, FaLock, FaLockOpen, FaShare, FaSync, FaTag, FaUser } from "react-icons/fa";
import { FaLocationDot, FaPencil, FaPhotoFilm, FaX } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initEdit, toggleEdit, updateField } from "../Store/photoSlice";
import axios from "axios";
import Comments from "./Comments";

import LightBox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { Truncate } from "./Truncate";
import { useAuth } from "../context/AuthProvider";
import { notyf } from '../../assets/js/notyf';
import Swal from "sweetalert2";
// import {Select} from "@headlessui/react";
import AsyncSelect from "react-select/async";

export const Photo = (props) => {
    const { id } = useParams();
    const [photo, setPhoto] = useState({});
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [likes, setLikes] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [userId, setUserID] = useState();
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const { user } = useAuth();
    const [liked,setLiked] = useState(photo.isLiked);
    const isUser = user?.username === photo.username;
    const { fields, isEdit, dirty } = useSelector(state => state.photo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = `http://localhost:8000/photo/${id}`;
    useEffect(() => {
        axios.get(url, { params: { id }, withCredentials: true})
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setPhoto(res.data.photo);
                    setCategory(res.data.category);
                    setLikes(res.data.likes);
                    setComments(res.data.comments);
                    setUserID(res.data.currUser);
                    setCategories(res.data.categories);
                }
            }).catch(err => {
                console.log(err.response.data.message);
            });
    }, [id]);
    // console.log(category)
    const handleLike = async (photoid) => {
        try {
            const oldLiked = liked;
            setLiked(!liked);
            const res = await axios.post("http://localhost:8000/add_like", { photo_id: photoid }, { withCredentials: true, withXSRFToken:true });
            if (res.data.success) {
                setPhoto((prevPhoto) =>
                    ({ ...prevPhoto, isLiked: !prevPhoto.isLiked, totalLikes: res.data.totalLikes })
                );
            }
        } catch (err) {
            console.log(err.response?.data);
            setLiked(oldLiked);
        }
    }
    const handleComment = async () => {
        try {
            const res = await axios.post('http://localhost:8000/comments/store', { photo_id: id, comment: comment }, { withCredentials: true, withXSRFToken:true });
            if (res.data.success) {
                notyf.success(res.data.message);
            } else {
                notyf.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (photo) {
            dispatch(initEdit({
                title: photo.title,
                description: photo.description,
                category_id: photo.category_id,
                location: photo.location
            }));
        }
    }, [photo, category]);

    const deletePhoto = () => {
        Swal.fire({
            title: 'Delete photo',
            text: 'Are you sure for delete this photo ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , delete it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete('http://localhost/Pixora/backend/api/photo_system.php', { withCredentials: true, data: { photo_id: id } });
                    console.log(res.data);
                    if (res.data.success) {
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    return navigate(`/${user.username}/myprofile`);
                }
            }
        })
    }

    // useEffect(() => {
    //     try {
    //         axios.get('/json/countries+cities.json')
    //             .then(res => {
    //                 const allCities = [];
    //                 res.data.forEach(country => {
    //                     country.cities.forEach(city => {
    //                         allCities.push({ value: city, label: city });
    //                     });
    //                 });
    //                 setCities(allCities);
    //             });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);
    const loadCities = (inputValue, callback) => {
        if (!inputValue){
            callback([]);
            return;
        }
        const results = cities
        .filter(city => city.label.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0,20);
        callback(results);
    }
    const handleEdit = async (data) => {
        try {
            const res = await axios.post('http://localhost/Pixora/backend/api/photoPreview.php', { photo_id: photo.photo_id, title: fields?.title, description: fields?.description, location: fields?.location, category_id: fields?.category_id }, { withCredentials: true });
            if (res.data.success) {
                console.log(res.data);
                dispatch(initEdit(data))
                notyf.success(res.data.message);
            } else {
                console.log(res.data)
                notyf.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div data-bs-page="photo">
            <Navbar data={props.data} />
            <div className="container-fluid photo-page mt-3 mb-3">
                <div className="photo-viewer">
                    <LightBox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[{ src: `http://localhost:8000/storage/photos/${photo.filename}`, title: photo.title }]}
                        plugins={[Zoom]}
                        carousel={{
                            arrows: false
                        }}
                    />
                    <img
                        src={`http://localhost:8000/storage/photos/${photo.filename}`}
                        loading="lazy"
                        decoding="async" 
                        onContextMenu={(e) => e.preventDefault()}
                        width="100%"
                        className="img-fluid"
                        alt={photo.title}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpen(true);
                        }
                        }
                    />
                </div>
                <div className="details-panel">
                    <div className="socialActions">
                        <div>
                            {/* <input type="hidden" name="photo_id" defaultValue={photo.id} /> */}
                            <a className={`likeButton ${liked || photo.isLiked ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => handleLike(photo.id)} data-photo-id={photo.id}>
                                {liked || photo.isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
                            </a>
                        </div>
                        <div>
                            <a id="commentButton" style={{ cursor: "pointer" }}>
                                <FaComment size={20} />
                            </a>
                        </div>
                        <div>
                            <a href="#" id="shareButton">
                                <FaShare size={20} />
                            </a>
                        </div>
                    </div>
                    <ul className="list-group mt-3">
                        <li>
                            {isEdit.title ? (<div><textarea rows={1} name="title" value={fields.title} onChange={(e) => dispatch(updateField({ field: "title", value: e.target.value }))} className="form-control" /></div>) : <Truncate text={photo.title} maxChars={50}>
                                {({ text, toggle, open, showMore }) => (
                                    <h4>{text}{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</h4>
                                )}
                            </Truncate>}
                            <div className="d-flex justify-content-end">
                                {isUser && (<button className="btn p-0 pencil-item" onClick={() => dispatch(toggleEdit("title"))}>{!isEdit.title ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                        </li>
                        <li>
                            {isEdit.description ? (<div><textarea name="description" className="form-control" rows={1} value={fields.description} onChange={(e) => dispatch(updateField({ field: "description", value: e.target.value }))} /></div>) : <Truncate text={photo.description} maxLines={3}>
                                {({ text, open, toggle, showMore, className, style }) => (
                                    <div><p className={className} style={style}>{text}</p>{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</div>
                                )}
                            </Truncate>}
                            <div className="d-flex justify-content-end">
                                {isUser && (<button className="btn pencil-item p-0" onClick={() => dispatch(toggleEdit("description"))}>{!isEdit.description ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                        </li>
                        <li>
                            <FaCalendar />
                            <p>{photo.created_at_human}</p>
                        </li>
                        <li>
                            <FaUser />
                            <p>{photo.user?.username}
                                <a href="#" />
                            </p>
                        </li>
                        <li>
                            <FaTag />
                            {isEdit.category ? (<div><select className="form-control" value={fields.category_id} onChange={(e) => dispatch(updateField({ field: "category_id", value: Number(e.target.value) }))} name="category">
                                {
                                    categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))
                                }
                            </select> </div>) : <p>{categories.find(c => c.id === fields.category_id)?.name || "Unknown"}</p>}
                            <div className="d-flex justify-content-end">
                                {isUser && (<button className="btn pencil-item p-0" onClick={() => dispatch(toggleEdit("category"))}>{isEdit.category ? (<FaCheck />) : (<FaPencil />)}</button>)}
                            </div>
                        </li>
                        <li>
                            <FaHeart />
                            <p>{likes} Likes</p>
                        </li>
                        <li>
                            <FaComment />
                            <p>{comments?.length ?? 0} Comments</p>
                        </li>
                        {
                            photo.type === "licensed" && (<li>
                                <FaLayerGroup />
                                <p className={`badge text-capitalize rounded-pill d-flex align-items-center gap-1 p-2 ${photo.status === "approved" ? "bg-success-subtle text-success" : photo.status === "pending" ? "bg-warning-subtle text-warning" : "bg-danger-subtle text-danger"}`}>
                                    {
                                        photo.status === "pending" ? <FaClock /> : photo.status === "approved" ? <FaCheckCircle /> : <FaX />
                                    }
                                    {photo.status}
                                </p>
                            </li>)
                        }
                        <li>
                            {
                                photo.type === "free" ? (<><FaLockOpen /><p>Free</p></>) : (<><FaLock /><p>Licensed</p></>)
                            }
                        </li>
                        <li>
                            <FiImage />
                            <p>...</p>
                        </li>
                        <li>
                            <FaLocationDot />
                            {isEdit.location ? (<div>
                                {/* <input name="location" type="text" className="form-control" value={fields.location} onChange={(e) => dispatch(updateField({ field: "location", value: e.target.value }))} /> */}
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions={cities.slice(0,20)}
                                    loadOptions={loadCities}
                                    value={cities.find(city => city.value === fields.location)}
                                    // value={fields.location}
                                    onChange={(option) => dispatch(updateField({ field: "location", value: option.value }))}
                                    placeholder='Type a city ...'
                                    noOptionsMessage={() => 'No city found'}
                                />
                            </div>) : (<p>{photo.location}</p>)}
                            <div className="d-flex justify-content-end">
                                {user?.username === photo.username && (<button className="btn p-0 pencil-item" onClick={() => dispatch(toggleEdit("location"))}>{!isEdit.location ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                            {/* <Select
                                options={cities}
                                value={cities.find(city => city.value === fields.location)}
                                onChange={(option) => {
                                    setSelectedCity(option);
                                    dispatch(updateField({ field: "location", value: option.value }));
                                }}
                                placeholder="Choose a city ..."
                                isSearchable
                            /> */}
                        </li>
                        <li>
                            <FaPhotoFilm />
                            <p>...</p>
                        </li>
                        {user?.username === photo.username && (<div className="d-flex justify-content-end align-items-center flex-column mb-2">
                            <button
                                type="reset"
                                className="btn tooltip-tab d-none"
                                id="resetInfos"
                                title="Reset all changes"
                            >
                                <FaSync />
                            </button>
                            <button
                                type="submit"
                                className={`btn w-100 mb-2 ${!dirty ? "disabled" : ""}`}
                                id="saveChangeBtn"
                                onClick={() => handleEdit(fields)}
                                disabled={!dirty}
                            >
                                Save changes
                            </button>
                            <button type="button" className="btn w-100" onClick={deletePhoto} id="deletePhoto">Delete</button>
                        </div>)}
                        {
                            user?.role === "admin" && (
                                <>
                                    <button type="button" className="btn w-100" onClick={deletePhoto} id="deletePhoto">Delete</button>
                                </>
                            )
                        }
                    </ul>
                    <div className="comments">
                        <h5>Comments</h5>
                        <div
                            className="comment-form"
                        >
                            <div className="input-group">
                                <textarea
                                    id="up_comment"
                                    name="comment_content"
                                    placeholder="Type your comment ..."
                                    className="form-control"
                                    rows={1}
                                    cols={1}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <input type="hidden" name="photo_id" defaultValue="" />
                                <button
                                    className={`btn btn-primary ${comment === "" ? "disabled" : ""}`}
                                    onClick={handleComment}
                                    id="postBtn"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                        <Comments data={comments} photoId={photo.photo_id} currUser={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
}
