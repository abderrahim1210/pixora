import React, { useState } from 'react'
import { Offcanvas, Nav } from 'react-bootstrap';
import { Home, Compass, Image, PlusSquare, User, Settings, LogOut, X, Images } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Avatar from './Avatar';
const OffcanvasTemplate = ({ user, page = 'home' }) => {
    const [show, setShow] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);
    const location = useLocation();
    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        // { name: 'Explore', path: '/explore', icon: <Compass size={20} /> },
        { name: 'My Profile', path: `/user/${user?.username}/myprofile`, icon: <Image size={20} /> },
        { name: 'My Photos', path: `/user/${user?.username}/myphotos`, icon: <Images size={20} /> },
        { name: 'Upload', path: '/upload', icon: <PlusSquare size={20} /> },
    ];
    return (
        <>
            <button
                type="button"
                className={`custom-menu-icon btn d-md-none ms-auto ${show ? 'open' : ''}`}
                onClick={() => setShow(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width={40}
                    height={40}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle
                        cx={32}
                        cy={32}
                        r={29}
                        stroke="currentColor"
                        opacity="0.2"
                    />
                    <path d="M20 24h24" />
                    <path d="M20 32h24" />
                    <path d="M20 40h24" />
                    <circle cx={48} cy={32} r={3} fill="currentColor" />
                </svg>
            </button>
            <Offcanvas show={show} onHide={() => setShow(false)} className="custom-offcanvas" >
                <Offcanvas.Header className="px-4 pt-4 pb-2 d-flex justify-content-between align-items-center">
                    <div className="brand-logo">
                        <h3 className="fw-bold mb-0" style={{ color: 'rgb(0, 120, 255)', letterSpacing: '-1px' }}>Pixora</h3>
                    </div>
                    <button className="btn-close-custom" onClick={() => setShow(false)}>
                        <X size={24} />
                    </button>
                </Offcanvas.Header>

                <Offcanvas.Body className="px-0 d-flex flex-column h-100">
                    <div className="flex-grow-1 overflow-auto px-3">

                        {
                            page === 'home' && (
                                <>
                                    {user && (
                                        <div className="user-profile-section px-4 py-3 mb-3 d-flex align-items-center gap-3">
                                            <div className="avatar-wrapper">
                                                <img src={user?.photo_profile ? `https://api.pixora.test/storage/profile_pictures/${user.photo_profile}` : '/outils/pngs/useracc2.png'} alt="avatar" />
                                            </div>
                                            <div className="user-info">
                                                <h6 className="mb-0 fw-bold">{user.display_name}</h6>
                                                <small className="text-muted">@{user.username}</small>
                                            </div>
                                        </div>
                                    )}

                                    <Nav className="flex-column">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className={`nav-link-custom ${location.pathname === link.path ? 'active' : ''}`}
                                                onClick={() => setShow(false)}
                                            >
                                                <span className="icon">{link.icon}</span>
                                                <span className="text">{link.name}</span>
                                            </Link>
                                        ))}
                                        <div
                                            className="explore-dropdown-wrapper"
                                            onMouseEnter={() => setExploreOpen(true)}
                                            onMouseLeave={() => setExploreOpen(false)}
                                        >
                                            <div
                                                className={`nav-link-custom d-flex justify-content-between align-items-center ${exploreOpen ? 'active' : ''}`}
                                                onClick={() => setExploreOpen(!exploreOpen)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="icon"><Compass size={20} /></span>
                                                    <span className="text">Explore</span>
                                                </div>
                                                <span style={{ transform: exploreOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                                                </span>
                                            </div>

                                            {exploreOpen && (
                                                <div className="sub-menu open">
                                                    <Link to="/search?type=popular" className="sub-link" onClick={() => setShow(false)}>
                                                        Popular Photos
                                                    </Link>
                                                    <Link to="/search?type=trending" className="sub-link" onClick={() => setShow(false)}>
                                                        Trending Photos
                                                    </Link>
                                                    <Link to="/photographers?type=all" className="sub-link" onClick={() => setShow(false)}>
                                                        Top Photographers
                                                    </Link>
                                                    <Link to="/photographers?type=featured" className="sub-link" onClick={() => setShow(false)}>
                                                        Featured Artists
                                                    </Link>
                                                    <Link to="/photographers?type=top" className="sub-link" onClick={() => setShow(false)}>
                                                        Top Photographers
                                                    </Link>
                                                    <Link to="/galleries" className="sub-link" onClick={() => setShow(false)}>
                                                        Galleries
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* <div className="separator my-3"></div>

                                        <Link to="/settings" className="nav-link-custom" onClick={() => setShow(false)}>
                                            <span className="icon"><Settings size={20} /></span>
                                            <span className="text">Settings</span>
                                        </Link> */}
                                    </Nav>
                                </>
                            )
                        }
                    </div>
                    <div className="offcanvas-footer px-4 py-4 border-top mt-auto bg-light bg-opacity-50">
                        <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default OffcanvasTemplate