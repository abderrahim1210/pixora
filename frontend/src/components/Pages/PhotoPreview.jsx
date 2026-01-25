import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { FiCalendar, FiCommand, FiHeart, FiImage, FiTag, FiUser } from "react-icons/fi";
import { FaCalendar, FaComment, FaCommentAlt, FaHeart, FaShare, FaTag, FaUser } from "react-icons/fa";
import { FaLocationDot, FaPhotoFilm } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import Swal from 'sweetalert2';
import LightBox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: "right",
    y: "top",
  }
});

export const PhotoPreview = (props) => {
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
        console.log(res.data);
      }else{
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
              <h4>{photo.title}</h4>
            </li>
            <li>
              <p>{photo.description}</p>
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
                  className="btn btn-primary"
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
};
