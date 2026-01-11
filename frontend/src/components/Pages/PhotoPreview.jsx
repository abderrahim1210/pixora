import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { FiCalendar, FiCommand, FiHeart, FiImage, FiTag, FiUser } from "react-icons/fi";
import { FaCalendar, FaComment, FaCommentAlt, FaHeart, FaShare, FaTag, FaUser } from "react-icons/fa";
import { FaLocationDot, FaPhotoFilm } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";

export const PhotoPreview = () => {
  const {id} = useParams();
  const [photo,setPhoto] = useState({});
  const [category,setCategory] = useState({});
  const [likes,setLikes] = useState("");
  const [comments,setComments] = useState([]);
  const [userId,setUserID] = useState();
  useEffect(() => {
    axios.get("http://localhost/Pixora/backend/api/photoPreview.php",{params:{id},withCredentials:true})
    .then((res) => {
      if(res.data.success){
        setPhoto(res.data.photo);
        setCategory(res.data.category);
        setLikes(res.data.likes);
        setComments(res.data.comments);
        setUserID(res.data.currUser);
      }
    }).catch(err => {
      console.error(err);
    });
  },[id]);
  return (
    <div data-bs-page="photo">
      <Navbar />
      <div className="container-fluid photo-page mt-3 mb-3">
        <div className="photo-viewer">
          <img
            src={`/photos/${photo.filename}`}
            onContextMenu={(e) => e.preventDefault()}
            width="100%"
            className="img-fluid"
            alt={photo.title}
          />
        </div>
        <div className="details-panel">
          <div className="socialActions">
            <div>
              <input type="hidden" name="photo_id" defaultValue="" />
              <a href="#" className="likeButton " data-photo-id="">
                <FiHeart />
                {/* <span id="likes_count-"></span> */}
              </a>
            </div>
            <div>
              <a id="commentButton">
                <FaComment />
              </a>
            </div>
            <div>
              <a href="#" id="shareButton">
                <FaShare />
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
            <form
              action="add_comments.php"
              className="comment-form"
              method="post"
            >
              <div className="input-group">
                <textarea
                  id="up_comment"
                  name="comment_content"
                  placeholder="Type your comment ..."
                  className="form-control"
                  rows={1}
                  cols={1}
                  defaultValue={""}
                />
                <input type="hidden" name="photo_id" defaultValue="" />
                <button
                  type="submit"
                  className="btn btn-primary disabled"
                  id="postBtn"
                >
                  Post
                </button>
              </div>
            </form>
            <Comments data={comments} currUser={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
