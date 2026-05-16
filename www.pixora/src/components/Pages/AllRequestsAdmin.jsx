import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import LatestRequests from './LatestRequests';
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import Spinner from './Spinner';
import { Helmet } from 'react-helmet-async';

export const AllRequestsAdmin = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const fetchRequests = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/get_requests_admin', { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                return res.data.requests;
            }
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    const { data: requests = [], isLoading, error } = useQuery({
        queryKey: ['requests'],
        queryFn: fetchRequests
    });

    const getFinalStatus = (req) => {
        const rStatus = req.request_status?.toLowerCase();
        const tStatus = req.task_status?.toLowerCase();

        if (rStatus === 'pending') return 'pending_owner';

        if (rStatus === 'accepted' && !tStatus) return 'accepted';

        if (tStatus === 'in_progress' || tStatus === 'active') return 'in_progress';

        if (tStatus === 'completed' || tStatus === 'finished') return 'finished';

        return 'unknown';
    };

    const filteredRequests = requests.filter(req => {
        if (statusFilter === 'all') return true;
        return getFinalStatus(req) === statusFilter;
    });

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'pending_owner', label: 'Pending (Owner)' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'finished', label: 'Finished' }
    ];
    return (
        <>
            <Helmet>
                <title>Pixora | All requests</title>
            </Helmet>
            <Navbar />
            <div className="all-requests-page">
                <header className="page-header">
                    <h1 className="fw-bold text-center">All requests <span className='text-primary'>({requests?.length ?? 0} request)</span></h1>

                    <div className="filter-buttons">
                        {filters.map((btn) => (
                            <button
                                key={btn.id}
                                className={`filter-btn ${statusFilter === btn.id ? 'active' : ''}`}
                                onClick={() => setStatusFilter(btn.id)}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </header>

                {isLoading ? (
                    <Spinner type={'mini'} text='Loading requests ...' />
                ) : (
                    <div className="requests-grid-wrapper">
                        <LatestRequests requests={filteredRequests} />
                    </div>
                )}
            </div>
            <Footer type={'dash'} />
        </>
    )
}
