import React, { useState } from 'react'
import RequestsCard from './RequestsCard'
import { EmptyContent } from './EmptyContent'
import { FaEdit } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'
import ShowMoreButton from './ShowMoreButton'

const AllRequestsEditor = ({ requests, handleAccept, uploadResAction, downloadImage }) => {
    const [visible, setVisible] = useState(1);
    const showMore = () => {
        setVisible(prev => prev + 1);
    }
    return (
        <>
            {
                requests?.length > 0 ? requests?.slice(0, visible).map((r) => (<RequestsCard r={r} key={r.id} handleAccept={handleAccept} uploadResAction={uploadResAction} downloadImage={downloadImage} />)) : (<EmptyContent icon={<FaEdit className='faIcon' />} text={'No requests with status pending found it - try again later'} />)
            }
            <div className='d-flex justify-content-center mb-3'>
                {
                    requests?.length > visible && (
                        <ShowMoreButton showMore={showMore} />
                    )
                }
            </div>
        </>
    )
}

export default AllRequestsEditor