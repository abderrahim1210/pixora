import React from 'react'
import { FaClock } from 'react-icons/fa'

const LatestRequests = ({ requests }) => {
    return (
        <div className="preview-list">
            {requests && requests.length > 0 ? (
                requests.map((req) => (
                    <div className="preview-item" key={req.id}>
                        <div className="photo-thumb">
                            <img src={`https://api.pixora.test/storage/photos/${req.filename}`} alt="task" />
                        </div>

                        <div className="item-details">
                            <p className="photo-title">{req.title}</p>
                            <div className="meta">
                                <span className="editor-name">{req.editor_name}</span>
                                <span className="dot">•</span>
                                <span className="time"><FaClock /> {new Date(req.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="status-indicator pending"></div>
                    </div>
                ))
            ) : (
                <p className="empty-msg">No pending requests at the moment.</p>
            )}
        </div>
    )
}

export default LatestRequests