import React from 'react'
import { FaChartLine, FaEdit, FaIdCard } from 'react-icons/fa'
import { FaGear, FaPencil } from 'react-icons/fa6'
import { MdAnalytics } from 'react-icons/md'

const TopBar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand nav2 sticky-top" id="demo">
            <div className="mx-auto">
                <ul className="nav">
                    <li className="nav-item">
                        <a
                            data-bs-target="#info"
                            data-bs-toggle="tab"
                            className="nav-link active"
                        >
                            <FaIdCard /> personal informations
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            data-bs-target="#editProfile"
                            data-bs-toggle="tab"
                            className="nav-link"
                        >
                            <FaPencil /> edit profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            data-bs-target="#setting"
                            data-bs-toggle="tab"
                            className="nav-link"
                        >
                            <FaGear /> settings
                        </a>
                    </li>
                    {user.role === "user" ? (
                        <li className="nav-item">
                            <a
                                data-bs-target="#statistics"
                                data-bs-toggle="tab"
                                className="nav-link"
                            >
                                <FaChartLine /> statistics
                            </a>
                        </li>) : user.role === "editor" ? ((<li className="nav-item">
                            <a
                                data-bs-target="#requests"
                                data-bs-toggle="tab"
                                className="nav-link"
                            >
                                <FaEdit /> Requests
                            </a>
                        </li>
                        )) : (<li className="nav-item">
                            <a
                                data-bs-target="#admin"
                                data-bs-toggle="tab"
                                className="nav-link"
                            >
                                <MdAnalytics /> Analytics
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default TopBar