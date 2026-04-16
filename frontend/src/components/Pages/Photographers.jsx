import React, { useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Avatar from './Avatar';
import { Truncate } from './Truncate';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaCameraRetro } from 'react-icons/fa';
import { fetchFollows, toggleFollowAction } from '../utils/getFollows';
import { Navbar } from './Navbar';
import { EmptyContent } from './EmptyContent';
import Spinner from './Spinner';
import { BiChevronDown, BiSearchAlt } from 'react-icons/bi';
import { Footer } from './Footer';
import PhotographersList from './PhotographersList';
const Photographers = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [visible, setVisible] = useState(5);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'all';
    const [localFollows, setLocalFollows] = useState([]);
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/get_users/${type}`, { withCredentials: true, withXSRFToken: true });
            return res.data.users;
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
            const res = await axios.get('http://localhost:8000/follows', { withCredentials: true, withXSRFToken: true });
            return res.data?.users?.map(f => f.id) || [];
        },
        onSuccess: (data) => setLocalFollows(data)
    });

    const filtredUsers = useMemo(() => {
        return users.map(u => ({ ...u, isFollowed: follows.includes(u.id), followClasse: follows.includes(u.id) ? 'active' : '', followText: follows.includes(u.id) ? 'Followed' : 'Follow' })).filter(u => u.username.toLowerCase().startsWith(search.toLowerCase()))
    }, [search, users, follows]);

    const showMoreProducts = () => {
        setVisible(prev => prev + 5);
    }

    const queryClient = useQueryClient();
    const addFollow = async (id) => {
        const newFollows = follows.includes(id) ? follows.filter(fid => fid !== id) : [...follows, id];
        queryClient.setQueryData(['follows'], newFollows);

        try {
            await axios.post('http://localhost:8000/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
        } catch (err) {
            queryClient.setQueryData(['follows'], previousFollows);
            console.log(err?.response?.data);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setVisible(5);
        return;
    }
    return (
        <div data-bs-page="pixora">
            <Navbar user={user} type='type' />
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
                            placeholder='Search Galleries ...'
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