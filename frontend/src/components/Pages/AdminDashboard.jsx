import React from 'react'
import { FaCamera, FaCameraRetro, FaChartArea, FaChartLine, FaCheckCircle, FaClock, FaComment, FaComments, FaFlag, FaMedal, FaTimesCircle, FaTrophy, FaUserPlus, FaUsers } from 'react-icons/fa'
import { MdComment, MdPending } from 'react-icons/md'
import { Truncate } from './Truncate'
import { Link } from 'react-router-dom'
import PhotosTemplate from './PhotosTemplate'
import PhotographersTemplate from './PhotographersTemplate'
import { EmptyContent } from './EmptyContent'
import { FiUserPlus, FiUsers } from 'react-icons/fi'

const AdminDashboard = ({ analytics }) => {
    return (
        <>
            <div className='tab-pane fade show' id='admin'>
                <div className="mt-2 mb-2">
                    <h2>Analytics</h2>
                    <p>
                        Track platform activity and performance in real-time
                    </p>
                    {
                        analytics ? (
                            <>
                                <div className="stat-container">
                                    <div className="stat-card">
                                        <FaCamera size={25} className='stat-icon' />
                                        <h3>Photos</h3>
                                        <p>{analytics.photos_count ?? 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <MdPending size={25} className='stat-icon' />
                                        <h3>Photos under review</h3>
                                        <p>{analytics?.photos_under_review?.length ?? 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <FaUsers size={25} className='stat-icon' />
                                        <h3>All Users</h3>
                                        <p>{analytics.users_count ?? 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <FaComments size={25} className='stat-icon' />
                                        <h3>Comments</h3>
                                        <p>{analytics.total_comments ?? 0}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='dashboard-links nav2'>
                                    <nav className='nav'>
                                        <li className='nav-item'><a href="" data-bs-target="#photos_under_review"
                                            data-bs-toggle="tab" className='nav-link active'><FaClock /> Under review ({analytics?.photos_under_review?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#top_photographers"
                                            data-bs-toggle="tab" className='nav-link'><FaTrophy /> Top photographers ({analytics?.top_photographers?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#approved"
                                            data-bs-toggle="tab" className='nav-link'><FaCheckCircle /> Approved ({analytics?.photos_approveds?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#rejected"
                                            data-bs-toggle="tab" className='nav-link'><FaTimesCircle /> Rejected ({analytics?.photos_rejected?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#reports"
                                            data-bs-toggle="tab" className='nav-link'><FaFlag /> Reports ({analytics?.reports?.length ?? 0})</a></li>
                                    </nav>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="photos_under_review">
                                        <div className="container-fluid">
                                            <div>
                                                {
                                                    analytics.photos_under_review ? (
                                                        <PhotosTemplate photos={analytics.photos_under_review} />
                                                    ) : (
                                                        <EmptyContent icon={<FaCamera size={40} style={{ cursor: "pointer" }} />} text={"No photos yet — start sharing your moments!"} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="top_photographers">
                                        <div className='container-fluid div3'>
                                            {
                                                analytics.top_photographers?.length > 0 ? (
                                                    <PhotographersTemplate photographers={analytics.top_photographers} />
                                                ) : (
                                                    <EmptyContent icon={<FaTrophy size={40} style={{ cursor: "pointer" }} />} text={"No photographers yet — try again later !"} />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="approved">
                                        <div className='container-fluid'>
                                            {
                                                analytics.photos_approveds?.length > 0 ? (
                                                    <PhotosTemplate photos={analytics.photos_approveds} />
                                                ) : (
                                                    <EmptyContent icon={<FaCheckCircle />} text={"No photos approved — try again later !"} />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="rejected">
                                        <EmptyContent icon={<FaTimesCircle className='faIcon' />} text={"No photos rejected — try again later !"} />
                                    </div>
                                    <div className="tab-pane fade show" id="reports">
                                        <EmptyContent icon={<FaFlag className='faIcon' />} text={"No reports yet — try again later !"} />
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h2 className='d-flex align-items-center gap-2'><FaUserPlus /> New users this month<span className='text-primary'>({analytics.users_this_month?.length ?? 0})</span></h2>
                                    <div className='container-fluid div3'>
                                        {
                                            analytics.users_this_month?.length > 0 ? (
                                                <PhotographersTemplate photographers={analytics.users_this_month} />
                                            ) : (
                                                <EmptyContent icon={<FaUsers className='faIcon' />} text={"No new users this month !"} />
                                            )
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h2 className='d-flex align-items-center gap-2'><FaCamera /> Photos this week <span className='text-primary'>({analytics.photos_this_week?.length ?? 0})</span></h2>

                                    {
                                        analytics.photos_this_week?.length > 0 ? (
                                            <PhotosTemplate photos={analytics.photos_this_week} />
                                        ) : (
                                            <EmptyContent icon={<FaCameraRetro className='faIcon' />} text={"No new photos this week - try again later"} />
                                        )
                                    }

                                </div>
                                <hr />
                                <div>
                                    <h2 className='d-flex align-items-center gap-2'><FaMedal /> Top uploaders <span className='text-primary'>({analytics.top_uploads?.length ?? 0})</span></h2>
                                    <div className='container-fluid div3'>
                                        {
                                            analytics.top_uploads?.length > 0 ? (
                                                <PhotographersTemplate photographers={analytics.top_uploads} />
                                            ) : (
                                                <EmptyContent icon={<FaMedal className='faIcon' />} text={"No top uploaders - try again later"} />
                                            )
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h2 className='d-flex align-items-center gap-2'><FaComments />Most photos comments <span className='text-primary'>({analytics.most_comments?.length ?? 0})</span></h2>
                                    {
                                        analytics.most_comments?.length > 0 ? (
                                            <PhotosTemplate photos={analytics.most_comments} />
                                        ) : (
                                            <EmptyContent icon={<FaComment className='faIcon' />} text={"No most comments photos !"} />
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <EmptyContent icon={<FaChartLine className='faIcon' />} text={"No statistics for now — try again later"} />
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default AdminDashboard