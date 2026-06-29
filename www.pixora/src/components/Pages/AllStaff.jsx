import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StaffUserCard from './StaffUserCard';
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { BiSearchAlt } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';
import { StaffManagement as useStaffManagement } from './StaffManagement';

export const AllStaff = () => {
    const [visible, setVisible] = useState(4);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const showMore = () => {
        setVisible(prev => prev + 4);
    }
    const fetchStaff = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/get_all_staff', { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                return res.data.staff;
            } else {
                console.log(res.data.message);
            }
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    const { data: staff = [], isLoading, error } = useQuery({
        queryKey: ['staff'],
        queryFn: fetchStaff
    });

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setVisible(5);
        return;
    }

    const filteredUsers = staff.filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
    });

    const { handleChangeRole, handleDeleteUser, removeStaffRole } = useStaffManagement();

    return (
        <>
            <Helmet>
                <title>Pixora | All Staff</title>
            </Helmet>
            <Navbar />
            <section className="staff-page">
                <div className="container">
                    <header className="page-header">
                        <h1 className="title">Management <span className='highlight'>Staff</span></h1>
                        <p className="stats">({filteredUsers.length} users found)</p>
                    </header>

                    <div className="search-container">
                        <div className="search-box">
                            <BiSearchAlt className='search-icon' />
                            <input
                                type="text"
                                className='search-input'
                                placeholder='Search photos ...'
                                value={search}
                                onChange={handleSearch}
                            />
                            {
                                search && (
                                    <button className='clear-btn' onClick={() => setSearch('')}>
                                        &times;
                                    </button>
                                )
                            }
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="staff-status">Loading staff...</div>
                    ) : filteredUsers.length > 0 ? (
                        <div className="staff-grid">
                            {filteredUsers.slice(0, visible).map((member) => (
                                <StaffUserCard key={member.id} user={member} onRemoveRole={removeStaffRole} onChangeRole={handleChangeRole} onDelete={handleDeleteUser} />
                            ))}
                        </div>
                    ) : (
                        <div className="staff-empty">No staff members match your search.</div>
                    )}

                    {visible < filteredUsers.length && (
                        <div className="text-center mt-5">
                            <button className="btn-show-more" onClick={showMore}>Show More</button>
                        </div>
                    )}
                </div>
            </section>
            <Footer type={'dash'} />
        </>
    )
}
