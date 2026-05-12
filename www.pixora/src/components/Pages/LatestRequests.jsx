import React from 'react'
import { FaClock, FaPencilAlt, FaUserEdit } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent'
import { Pencil } from 'lucide-react'
import { FaPencil } from 'react-icons/fa6'

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
                            <p className="photo-title" title={req.title}>{req.title}</p>
                            <div className="meta">
                                <span className="editor-name">
                                    <FaUserEdit className="icon" /> {req.editor_name || 'Unassigned'}
                                </span>
                                <span className="dot">•</span>
                                <span className="time">
                                    <FaClock className="icon" /> {new Date(req.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className={`status-indicator ${req.status || 'pending'}`}
                            title={`Status: ${req.status || 'pending'}`}>
                        </div>
                    </div>
                ))
            ) : (
                <div className='empty-content-wrapper'>
                    <EmptyContent icon={<FaPencil className='faIcon' />} text={'No requests found at moment.'} />
                </div>
            )}
        </div>
    )
}

export default LatestRequests