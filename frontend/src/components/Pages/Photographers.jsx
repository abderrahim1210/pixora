import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Avatar from './Avatar';
import { Truncate } from './Truncate';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { FaCameraRetro } from 'react-icons/fa';
import { fetchFollows } from '../utils/getFollows';
import { Navbar } from './Navbar';
import { EmptyContent } from './EmptyContent';
import Spinner from './Spinner';
import { BiChevronDown } from 'react-icons/bi';
import { Footer } from './Footer';
const Photographers = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [visible, setVisible] = useState(5);
    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8000/get_users', { withCredentials: true, withXSRFToken: true });
            return res.data.users;
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });

    const { data: follows = [] } = useQuery({
        queryKey: ['follows'],
        queryFn: () => {
            return new Promise((resolve) => fetchFollows(resolve));
        }
    });

    const filtredUsers = useMemo(() => {
        return users.map(u => ({ ...u, isFollowed: follows.includes(u.id), followClasse: follows.includes(u.id) ? 'active' : '', followText: follows.includes(u.id) ? 'Followed' : 'Follow' })).filter(u => u.username.toLowerCase().startsWith(search.toLowerCase()))
    }, [search, users, follows]);

    const showMoreProducts = () => {
        setVisible(prev => prev + 5);
    }

    const addFollow = async (id) => {
        toggleFollowAction(id, follows, setFollows);
    }
    return (
        <div data-bs-page="pixora">
            <Navbar user={user} />
            <div
                className="container-fluid tab-pane fade show mt-3 mb-3"
                id="photographers"
            >
                <h1 className="fw-bold text-center">Photographers</h1>
                <div className="mt-3 mb-3 d-flex justify-content-center">
                    <input
                        type="search"
                        id="searchAtPhotographer"
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Type name of photographer ..."
                    />
                </div>
                <div className="container-fluid div3">
                    {
                        !isLoading ? filtredUsers?.length > 0 ? (
                            filtredUsers?.slice(0, visible).map((u) => (
                                <div className="card photographers" key={u.id}>
                                    <div className="card-body">
                                        <div className="mt-3 mb-3">
                                            <Avatar src={`http://localhost:8000/storage/profile_pictures/${u.photo_profile}`} size={80} />
                                        </div>
                                        <div className="mt-3 mb-3">
                                            <Truncate text={u.username} maxChars={20}>
                                                {({ text }) => (
                                                    <Link to={`/photographer/${u.id}`}>{text}</Link>
                                                )}
                                            </Truncate>
                                        </div>
                                        {u.id !== user?.id ? (
                                            <div className="mt-3 mb-3">
                                                <button
                                                    type="button"
                                                    className={`followButton ${u.followClasse} ${user && user?.role === "admin" && "disabled"} btn`}
                                                    id="followButton"
                                                    onClick={() => addFollow(u.id)}
                                                >
                                                    {u.followText}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-3 mb-3">
                                                <button
                                                    type="button"
                                                    className="followButton btn"
                                                    id="followButton"
                                                    onClick={() => navigate(`${user && user?.username}/myprofile`)}
                                                >
                                                    View profile
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyContent icon={<FaCameraRetro className='faIcon' />} text={'No photographers found - Try searching with another name'} />
                        ) : (<Spinner type={'mini'} text='Wait a few seconds for load all photographers' />)}
                </div>
                {
                    visible < filtredUsers.length && (
                        <div className='show-more-wrapper'>
                            <button className='btn-show-more' onClick={showMoreProducts}>
                                Show more <BiChevronDown size={18} />
                            </button>
                        </div>
                    )
                }
            </div>
            <Footer type={'footer'} />
        </div>
    )
}

export default Photographers