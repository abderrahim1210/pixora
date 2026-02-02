import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { FiCalendar, FiCommand, FiHeart, FiImage, FiTag, FiUser } from "react-icons/fi";
import { FaCalendar, FaCheck, FaCircle, FaComment, FaCommentAlt, FaHeart, FaShare, FaSync, FaTag, FaUser } from "react-icons/fa";
import { FaLocationDot, FaPencil, FaPhotoFilm } from "react-icons/fa6";
import { useParams } from "react-router-dom";
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
// import { Select } from "react-select";

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
    const [cities,setCities] = useState(null);
    const { user } = useAuth();
    const isUser = user.username === photo.username;
    const { fields, isEdit, dirty } = useSelector(state => state.photo);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost/Pixora/backend/api/photoPreview.php", { params: { id }, withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    setPhoto(res.data.photo);
                    setCategory(res.data.category);
                    setLikes(res.data.likes);
                    setComments(res.data.comments);
                    setUserID(res.data.currUser);
                    setCategories(res.data.categories);
                }
            }).catch(err => {
                console.error(err);
            });
    }, [id]);
    // console.log(category)
    const handleLike = async (photoid) => {
        try {
            const res = await axios.post("http://localhost/Pixora/backend/api/add_like.php", { photo_id: photoid }, { withCredentials: true });
            if (res.data.success) {
                setPhoto((prevPhoto) =>
                    ({ ...prevPhoto, isLiked: !prevPhoto.isLiked, totalLikes: res.data.totalLikes })
                );
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleComment = async () => {
        try {
            const res = await axios.post('http://localhost/Pixora/backend/api/add_comments.php', { photo_id: id, comment: comment }, { withCredentials: true });
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
    useEffect(() => {
        try{
            axios.get('http://localhost/Pixora/frontend/public/json/countries+cities.json')
        .then(res => res.data)
        .then(data => setCities(data));
        }catch(err){
            console.log(err);
        }
    },[]);
    const handleEdit = async (data) => {
        try {
            const res = await axios.post('http://localhost/Pixora/backend/api/edit_photo.php', { photo_id: photo.photo_id, title: fields?.title, description: fields?.description, location: fields?.location, category_id: fields?.category_id }, { withCredentials: true });
            if (res.data.success) {
                notyf.success(res.data.message);
                dispatch(initEdit(data))
            } else {
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
                        slides={[{ src: `/photos/${photo.filename}`, title: photo.title }]}
                        plugins={[Zoom]}
                        carousel={{
                            arrows: false
                        }}
                    />
                    <img
                        src={`/photos/${photo.filename}`}
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
                            <input type="hidden" name="photo_id" defaultValue={photo.id} />
                            <a className={`likeButton ${photo.isLiked ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => handleLike(photo.photo_id)} data-photo-id={photo.id}>
                                {photo.isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
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
                                {isUser && (<button className="btn p-0" onClick={() => dispatch(toggleEdit("title"))}>{!isEdit.title ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                        </li>
                        <li>
                            {isEdit.description ? (<div><textarea name="description" className="form-control" rows={1} value={fields.description} onChange={(e) => dispatch(updateField({ field: "description", value: e.target.value }))} /></div>) : <Truncate text={photo.description} maxLines={3}>
                                {({ text, open, toggle, showMore, className, style }) => (
                                    <div><p className={className} style={style}>{text}</p>{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</div>
                                )}
                            </Truncate>}
                            <div className="d-flex justify-content-end">
                                {isUser && (<button className="btn p-0" onClick={() => dispatch(toggleEdit("description"))}>{!isEdit.description ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                        </li>
                        <li>
                            <FaCalendar />
                            <p>{photo.upload_date}</p>
                        </li>
                        <li>
                            <FaUser />
                            <p>{photo.username}
                                <a href="#" />
                            </p>
                        </li>
                        <li>
                            <FaTag />
                            {isEdit.category ? (<div><select className="form-select" value={fields.category_id} onChange={(e) => dispatch(updateField({ field: "category_id", value: Number(e.target.value) }))} name="category">
                                {
                                    categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))
                                }
                            </select> </div>) : <p>{categories.find(c => c.id === fields.category_id)?.name || "Unknown"}</p>}
                            <div className="d-flex justify-content-end">
                                {isUser && (<button className="btn p-0" onClick={() => dispatch(toggleEdit("category"))}>{isEdit.category ? (<FaCheck />) : (<FaPencil />)}</button>)}
                            </div>
                        </li>
                        <li>
                            <FaHeart />
                            <p>{likes} Likes</p>
                        </li>
                        <li>
                            <FaComment />
                            <p></p>
                        </li>
                        <li>
                            <FiImage />
                            <p>...</p>
                        </li>
                        <li>
                            <FaLocationDot />
                            {isEdit.location ? (<div><input name="location" type="text" className="form-control" value={fields.location} onChange={(e) => dispatch(updateField({ field: "location", value: e.target.value }))} /></div>) : (<p>{photo.location}</p>)}
                            <div className="d-flex justify-content-end">
                                {user.username === photo.username && (<button className="btn" onClick={() => dispatch(toggleEdit("location"))}>{!isEdit.location ? (<FaPencil />) : (<FaCheck />)}</button>)}
                            </div>
                            {/* <Select /> */}
                        </li>
                        <li>
                            <FaPhotoFilm />
                            <p>...</p>
                        </li>
                        <div className="d-flex justify-content-end align-items-center mb-2">
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
                        </div>
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
