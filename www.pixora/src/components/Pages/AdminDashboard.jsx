import React from 'react'
import { FaCamera, FaCameraRetro, FaChartArea, FaChartLine, FaCheckCircle, FaClock, FaComment, FaComments, FaFlag, FaMedal, FaTimesCircle, FaTrophy, FaUserPlus, FaUsers, FaUserShield } from 'react-icons/fa'
import { MdComment, MdEdit, MdPending } from 'react-icons/md'
import { Truncate } from './Truncate'
import { Link } from 'react-router-dom'
import PhotosTemplate from './PhotosTemplate'
import PhotographersTemplate from './PhotographersTemplate'
import { EmptyContent } from './EmptyContent'
import { FiUserPlus, FiUsers } from 'react-icons/fi'
import LatestRequests from './LatestRequests'
import StaffUserCard from './StaffUserCard'

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
                                        <p>{analytics?.counters?.total_photos ?? 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <MdEdit size={25} className='stat-icon' />
                                        <h3>Requests</h3>
                                        <p>{analytics?.counters?.total_requests ?? 0}</p>
                                    </div>
                                    <div className="stat-card">
                                        <FaUsers size={25} className='stat-icon' />
                                        <h3>All Users</h3>
                                        <p>{analytics.counters?.total_users ?? 0}</p>
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
                                        <li className='nav-item'><a href="" data-bs-target="#top_photographers"
                                            data-bs-toggle="tab" className='nav-link active'><FaTrophy /> Top photographers ({analytics?.top_photographers?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#requests"
                                            data-bs-toggle="tab" className='nav-link'><MdEdit /> Requests ({analytics?.requests?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#staff"
                                            data-bs-toggle="tab" className='nav-link'><FaUserShield /> Staff ({analytics?.staff?.length ?? 0})</a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#reports"
                                            data-bs-toggle="tab" className='nav-link'><FaFlag /> Reports ({analytics?.reports?.length ?? 0})</a></li>
                                    </nav>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="top_photographers">
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
                                    <div className="tab-pane fade show" id="requests">
                                        <div>
                                            <h2 className='d-flex align-items-center gap-2'><MdEdit /> Requests <span className='text-primary'>({analytics.requests?.length ?? 0})</span></h2>
                                            <div className='container-fluid div3'>
                                                {
                                                    analytics.requests?.length > 0 ? (
                                                        <LatestRequests requests={analytics.requests} />
                                                    ) : (
                                                        <EmptyContent icon={<MdEdit className='faIcon' />} text={"No top requests found it - try again later"} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="staff">
                                        <div>
                                            <h2 className='d-flex align-items-center gap-2'><FaUserShield /> User <span className='text-primary'>({analytics.staff?.length ?? 0})</span></h2>
                                            <div className='container-fluid div3'>
                                                {
                                                    analytics.staff?.length > 0 ? analytics.staff.map((user, index) => (
                                                        <StaffUserCard user={user} key={index} />
                                                    ))
                                                        : (
                                                            <EmptyContent icon={<FaUserShield className='faIcon' />} text={"No staff found it - try again later"} />
                                                        )
                                                }
                                            </div>
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
                                    <h2 className='d-flex align-items-center gap-2'><FaUserPlus /> New users this month<span className='text-primary'>({analytics.recent_users?.length ?? 0})</span></h2>
                                    <div className='container-fluid div3'>
                                        {
                                            analytics.recent_users?.length > 0 ? (
                                                <PhotographersTemplate photographers={analytics.recent_users} />
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
                                    <h2 className='d-flex align-items-center gap-2'><FaMedal /> Top uploaders <span className='text-primary'>({analytics.top_uploaders?.length ?? 0})</span></h2>
                                    <div className='container-fluid div3'>
                                        {
                                            analytics.top_uploaders?.length > 0 ? (
                                                <PhotographersTemplate photographers={analytics.top_uploaders} />
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
                                        analytics.most_commentsPhotos?.length > 0 ? (
                                            <PhotosTemplate photos={analytics.most_commentsPhotos} />
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