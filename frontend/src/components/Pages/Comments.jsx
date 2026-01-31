import React, { useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaEllipsisV,
  FaFlag,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import copy from 'copy-to-clipboard';
// import { Notyf } from 'notyf';
// import 'notyf/notyf.min.css';
// const notyf = new Notyf({
//   duration: 4000,
//   position: {
//     x: "right",
//     y: "top",
//   }
// });
import { notyf } from "../../assets/js/notyf";
const Comments = (props) => {
  const comments = props.data;
  const currUser = props.currUser;
  const [isEditing, setIsEditing] = useState(null);
  const [comment, setComment] = useState("");
  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleReset = () => {
    setIsEditing(false);
  }

  const handleCopy = (text) => {
    copy(text);
    // Swal.fire({
    //   icon: "success",
    //   title: "Comment copied!",
    //   text: "Comment copied successfully",
    //   timer: 2000,
    //   showConfirmButton: false,
    // });
    notyf.success('Comment copied successfully');
  }

  const handleUpComment = async (commentId, newContent) => {
    try {
      const res = await axios.post('http://localhost/Pixora/backend/api/update_comment.php', { photo_id: props.photoId, content: newContent, comment_id: commentId }, { withCredentials: true });
      if (res.data.success) {
        /* Swal.fire({
          icon: "success",
          title: "Updated!",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false,
        }); */
        notyf.success(res.data.message);
      } else {
        /* Swal.fire({
          icon: "error",
          title: "Error!",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false,
        }); */
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelComment = async (commentId) => {
    try {
      const res = await axios.delete('http://localhost/Pixora/backend/api/delete_comment.php', { data: { comment_id: commentId, user_id: currUser, photo_id: props.photoId }, withCredentials: true });
      if (res.data.success) {
        /* Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false,
        }); */
        notyf.success(res.data.message);
      } else {
        /* Swal.fire({
          icon: "error",
          title: "Error!",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false,
        }); */
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div data-bs-page="comments">
      <ul className="comments-list mt-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li className="comment-item" key={c.id}>
              <img
                src={
                  c.photo_profile
                    ? `/profile_pictures/${c.photo_profile}`
                    : "/outils/pngs/useracc2.png"
                }
                alt={c.username}
                className="comment-avatar"
              />
              <div className="comment-body d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="comment-author">
                    {c.username}
                    {c.updated_at && <small>{"Edited"}</small>}
                  </h6>
                  {isEditing !== c.id && (<div className="display-div">
                    <p className="comment-text">{c.content}</p>
                  </div>)}
                  {isEditing === c.id && (
                    <div className="edit-div">
                      <div
                        className="upCommentForm"
                      >
                        <textarea
                          name="comment_content"
                          className="form-control mt-1"
                          rows={1}
                          onChange={(e) => setComment(e.target.value)}
                          defaultValue={c.content}
                        // value={comment}
                        />
                      </div>
                    </div>
                  )}
                  <span className="comment-date">{c.created_at}</span>
                </div>
                <div className="postition-relative">
                  {isEditing === c.id && (<><button className="saveChange btn p-1" onClick={() => {
                    handleUpComment(c.id, comment);
                    setIsEditing(null)
                  }
                  }>
                    <FaCheck />
                  </button>
                    <button className="resetChange btn p-1 text-danger" onClick={() => setIsEditing(null)}>
                      <FaTimes />
                    </button></>)}
                  {isEditing !== c.id && (
                    <Dropdown className="drp">
                      <Dropdown.Toggle as={"button"} variant="body" id={`dropdown-${c.id}`} className="drpToggle btn p-0">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="drpMenu">
                        {c.user_id === currUser ? (
                          <>
                            <Dropdown.Item onClick={() => setIsEditing(c.id)}>
                              <FaPencil /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCopy(c.content)}>
                              <FaCopy /> Copy
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelComment(c.id)}>
                              <FaTrash /> Delete
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item onClick={() => handleCopy(c.content)}>
                              <FaCopy /> Copy
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaFlag /> Report
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>)}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="mt-2 mb-2 text-center">
            <i
              style={{
                opacity: "calc(0.8)",
                color: "#444",
                fontSize: "medium",
              }}
            >
              No comments yet — be the first to comment!
            </i>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Comments;
