import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaDownload, FaEdit, FaUpload } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent';
import { notyf } from '../../assets/js/notyf';

const EditorDashboard = ({ openModal }) => {
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

    const downloadImage = (id) => {
        const downloadURL = `http://localhost:8000/download_photo/${id}`;
        window.location.href = downloadURL;
        return;
    }

    const handleAccept = async (id, req_id) => {
        try {
            const res = await axios.post('http://localhost:8000/accept_req_edit', { req_id: req_id, task_id: id }, { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                notyf.success(res.data.message);
            } else {
                console.log(res.data.message);
            }
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="mt-2 mb-2 tab-pane fade show" id="requests">
            <div
                className="d-flex container-fluid requests-grid mt-2 mb-3"
                style={{ gap: 5 }}
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
                            <div className={`badge mb-2 badge-${r?.status}`}>
                                <span>{r?.status}</span>
                            </div>

                            {
                                r?.status === "pending" ? (<button className="btn-process" onClick={() => handleAccept(r.id, r.edition_requests?.id)}>
                                    <span>Process Edit</span>
                                    <FaArrowRight />
                                </button>) : (<div className='action-group animated-fade-in'>
                                    <button className='btn-action btn-download' onClick={() => downloadImage(r?.edition_requests?.photo?.id)}>
                                        <FaDownload />
                                        <span>Download Original</span>
                                    </button>
                                    <label className='btn-action btn-upload'>
                                        <FaUpload />
                                        <span>Upload Result</span>
                                        <input type="file" hidden />
                                    </label>
                                </div>)
                            }
                        </div>
                    </div>))) : (<EmptyContent icon={<FaEdit className='faIcon' />} text={'No requests found it - try again later'} />)
                }
            </div>
        </div>
    )
}

export default EditorDashboard