import React from 'react'
import { Dropdown, Spinner } from 'react-bootstrap';
import { FaCheck, FaCopy, FaEllipsisV, FaFlag, FaTimes, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const CommentItem = ({ c,
  user,
  isEditing,
  setIsEditing,
  editComment,
  setEditComment,
  handleUpComment,
  handleDelComment,
  handleCopy,
  loadingId}) => {
    return (
        <li data-bs-page='comments' className="comment-item" key={c.id}>
            <img
                src={
                    c.user.photo_profile
                        ? `/profile_pictures/${c.user.photo_profile}`
                        : "/outils/pngs/useracc2.png"
                }
                alt={c.user.username}
                className="comment-avatar"
            />
            <div className="comment-body d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="comment-author">
                        {c.user.username}
                        {c.edited && <small>{"Edited"}</small>}
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
                                    onChange={(e) => setEditComment(e.target.value)}
                                    defaultValue={c.content}
                                />
                            </div>
                        </div>
                    )}
                    <span className="comment-date">{c.created_at_human}</span>
                </div>
                <div className="postition-relative">
                    {isEditing === c.id && (<><button className="saveChange btn p-1" disabled={loadingId === c.id} onClick={async () => {
                        handleUpComment(c.id, editComment);
                        setIsEditing(null)
                    }
                    }>
                        {loadingId === c.id ? (<Spinner />) : (<FaCheck />)}
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
                                {c.user_id === user.id ? (
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
                                        {
                                            user?.role === "admin" && (
                                                <Dropdown.Item onClick={() => handleDelComment(c.id)}>
                                                    <FaTrash /> Delete
                                                </Dropdown.Item>
                                            )
                                        }
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>)}
                </div>
            </div>
        </li>

    )
}

export default CommentItem