import React from 'react'
import { FaCheck, FaClock, FaCloudUploadAlt, FaMagic } from 'react-icons/fa'

const EditButton = ({requestStatus, openModal}) => {
  return (
    <div className='action-wrapper'>
        {requestStatus === 'none' && (
            <button className='btn-pixora bg-primary-subtle border-primary text-primary btn-pixora--request' onClick={() => openModal('request_edit')}>
                <FaMagic />
                <span>Request Edit</span>
            </button>
        )}
        {requestStatus === "pending" && (
            <button className='btn-pixora text-warning border-warning bg-warning-subtle btn-pixora--pending' disabled>
                <FaClock />
                <span>Request Sent ...</span>
            </button>
        )}
        {requestStatus === "approved" && (
            <button className='btn-pixora text-success border-success bg-success-subtle btn-pixora--upload'>
                <FaCheck />
                <span>Approved</span>
            </button>
        )}
    </div>
  )
}

export default EditButton