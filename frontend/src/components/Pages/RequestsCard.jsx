import React from 'react'
import { FaArrowRight, FaDownload, FaUpload } from 'react-icons/fa'

const RequestsCard = ({ r, handleAccept,downloadImage,uploadResAction }) => {
    return (
        <div className="editor-task-card" key={r?.id}>
            <div className="image-container">
                <img src={`http://localhost:8000/storage/photos/${r?.edition_requests?.photo?.filename}`} alt="Original" />
                <span className='badge'>New Request</span>
            </div>

            <div className="card-content">
                <div className="user-info">
                    <img src={r?.user?.photo_profile ? `http://localhost:8000/storage/profile_pictures/${r?.user?.photo_profile}` : '/outils/pngs/useracc2.png'} className='avatar' alt="Avatar" />
                    <span>{r?.user?.username}</span>
                </div>
                <p className='message'>{r?.edition_requests?.message}</p>
                <div className={`badge mb-2 badge-${r?.status}`}>
                    <span>{r?.status}</span>
                </div>

                {
                    r?.status === "pending" ? (<button className="btn-process" onClick={() => handleAccept(r.id, r.edition_requests?.id)}>
                        <span>Process Edit</span>
                        <FaArrowRight />
                    </button>) : r?.status === "in_progress" && (<div className='action-group animated-fade-in'>
                        <button className='btn-action btn-download' onClick={() => downloadImage(r?.edition_requests?.photo?.id)}>
                            <FaDownload />
                            <span>Download Original</span>
                        </button>
                        <button className='btn-action btn-upload' onClick={() => uploadResAction(r?.id, r?.edition_requests?.photo?.id, r?.edition_requests?.photo?.user_id, r?.requester_id, r?.request_id)}>
                            <FaUpload />
                            <span>Upload Result</span>
                            <input type="file" hidden />
                        </button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default RequestsCard