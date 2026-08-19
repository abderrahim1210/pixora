import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { MessageCircleIcon, Pencil } from 'lucide-react';
export const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/notifications', { withCredentials: true, withXSRFToken: true });
            if (!res.data.success) {
                console.log(res.data);
            }
            return res.data;
        } catch (error) {
            console.error("Error loading notifications:", error);
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
        refetchInterval: 60000
    });

    const notifications = data?.all ?? [];
    const unreadCount = data?.unread?.length ?? 0;

    const markAsReadMutation = useMutation({
        mutationFn: async () => {
            return await axios.post('https://api.pixora.test/notifications/mark-as-read', {}, {
                withCredentials: true,
                withXSRFToken: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: (err) => {
            console.error("Error marking notifications as read:", err);
        }
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && unreadCount > 0) {
            markAsReadMutation.mutate();
        }
    };

    function slugiFy(text) {
        return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }

    return (
        <div className="notification-center">
            <button onClick={toggleDropdown} className="notification-center__trigger">
                <svg xmlns="http://www.w3.org/2000/svg" className="notification-center__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>

                {unreadCount > 0 && (
                    <span className="notification-center__badge">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-dropdown__header">
                        <h3>Notifications</h3>
                        <span className="notification-dropdown__count">
                            {notifications.length} total
                        </span>
                    </div>

                    <div className="notification-dropdown__list">
                        {notifications.length === 0 ? (
                            <div className="notification-dropdown__empty">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map((notif) => {
                                let parsedData = {};
                                try {
                                    parsedData = typeof notif.data === 'string' ? JSON.parse(notif.data) : notif.data;
                                } catch (e) {
                                    console.error("Error parsing notification data", e);
                                }

                                return (
                                    <div
                                        key={notif.id}
                                        className={`notification-item ${notif.read_at ? 'notification-item--read' : 'notification-item--unread'}`}
                                    >
                                        <div className="notification-item__status-icon">
                                            {notif.type.includes('PostLikedNotification') && <img src={notif.data.photo_url} alt='Photo' />}
                                            {notif.type.includes('CommentNotification') && <Link style={{ textDecoration: 'none' }} to={`/photo/${notif.data.photo_id}/${slugiFy(notif.data.photo_title ?? '')}`}><MessageCircleIcon /></Link>}
                                            {notif.type.includes('FollowNotification') && <Link style={{ textDecoration: 'none' }} to={`/photographer/${notif.data.follower_id}`}><img src={notif.data.follower_avatar ? notif.data.follower_avatar : '/outils/pngs/useracc2.png'} /></Link>}
                                            {notif.type.includes('AlertGoToPay') && <Link style={{ textDecoration: 'none' }} to={`/payment_verify/${notif.data.req_id}`}><Pencil /></Link>}
                                        </div>

                                        <div className="notification-item__content">
                                            <p className="notification-item__text">{parsedData?.message || 'New notification'}</p>
                                            <span className="notification-item__date">
                                                {moment(notif.created_at).fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="notification-dropdown__footer">
                        <button>See all on Pixora</button>
                    </div>
                </div>
            )}
        </div>
    );
}
