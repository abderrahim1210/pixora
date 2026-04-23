import React from 'react'
import { FaCamera, FaEdit, FaHeart } from 'react-icons/fa'
import { MdPhotoLibrary } from 'react-icons/md'

const TopBarPhotos = () => {
    return (
        <nav className="navbar navbar-expand nav2 sticky-top" id="demo">
            <div className="mx-auto">
                <ul className="nav">
                    <li className="nav-item">
                        <a
                            data-bs-target="#photos"
                            data-bs-toggle="tab"
                            className="nav-link active"
                        >
                            <FaCamera /> my photos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            data-bs-target="#requests"
                            data-bs-toggle="tab"
                            className="nav-link"
                        >
                            <FaEdit /> requests
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            data-bs-target="#likes"
                            data-bs-toggle="tab"
                            className="nav-link"
                        >
                            <FaHeart /> likes
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            data-bs-target="#galleries"
                            data-bs-toggle="tab"
                            className="nav-link"
                        >
                            <MdPhotoLibrary /> galleries
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TopBarPhotos