import axios from 'axios';
import React from 'react'
import { notyf } from '../../assets/js/notyf';
import { useAuth } from '../context/AuthProvider';

const RequestCard = ({ group }) => {
    const photo = group[0]?.photo;
    const {user} = useAuth();
    const rejectRequest = (id) => {
        try{
            const reject = async() => {
                const res = await axios.post('http://localhost:8000/change_status_req',{req_id:id,type:'reject'},{withCredentials:true,withXSRFToken:true});
                if (res.data.success){
                    notyf.success(res.data.message);
                }else{
                    console.log(res.data.message);
                }
            }
            reject();
        }catch(err){
            console.log(err?.response?.data);
        }
    }

    const acceptRequest = (request_id,id) => {
        try{
            const accept = async () => {
                const res = await axios.post('http://localhost:8000/change_status_req',{id:request_id,req_id:id,type:'accept'},{withCredentials:true,withXSRFToken:true});
                if (res.data.success){
                    notyf.success(res.data.message);
                }else{
                    console.log(res.data.message);
                }
            }
            accept();
        }catch(err){
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="photo-requests-group">
            <div className="group-header">
                <img src={`http://localhost:8000/storage/photos/${photo?.filename}`} alt={photo?.title} className='mini-preview' />
                <div className="photo-meta">
                    <h4>{photo?.title}</h4>
                    <span className="request-count">{group?.length} Requests</span>
                </div>
            </div>

            <div className="requests-list">
                {
                    group?.map((req) => (
                        <div key={req.id} className="user-request-item">
                            <div className="user-info">
                                <img src={req?.requester?.photo_profile ? `http://localhost:8000/storage/profile_pictures/${req?.requester?.profile_photo}` : '/outils/pngs/useracc2.png'} alt="User" className='avatar' />
                                <div className="user-text">
                                    <strong>{req?.requester?.username}</strong>
                                    <span>{req?.message}</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                {
                                    req?.status === "approved" ? (<button className='btn-sm bg-success-subtle text-success' style={{cursor:'not-allowed'}} disabled>Approved</button>) : req?.requester?.id !== user?.id ? (<><button className='btn-sm btn btn-reject' onClick={() => rejectRequest(req.id,req.requester_id)}>Reject</button>
                                <button className='btn-sm btn-approve' onClick={() => acceptRequest(req.id,req.requester_id)}>Approve</button></>) : (<button className='btn-sm bg-primary-subtle text-primary' style={{cursor:'not-allowed'}} disabled>Your request is sent</button>)
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RequestCard