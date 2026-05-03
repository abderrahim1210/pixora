import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaDownload, FaEdit, FaUpload } from 'react-icons/fa'
import { EmptyContent } from './EmptyContent';
import { notyf } from '../../assets/js/notyf';
import RequestsCard from './RequestsCard';
import { useAuth } from '../context/AuthProvider';
import AllRequestsEditor from './AllRequestsEditor';

const EditorDashboard = ({ uploadResAction }) => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        try {
            const fetchRequests = async () => {
                const res = await axios.get('https://api.pixora.test/get_requests_for_editors', { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    setRequests(res.data.requests);
                } else {
                    console.log(res.data);
                }
            }
            fetchRequests();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }, []);

    const { user } = useAuth();

    const pendingReqs = requests?.filter((r) => r.status === 'pending');
    const inProgressReqs = requests?.filter((r) => r.status === 'in_progress' && r.editor_id === user?.id);
    const completedReqs = requests?.filter((r) => r.status === 'completed' && r.editor_id === user?.id);

    const downloadImage = (id) => {
        const downloadURL = `https://api.pixora.test/download_photo/${id}`;
        window.location.href = downloadURL;
        return;
    }

    const handleAccept = async (id, req_id) => {
        try {
            const res = await axios.post('https://api.pixora.test/accept_req_edit', { req_id: req_id, task_id: id }, { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                setRequests(prevRequests =>
                    prevRequests.map(r =>
                        r.id === id
                            ? { ...r, status: 'in_progress', editor_id: user?.id }
                            : r
                    )
                );
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
            <h2 className='section-title'>Pending Requests <span className='text-primary'>({pendingReqs?.length ?? 0} Request)</span></h2>
            <div
                className="requests-grid mb-3"
                style={{ gap: 5 }}
            >
                <AllRequestsEditor requests={pendingReqs} handleAccept={handleAccept} uploadResAction={uploadResAction} downloadImage={downloadImage} />
                
            </div>

            <hr />
            <h2 className='section-title'>In Progress Requests <span className='text-primary'>({inProgressReqs?.length ?? 0} Request)</span></h2>
            <div
                className="d-flex container-fluid requests-grid mb-3"
                style={{ gap: 5 }}
            >
                <AllRequestsEditor requests={inProgressReqs} handleAccept={handleAccept} uploadResAction={uploadResAction} downloadImage={downloadImage} />
                
            </div>

            <hr />
            <h2 className='section-title'>Completed Requests <span className='text-primary'>({completedReqs?.length ?? 0} Request)</span></h2>
            <div
                className="d-flex container-fluid requests-grid mb-3"
                style={{ gap: 5 }}
            >
                <AllRequestsEditor requests={completedReqs} handleAccept={handleAccept} uploadResAction={uploadResAction} downloadImage={downloadImage} />
                
            </div>
        </div>
    )
}

export default EditorDashboard