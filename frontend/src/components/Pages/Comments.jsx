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

  const handleUpComment = async (commentId,newContent) => {
    try {
      const res = await axios.post('http://localhost/Pixora/backend/api/update_comment.php', { photo_id: props.photoId, content: newContent ,comment_id: commentId }, { withCredentials: true });
      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
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
                          defaultValue={c.content}
                          // onChange={(e) => setComment(e.target.value)}
                        />
                        <input
                          type="hidden"
                          name="photo_id"
                          defaultValue={c.photo_id}
                        />
                        <input
                          type="hidden"
                          name="comment_id"
                          defaultValue={c.id}
                        />
                      </div>
                    </div>
                  )}
                  <span className="comment-date">{c.created_at}</span>
                </div>
                <div className="postition-relative">
                  {isEditing === c.id && (<><button className="saveChange btn p-1" onClick={() => {
                    const newContent = document.querySelector(`textarea[name="comment_content"]`).value;
                    handleUpComment(c.id,newContent);
                    setIsEditing(null)}
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
                            <Dropdown.Item>
                              <FaCopy /> Copy
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <div
                                className="delCommentForm"
                              >
                                <button className="btn p-0">
                                  <FaTrash /> Delete
                                </button>
                                <input
                                  type="hidden"
                                  name="photo_id"
                                  defaultValue=""
                                />
                                <input
                                  type="hidden"
                                  name="comment_id"
                                  defaultValue={c.id}
                                />
                              </div>
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item>
                              <button className="btn p-0">
                                <FaCopy /> Copy
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button className="btn p-0">
                                <FaFlag /> Report
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <div
                                className="delCommentForm"
                              >
                                <button className="btn p-0">
                                  <FaTrash /> Delete
                                </button>
                                <input
                                  type="hidden"
                                  name="photo_id"
                                  defaultValue=""
                                />
                                <input
                                  type="hidden"
                                  name="comment_id"
                                  defaultValue={c.id}
                                />
                              </div>
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
