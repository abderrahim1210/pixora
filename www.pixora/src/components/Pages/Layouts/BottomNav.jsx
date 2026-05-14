import { Compass, Info, LayoutGrid, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaCamera, FaChartLine, FaCog, FaEdit, FaHeart, FaIdCard, FaInfoCircle, FaUser } from 'react-icons/fa';
import { FaGear, FaPencil } from 'react-icons/fa6';
import { FiCompass } from 'react-icons/fi';
import { MdAnalytics, MdCategory, MdPhotoLibrary, MdRecommend } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BottomNav = ({ page, user=null }) => {
    const homeItems = [{ id: 'foryou', icon: <Sparkles size={20} />, label: 'For you' },
    { id: 'explore', icon: <Compass size={20} />, label: 'Explore' },
    { id: 'categories', icon: <LayoutGrid size={20} />, label: 'Categories' },
    { id: 'about', icon: <Info size={20} />, label: 'About' },]
    const profileItems = [
        { id: 'info', icon: <FaIdCard size={20} />, label: 'Infos' },
        { id: 'editProfile', icon: <FaPencil size={20} />, label: 'Edit Profile' },
        { id: 'settings', icon: <FaGear size={20} />, label: 'Settings' },
        user?.role === 'user' && { id: 'statistics', icon: <FaChartLine size={20} />, label: 'Statistics' },
        user?.role === 'editor' && { id: 'requests', icon: <FaEdit size={20} />, label: 'Requests' },
        user?.role === 'admin' && { id: 'admin', icon: <MdAnalytics size={20} />, label: 'Analytics (Admin)' }
    ].filter(Boolean);
    const managePhotosItems = [
        { id: 'myphotos', icon: <FaCamera size={20} />, label: 'My photos' },
        { id: 'requests', icon: <FaEdit size={20} />, label: 'My Requests' },
        { id: 'likes', icon: <FaHeart size={20} />, label: 'My photos likes' },
        { id: 'galleries', icon: <MdPhotoLibrary size={20} />, label: 'My galleries' },
    ];
    const [visible,setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 80){
                setVisible(false);
            }else{
                setVisible(true);
            }
        }

        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    const navItems = page === 'home' ? homeItems : page === 'profile' ? profileItems : managePhotosItems;
    return (
        <div className={`container-fluid d-md-none transition-nav ${visible ? 'show-nav' : 'hide-nav'}`}>
            <nav className="navbar mx-auto navbar-expand fixed-bottom nav3" role="tablist">
                <ul className="navbar-nav w-100 d-flex justify-content-around" id="ul3">
                    {navItems.map((item,index) => (
                        <li className="nav-item" key={item.id}>
                            <Link
                                className={`nav-link ${index === 0 && 'active'}`}
                                data-bs-target={`#${item.id}`}
                                data-bs-toggle="tab"
                            >
                                {item.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default BottomNav