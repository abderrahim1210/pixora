import React, { useState } from 'react'
import RequestCard from '../RequestCard'
import { EmptyContent } from '../EmptyContent'
import { FaEdit } from 'react-icons/fa'
import AllRequests from '../AllRequests'

const Requests = ({ requests, setRequests, myRequests }) => {
    const handleStatusChange = (requestId, newStatus) => {
        setRequests(prevRequests => {
            // Bach t-update-i wast group (hit nti m-groupiya b image_id)
            const updated = { ...prevRequests };
            Object.keys(updated).forEach(imageId => {
                updated[imageId] = updated[imageId].map(req =>
                    req.id === requestId ? { ...req, status: newStatus } : req
                );
            });
            return updated;
        });
    };
    return (
        <div className="tab-pane fade show" id="requests">
            <div className="mt-2 mb-2">
                <h2>
                    Requests <p className="d-inline text-primary">( {Object.entries(requests).length ?? 0} request)</p>
                </h2>
            </div>
            <div className="container-fluid">
                <div className="mt-3 mb-3">
                    <AllRequests requests={requests} handleStatusChange={handleStatusChange} />
                </div>
                <hr />
                <div className="mt-3 mb-3">
                    <h2>
                        Your Requests <span className='text-primary'>({Object.entries(myRequests).length ?? 0})</span>
                    </h2>
                    <AllRequests requests={myRequests} />
                </div>

            </div>
        </div>
    )
}

export default Requests