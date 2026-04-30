import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

const ShowMoreButton = ({showMore}) => {
    return (
        <div className='show-more-container'>
            <button className='btn-show-more' onClick={showMore}>
                Show more <BiChevronDown size={18} />
            </button>
        </div>
    )
}

export default ShowMoreButton