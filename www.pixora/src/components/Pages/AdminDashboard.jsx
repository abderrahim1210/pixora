import React, { useState } from 'react'
import { FaCamera, FaCameraRetro, FaChartArea, FaChartLine, FaCheckCircle, FaClock, FaComment, FaComments, FaFlag, FaMedal, FaStar, FaTimesCircle, FaTrophy, FaUserPlus, FaUsers, FaUserShield } from 'react-icons/fa'
import { MdComment, MdEdit, MdPending } from 'react-icons/md'
import { Truncate } from './Truncate'
import { Link } from 'react-router-dom'
import PhotosTemplate from './Templates/PhotosTemplate'
import PhotographersTemplate from './Templates/PhotographersTemplate'
import { EmptyContent } from './EmptyContent'
import { FiUserPlus, FiUsers } from 'react-icons/fi'
import LatestRequests from './LatestRequests'
import StaffUserCard from './StaffUserCard'
import { Flag, Star, Stars } from 'lucide-react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { notyf } from '../../assets/js/notyf'
import withReactComponent from 'sweetalert2-react-content'
import ShowMoreButton from './ShowMoreButton'
import { ReportCard } from './ReportCard'

const AdminDashboard = ({ user, analytics, setAnalytics }) => {
    const [staffVisible, setStaffVisible] = useState(4);
    const showMore = () => {
        setStaffVisible(prev => prev + 4);
    }
    const removeStaffRole = async (id) => {
        Swal.fire({
            title: 'Remove role from user',
            text: 'Are you sure for remove role from this user ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , remove it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/remove_role', { user_id: id }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        setAnalytics(prev => ({ ...prev, staff: prev.staff.filter(s => s.id !== id) }));
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }

    const MySwal = withReactComponent(Swal);

    const handleChangeRole = async (id, username, role) => {
        MySwal.fire({
            title: <span style={{ color: '#0f172a' }}>Change User Role</span>,
            html: (
                <p className="text-gray-500">
                    You are changing the role for <b>{username}</b>
                </p>
            ),
            input: 'select',
            inputOptions: {
                'admin': 'Admin (Full Access)',
                'editor': 'Editor (Limited Access)',
                'user': 'Regular User'
            },
            inputValue: role,
            showCancelButton: true,
            confirmButtonText: 'Update Role',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            background: 'rgba(255, 255, 255, 0.9)',
            backdrop: `rgba(15, 23, 42, 0.2) blur(8px)`,
            customClass: {
                popup: 'glass-morphism-popup',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/change_role', { user_id: id, role: result.value }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        setAnalytics(prev => ({ ...prev, staff: prev.staff.map(u => u.id === id ? { ...u, role: result.value } : u) }));
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Delete user',
            text: 'Are you sure for delete this user ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , remove it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/delete_user', { user_id: id }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        setAnalytics(prev => ({ ...prev, staff: prev.staff.filter(s => s.id !== id) }));
                        notyf.success(res.data.message);
                    } else {
                        notyf.error(res.data.message);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }
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
                                        <p>{analytics.counters?.total_comments ?? 0}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='dashboard-links mb-2'>
                                    <nav className='nav'>
                                        <li className='nav-item'><a href="" data-bs-target="#top_photographers"
                                            data-bs-toggle="tab" className='nav-link active'><FaTrophy /> Top photographers <span className='badge-count'>({analytics?.top_photographers?.length ?? 0})</span></a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#requests"
                                            data-bs-toggle="tab" className='nav-link'><MdEdit /> Requests <span className="badge-count">({analytics?.requests?.length ?? 0})</span></a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#staff"
                                            data-bs-toggle="tab" className='nav-link'><FaUserShield /> Staff <span className='badge-count'>({analytics?.staff?.filter(s => s.id !== user?.id)?.length ?? 0})</span></a></li>
                                        <li className='nav-item'><a href="" data-bs-target="#reports"
                                            data-bs-toggle="tab" className='nav-link'><FaFlag /> Reports <span className='badge-count'>({analytics?.counters?.total_reports ?? 0})</span></a></li>
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
                                            {analytics?.requests?.length > 0 && (<div className='section-header'><div className='d-flex gap-1 align-items-center'><MdEdit /><h4>Requests <span className='text-primary'>({analytics?.requests?.length ?? 0})</span></h4></div><Link to={'/requests'}>See all</Link></div>)}
                                            <div className='container-fluid mt-0 div3'>
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
                                            {analytics?.staff?.length > 0 && (<div className='section-header'><div className='d-flex gap-1 align-items-center'><FaUserShield /><h4>Staff <span className='text-primary'>({analytics?.staff?.length ?? 0})</span></h4></div><Link to={'/staff'}>See all</Link></div>)}
                                            <div className='container-fluid div3 mt-0'>
                                                {
                                                    analytics.staff?.length > 0 ? analytics?.staff?.filter(u => u.id !== user?.id).slice(0, staffVisible).map((user, index) => (
                                                        <StaffUserCard user={user} onRemoveRole={removeStaffRole} onChangeRole={handleChangeRole} onDelete={handleDeleteUser} key={index} />
                                                    ))
                                                        : (
                                                            <EmptyContent icon={<FaUserShield className='faIcon' />} text={"No staff found it - try again later"} />
                                                        )
                                                }
                                                <div className='container mx-auto d-flex justify-content-center'>
                                                    {
                                                        staffVisible < analytics?.staff?.length && (
                                                            <ShowMoreButton showMore={showMore} />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="reports">
                                        {analytics?.reports?.length > 0 && (<div className='section-header'><div className='d-flex gap-1 align-items-center'><FaFlag /><h4>Reports <span className='text-primary'>({analytics?.counters?.total_reports ?? 0})</span></h4></div><Link to={'/reports'}>See all</Link></div>)}
                                        <div className='container-fluid' style={{ gap: '50px' }}>
                                            {
                                                analytics?.reports?.length > 0 ? analytics?.reports?.map((r,index) => (
                                                    <ReportCard report={r} key={index} />
                                                )) : (<EmptyContent icon={<FaFlag className='faIcon' />} text={"No reports yet — try again later !"} />)
                                            }
                                        </div>
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
                                    <h2 className='d-flex align-items-center gap-2'><Stars />Featured photos <span className='text-primary'>({analytics.featured_photos?.length ?? 0})</span></h2>
                                    {
                                        analytics.featured_photos?.length > 0 ? (
                                            <PhotosTemplate photos={analytics.featured_photos} />
                                        ) : (
                                            <EmptyContent icon={<FaStar className='faIcon' />} text={"No featured photos !"} />
                                        )
                                    }
                                </div>
                                <hr />
                                <div>
                                    <h2 className='d-flex align-items-center gap-2'><FaComments />Most photos comments <span className='text-primary'>({analytics.most_commentsPhotos?.length ?? 0})</span></h2>
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