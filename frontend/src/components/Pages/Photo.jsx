import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { FiCalendar, FiCommand, FiHeart, FiImage, FiTag, FiUser } from "react-icons/fi";
import { FaCalendar, FaComment, FaCommentAlt, FaHeart, FaShare, FaSync, FaTag, FaUser } from "react-icons/fa";
import { FaLocationDot, FaPhotoFilm } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";

import LightBox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Truncate } from "./Truncate";
const notyf = new Notyf({
    duration: 4000,
    position: {
        x: "right",
        y: "top",
    }
});

export const Photo = (props) => {
    const { id } = useParams();
    const [photo, setPhoto] = useState({});
    const [category, setCategory] = useState({});
    const [likes, setLikes] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [userId, setUserID] = useState();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        axios.get("http://localhost/Pixora/backend/api/photoPreview.php", { params: { id }, withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    setPhoto(res.data.photo);
                    setCategory(res.data.category);
                    setLikes(res.data.likes);
                    setComments(res.data.comments);
                    setUserID(res.data.currUser);
                }
            }).catch(err => {
                console.error(err);
            });
    }, [id]);
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
                            <Truncate text={photo.title} maxChars={50}>
                                {({text,toggle,open,showMore}) => (
                                    <h4>{text}{showMore && (<span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span>)}</h4>
                                )}
                            </Truncate>
                        </li>
                        <li className="d-flex flex-column gap-0">
                            <Truncate text={photo.description} maxLines={3}>
                                {({toggle,open,className,style}) => (
                                    <><p className={className} style={style}>{photo.description}</p><span className="showmore" onClick={toggle}>{open ? "Less" : "Show more"}</span></>
                                )}
                            </Truncate>
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
                            <p>{category.name}</p>
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
                            <p>{photo.location ?? "..."}</p>
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
                                className={"btn w-100 mb-2 disabled"}
                                id="saveChangeBtn"
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
