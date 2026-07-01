import React, { useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Avatar from './Avatar';
import { Truncate } from './Truncate';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaCameraRetro } from 'react-icons/fa';
import { fetchFollows, toggleFollowAction } from '../utils/getFollows';
import { Navbar } from './Layouts/Navbar';
import { EmptyContent } from './EmptyContent';
import Spinner from './Spinner';
import { BiChevronDown, BiSearchAlt } from 'react-icons/bi';
import { Footer } from './Layouts/Footer';
import PhotographersList from './PhotographersList';
const Photographers = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [visible, setVisible] = useState(16);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'all';
    const [localFollows, setLocalFollows] = useState([]);
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`https://api.pixora.test/get_users/${type}`, { withCredentials: true, withXSRFToken: true });
            const uniqueUsers = res.data.users.filter((user, index, self) => index === self.findIndex(u => u.id === user.id));
            return uniqueUsers;
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users', type],
        queryFn: fetchUsers
    });

    const { data: follows = [] } = useQuery({
        queryKey: ['follows'],
        queryFn: async () => {
            const res = await axios.get('https://api.pixora.test/follows', { withCredentials: true, withXSRFToken: true });
            console.log(res.data.users);
            return res.data?.users?.map(f => f.following_id) || [];
        },
        // onSuccess: (data) => setLocalFollows(data),
        staleTime: 1000 * 60 * 5,
    });

    const filtredUsers = useMemo(() => {
        return users
            .filter(u => u.username.toLowerCase().startsWith(search.toLowerCase()))
            .map(u => {
                const isFollowed = follows.includes(u.id);
                return {
                    ...u,
                    isFollowed: isFollowed,
                    followClasse: isFollowed ? 'active' : '',
                    followText: isFollowed ? 'Followed' : 'Follow'
                };
            });
    }, [search, users, follows]);

    const showMoreProducts = () => {
        setVisible(prev => prev + 16);
    }

    const queryClient = useQueryClient();
    const addFollow = async (id) => {
        await queryClient.cancelQueries({ queryKey: ['follows'] });
        const newFollows = follows.includes(id) ? follows.filter(fid => fid !== id) : [...follows, id];
        const previousFollows = queryClient.getQueryData(['follows']) || [];
        queryClient.setQueryData(['follows'], newFollows);

        try {
            await axios.post('https://api.pixora.test/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
        } catch (err) {
            queryClient.setQueryData(['follows'], previousFollows);
            console.log(err?.response?.data);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setVisible(16);
        return;
    }
    return (
        <div data-bs-page="pixora">
            <Navbar user={user} type={type} />
            <div
                className="container-fluid tab-pane fade show mt-3 mb-3"
                id="photographers"
            >
                <h1 className="fw-bold text-center">Photographers <span className='text-primary'>({filtredUsers?.length ?? 0})</span></h1>
                <div className="search-container mb-5">
                    <div className="search-box">
                        <BiSearchAlt className='search-icon' />
                        <input
                            type="text"
                            className='search-input'
                            placeholder='Search photographer ...'
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
                <hr />
                <PhotographersList user={user} filtredUsers={filtredUsers} isLoading={isLoading} visible={visible} addFollow={addFollow} />
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