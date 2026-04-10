import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaEdit } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent';

const EditorDashboard = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        try {
            const fetchRequests = async () => {
                const res = await axios.get('http://localhost:8000/get_requests_for_editors', { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    setRequests(res.data.requests);
                }
            }
            fetchRequests();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }, []);
    return (
        <div className="mt-2 mb-2 tab-pane fade show" id="requests">
            <div
                className="d-flex justify-content-start align-items-center mt-2 mb-3"
                style={{ flexDirection: "column", gap: 5 }}
            >
                {
                    requests?.length > 0 ? (requests?.map((r) => (<div className="editor-task-card" key={r?.id}>
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

                            <button className="btn-process">
                                <span>Proces Edit</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>))) : (<EmptyContent icon={<FaEdit className='faIcon' />} text={'No requests found it - try again later'} />)
                }
            </div>
        </div>
    )
}

export default EditorDashboard