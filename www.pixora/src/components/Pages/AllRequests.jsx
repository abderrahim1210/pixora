import React, { useState } from 'react'
import { EmptyContent } from './EmptyContent';
import { FaEdit } from 'react-icons/fa';
import RequestCard from './RequestCard';
import { BiChevronDown } from 'react-icons/bi';
import ShowMoreButton from './ShowMoreButton';

const AllRequests = ({ requests, handleStatusChange}) => {
    const [visible, setVisible] = useState(1);

    const showMore = () => {
        setVisible(prev => prev + 1);
    }
    return (
        <div>
            {requests && Object.entries(requests).length > 0 ? (
                Object.entries(requests).slice(0, visible).map(([imageId, group]) => (
                    <RequestCard key={imageId} group={group} onStatusChange={handleStatusChange} />
                ))
            ) : (
                <EmptyContent
                    icon={<FaEdit className="faIcon" />}
                    text={"No requests for you — try again later"}
                />
            )}
            <div className='d-flex justify-content-center mb-3'>
                {
                    Object.entries(requests)?.length > visible && (
                        <ShowMoreButton showMore={showMore} />
                    )
                }
            </div>
        </div>
    )
}

export default AllRequests