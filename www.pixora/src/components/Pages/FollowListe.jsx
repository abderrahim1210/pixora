import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { EmptyContent } from './EmptyContent';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FollowButton } from './FollowButton';
import { useAuth } from '../context/AuthProvider';

export const FollowListe = ({ userId, type }) => {
    const { user } = useAuth();
    const fetchUsers = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/get_follows_liste', { params: { user_id: userId, type: type }, withCredentials: true });
            if (res.data.success) return res.data.users;
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['follows_liste', userId, type],
        queryFn: fetchUsers
    });

    return (
        <div className='follow-list-container'>
            <h3>{type === 'followers' ? 'Followers' : 'Followings'}</h3>
            {
                users?.length === 0 ? (
                    <EmptyContent icon={<Users className='faIcon' />} text={`No ${type} found it - try again later`} />
                ) : (
                    <ul className="list-items">
                        {users.map(u => (
                            <li key={u?.id} className="follow-item">
                                <div className="user-info">
                                    <img src={u?.photo_profile ? `https://api.pixora.test/storage/profile_pictures/${u?.photo_profile}` : '/outils/pngs/useracc2.png'} alt={u?.username} />
                                    <Link style={{color:'#1A1A1A',textDecoration:'none'}} to={user?.id === u.id ? `/user/${u?.username}/myprofile` : `/photographer/${u?.id}`}>{u?.username}</Link>
                                </div>
                                <FollowButton user_id={u.id} />
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}
