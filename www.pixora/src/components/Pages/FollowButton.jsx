import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FollowButton = ({ user_id }) => {
    const { user } = useAuth();
    const { data: follows = [] } = useQuery({
        queryKey: ['follows'],
        queryFn: async () => {
            const res = await axios.get('https://api.pixora.test/follows', { withCredentials: true, withXSRFToken: true });
            return res.data?.users?.map(f => f.following_id) || [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const queryClient = useQueryClient();
    const addFollow = async (id) => {
        await queryClient.cancelQueries({ queryKey: ['follows'] });
        const newFollows = follows.includes(id) ? follows.filter(fid => fid !== id) : [...follows, id];
        const previousFollows = queryClient.getQueryData(['follows']) || [];
        queryClient.setQueryData(['follows'], newFollows);

        try {
            const res = await axios.post('https://api.pixora.test/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
        } catch (err) {
            queryClient.setQueryData(['follows'], previousFollows);
            console.log(err?.response?.data);
        }
    }

    const isFollowed = follows.includes(Number(user_id));
    const followClasse = isFollowed ? 'active' : '';
    const followText = isFollowed ? 'Followed' : 'Follow';
    const navigate = useNavigate();
    return (
        user?.id !== user_id ? (
            <button
                type="button"
                className={`followButton ${followClasse} ${(user?.role === "admin" || user?.role === "editor") ? "disabled" : ""} btn`}
                id="followButton"
                onClick={() => addFollow(user_id)}
            >
                {followText}
            </button>
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
