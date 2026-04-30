import React from 'react'
import RequestCard from '../RequestCard'
import { EmptyContent } from '../EmptyContent'
import { FaEdit } from 'react-icons/fa'

const Requests = ({requests, myRequests}) => {
    return (
        <div className="tab-pane fade show" id="requests">
            <div className="mt-2 mb-2">
                <h2>
                    Requests <p className="d-inline text-primary">( {Object.entries(requests).length ?? 0} request)</p>
                </h2>
            </div>
            <div className="container-fluid">
                <div className="mt-3 mb-3">
                    {requests && Object.entries(requests).length > 0 ? (
                        Object.entries(requests).map(([imageId, group]) => (
                            <RequestCard key={imageId} group={group} />
                        ))
                    ) : (
                        <EmptyContent
                            icon={<FaEdit className="faIcon" />}
                            text={"No requests yet — start request with anyone"}
                        />
                    )}
                </div>
                <hr />
                <div className="mt-3 mb-3">
                    <h2>
                        Your Requests <span className='text-primary'>({myRequests?.length ?? 0})</span>
                    </h2>
                    {requests && Object.entries(myRequests).length > 0 ? (
                        Object.entries(myRequests).map(([imageId, group]) => (
                            <RequestCard key={imageId} group={group} />
                        ))
                    ) : (
                        <EmptyContent
                            icon={<FaEdit className="faIcon" />}
                            text={"No requests for you — try again later"}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Requests