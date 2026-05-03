import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaCommentAlt,
  FaCommentDollar,
  FaComments,
  FaCopy,
  FaEllipsisV,
  FaFlag,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import { FaPencil } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { Dropdown, Spinner } from "react-bootstrap";
import axios from "axios";
import copy from 'copy-to-clipboard';
import { EmptyContent } from './EmptyContent'
import { notyf } from "../../assets/js/notyf";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useModal } from "../context/ModalProvider";
import ModalTemplate from "./ModalTemplate";
import CommentItem from "./CommentItem";
import Report from "./Report";
const Comments = ({ photoId, data, commentRef }) => {
  const { user } = useAuth();
  const { show, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [localComments, setLocalComments] = useState(data);
  const firstComments = localComments.slice(0, 3);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleReset = () => {
    setIsEditing(false);
  }

  const handleCopy = (text) => {
    copy(text);
    notyf.open({
      type: 'info',
      message: 'Comment copied successfully'
    });
  }

  useEffect(() => {
    setLocalComments(data);
  }, [data]);

  const handleComment = async () => {
    try {
      const res = await axios.post('https://api.pixora.test/comments/store', { photo_id: photoId, comment: comment }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        notyf.success(res.data.message);
        // setComments(prev => [res.data.comment, ...prev]);
        setLocalComments(prev => [res.data.comment, ...prev]);
        setComment('');
      } else {
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  const handleUpComment = async (commentId, newContent) => {
    const url = `https://api.pixora.test/comments/${commentId}`;
    const oldComments = [...localComments];

    setLocalComments(prev => prev.map(c => c.id === commentId ? { ...c, content: newContent, edited: true } : c));
    setLoadingId(commentId);
    try {
      const res = await axios.put(url, { photo_id: photoId, content: newContent, comment_id: commentId }, { withCredentials: true, withXSRFToken: true });
      if (res.data.success) {
        notyf.success(res.data.message);
      } else {
        notyf.error(res.data.message);
      }
    } catch (err) {
      setLocalComments(oldComments);
      console.log(err.response?.data);
    } finally {
      setLoadingId(null);
    }
  }

  const handleDelComment = async (commentId) => {
    const url = `https://api.pixora.test/comments/${commentId}`;
    const oldComments = [...localComments];
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
        setLocalComments(prev => prev.filter(c => c.id !== commentId));
        try {
          const res = await axios.delete(url, { data: { comment_id: commentId, user_id: user, photo_id: photoId }, withCredentials: true, withXSRFToken: true });
          if (res.data.success) {
            notyf.success(res.data.message);
          } else {
            setLocalComments(oldComments);
            notyf.error(res.data.message);
          }
        } catch (err) {
          setLocalComments(oldComments);
          console.log(err.response?.data);
        }
      }
    })
  }
  return (
    <div data-bs-page="comments">
      {
        show === "comments" && (
          <ModalTemplate show={show} closeModal={closeModal}>
            <h5 className="fw-bold">Comments</h5>
            {
              localComments?.map((c) => (
                <CommentItem key={c.id} c={c} isEditing={isEditing} user={user} setIsEditing={setIsEditing}
                  editComment={editComment}
                  setEditComment={setEditComment}
                  handleUpComment={handleUpComment}
                  handleDelComment={handleDelComment}
                  handleCopy={handleCopy}
                  openModal={openModal}
                  loadingId={loadingId}
                  show={show}
                  closeModal={closeModal}
                />
              ))
            }
          </ModalTemplate>
        )
      }

      
      <div className="comments">
        <h5>Comments</h5>
        <div
          className="comment-form"
        >
          <div className="input-group">
            <textarea
              id="up_comment"
              ref={commentRef}
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
        <ul className="comments-list mt-4">
          {firstComments?.length > 0 ? (
            firstComments.map((c) => (
              <CommentItem key={c.id} c={c} isEditing={isEditing} user={user} setIsEditing={setIsEditing}
                editComment={editComment}
                setEditComment={setEditComment}
                handleUpComment={handleUpComment}
                handleDelComment={handleDelComment}
                handleCopy={handleCopy}
                loadingId={loadingId}
                openModal={openModal}
                show={show}
                closeModal={closeModal}
              />
            ))
          ) : (
            <EmptyContent icon={<FaComments className="faIcon" />} text={"No comments yet — be the first to comment!"} />
          )}
        </ul>
        {
          localComments.length > 0 && (<div className="text-center"><button className="btn show-more" onClick={() => openModal('comments')}>Show more</button></div>)
        }
      </div>
    </div>
  );
};

export default Comments;
