import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export const FollowButton = ({ user_id }) => {
    const { user } = useAuth();
    const { data: follows = [], isLoading, error } = useQuery({
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

    const queryClient = useQueryClient();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followError, setFollowError] = useState('');
    const addFollow = async (id) => {
        if (isFollowing || isLoading) return;

        await queryClient.cancelQueries({ queryKey: ['follows'] });
        const previousFollows = queryClient.getQueryData(['follows']) || [];
        const wasFollowing = previousFollows.includes(id);
        queryClient.setQueryData(['follows'], (currentFollows = previousFollows) =>
            currentFollows.includes(id)
                ? currentFollows.filter((followedId) => followedId !== id)
                : [...currentFollows, id]
        );
        setIsFollowing(true);
        setFollowError('');

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
            setFollowError(err.response?.data?.message || 'Unable to update follow status. Please try again.');
        } finally {
            setIsFollowing(false);
        }
    }

    const isFollowed = follows.includes(Number(user_id));
    const followClasse = isFollowed ? 'active' : '';
    const followText = isFollowed ? 'Followed' : 'Follow';
    const navigate = useNavigate();
    const isSelf = user?.id === user_id;
    if (error && !isSelf) {
        return <span role="alert">Unable to load follow status.</span>;
    }

    return (
        !isSelf ? (
            <>
                <button
                    type="button"
                    className={`followButton ${followClasse} ${(user?.role === "admin" || user?.role === "editor") ? "disabled" : ""} btn`}
                    id="followButton"
                    onClick={() => addFollow(user_id)}
                    disabled={isLoading || isFollowing || user?.role === "admin" || user?.role === "editor"}
                >
                    {(isLoading || isFollowing) && <Spinner type="inline" />}
                    {isLoading ? 'Loading...' : isFollowing ? 'Updating...' : followText}
                </button>
                {followError && <span className="text-danger" role="alert">{followError}</span>}
            </>
        ) : (
            <div className="mt-3 mb-3">
                <button
                    type="button"
                    className="followButton btn"
                    id="followButton"
                    onClick={() => navigate(`/user/${user?.username}/myprofile`)}
                >
                    View profile
                </button>
            </div>
        )
    )
}
