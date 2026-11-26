import React, { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import Avatar from './Avatar';
import { Truncate } from './Truncate';
import { useAuth } from '../context/AuthProvider';
import { useSearchParams } from 'react-router-dom';
import { FaCameraRetro } from 'react-icons/fa';
import { Navbar } from './Layouts/Navbar';
import { EmptyContent } from './EmptyContent';
import Spinner from './Spinner';
import { BiChevronDown, BiSearchAlt } from 'react-icons/bi';
import { Footer } from './Layouts/Footer';
import PhotographersList from './PhotographersList';
const Photographers = () => {
    const [search, setSearch] = useState("");
    const { user } = useAuth();
    const [visible, setVisible] = useState(16);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'all';
    const [pendingFollowIds, setPendingFollowIds] = useState(() => new Set());
    const [followActionError, setFollowActionError] = useState('');
    const fetchUsers = async () => {
        const res = await api.get(`/get_users/${type}`, { withCredentials: true, withXSRFToken: true });
        const uniqueUsers = res.data.users.filter((user, index, self) => index === self.findIndex(u => u.id === user.id));
        return uniqueUsers;
    }
    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ['users', type],
        queryFn: fetchUsers
    });

    const {
        data: follows = [],
        isLoading: followsLoading,
        error: followsError,
    } = useQuery({
        queryKey: ['follows'],
        queryFn: async () => {
            const res = await api.get('/follows', {
                withCredentials: true,
                withXSRFToken: true,
                skipGlobalLoading: true,
            });
            return res.data?.users?.map(f => f.following_id) || [];
        },
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
        if (pendingFollowIds.has(id) || followsLoading) return;

        await queryClient.cancelQueries({ queryKey: ['follows'] });
        const previousFollows = queryClient.getQueryData(['follows']) || follows;
        const wasFollowing = previousFollows.includes(id);
        queryClient.setQueryData(['follows'], (currentFollows = previousFollows) =>
            currentFollows.includes(id)
                ? currentFollows.filter((followedId) => followedId !== id)
                : [...currentFollows, id]
        );
        setPendingFollowIds((pending) => new Set(pending).add(id));
        setFollowActionError('');

        try {
            await api.post('/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
        } catch (err) {
            queryClient.setQueryData(['follows'], (currentFollows = []) => {
                const currentlyFollowing = currentFollows.includes(id);
                if (currentlyFollowing === wasFollowing) return currentFollows;

                return wasFollowing
                    ? [...currentFollows, id]
                    : currentFollows.filter((followedId) => followedId !== id);
            });
            setFollowActionError(err.response?.data?.message || 'Unable to update follow status. Please try again.');
        } finally {
            setPendingFollowIds((pending) => {
                const next = new Set(pending);
                next.delete(id);
                return next;
            });
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
                {(followsError || followActionError) && (
                    <p role="alert">{followActionError || 'Unable to load follow status.'}</p>
                )}
                {error ? (
                    <div className="text-center" role="alert">
                        <p>Unable to load photographers. {error.message}</p>
                        <button type="button" className="btn-show-more" onClick={() => refetch()}>
                            Try again
                        </button>
                    </div>
                ) : (
                    <PhotographersList
                        user={user}
                        filtredUsers={filtredUsers}
                        isLoading={isLoading}
                        followsLoading={followsLoading}
                        pendingFollowIds={pendingFollowIds}
                        visible={visible}
                        addFollow={addFollow}
                    />
                )}
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