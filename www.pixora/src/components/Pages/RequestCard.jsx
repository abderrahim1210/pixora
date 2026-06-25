import axios from 'axios';
import React, { useState } from 'react'
import { notyf } from '../../assets/js/notyf';
import { useAuth } from '../context/AuthProvider';
import { BiChevronDown } from 'react-icons/bi';

const RequestCard = ({ group, onStatusChange }) => {
    const [visible, setVisible] = useState(1);
    const showMore = () => {
        setVisible(prev => prev + 1);
    }
    const photo = group[0]?.photo;
    const { user } = useAuth();
    const rejectRequest = (request_id, id) => {
        try {
            const reject = async () => {
                const res = await axios.post('https://api.pixora.test/change_status_req', { req_id: id, type: 'reject' }, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    notyf.success(res.data.message);
                    onStatusChange(request_id, 'rejected');
                } else {
                    console.log(res.data.message);
                }
            }
            reject();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    const acceptRequest = (request_id, id) => {
        try {
            const accept = async () => {
                const res = await axios.post('https://api.pixora.test/change_status_req', { id: request_id, req_id: id, type: 'accept' }, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    onStatusChange(request_id, 'approved');
                    notyf.success(res.data.message);
                } else {
                    console.log(res.data.message);
                }
            }
            accept();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="photo-requests-group">
            <div className="group-header">
                <img src={photo?.filename} alt={photo?.title} className='mini-preview' />
                <div className="photo-meta">
                    <h4>{photo?.title}</h4>
                    <span className="request-count">{group?.length ?? 0} Requests</span>
                </div>
            </div>

            <div className="requests-list">
                {
                    group?.map((req) => (
                        <div key={req.id} className="user-request-item">
                            <div className="user-info">
                                <img src={req?.requester?.photo_profile ?? '/outils/pngs/useracc2.png'} alt="User" className='avatar' />
                                <div className="user-text">
                                    <strong>{req?.requester?.username}</strong>
                                    <span>{req?.message}</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                {
                                    req?.status === "approved" ? (<button className='btn-sm bg-success-subtle text-success' style={{ cursor: 'not-allowed' }} disabled>Approved</button>) : req?.requester?.id !== user?.id ? (<><button className='btn-sm btn btn-reject' onClick={() => rejectRequest(req.id, req.requester_id)}>Reject</button>
                                        <button className='btn-sm btn-approve' onClick={() => acceptRequest(req.id, req.requester_id)}>Approve</button></>) : (<button className='btn-sm bg-primary-subtle text-primary' style={{ cursor: 'not-allowed' }} disabled>Your request is sent</button>)
                                }
                            </div>
                        </div>
                    ))
                }
                <div className='d-flex justify-content-center mb-3'>
                    {
                        group?.length > visible && (
                            <div className='show-more-container'>
                                <button className='btn-show-more' onClick={showMore}>
                                    Show more <BiChevronDown size={18} />
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestCard