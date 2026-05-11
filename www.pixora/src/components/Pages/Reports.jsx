import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Spinner from './Spinner';
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Flag } from 'lucide-react';
import { ReportCard } from './ReportCard';
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
export const Reports = () => {
    const fetchReports = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/reports', { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                return res.data.reports;
            } else {
                console.error(res.data.message);
            }
        } catch (err) {
            console.log(err?.reponse?.data);
        }
    }

    const { data: reports = [], isLoading, error } = useQuery({
        queryKey: ['reports'],
        queryFn: fetchReports
    });

    const user = useAuth();
    const navigate = useNavigate();
    if (isLoading) return (<Spinner type={'mini'} text='Wait a few seconds for get all reports ...' />);
    if (error) return (
    <div className="error-state">
        <AlertCircle size={40} />
        <p>Error: {error.message}</p>
    </div>);
    // if (user.role !== 'admin') return navigate('/');
    return (
        <>
            <Navbar />
            <div className="reports-manager-page">
                <div className="page-header">
                    <div className="title-section">
                        <div className="icon-box">
                            <Flag size={24} />
                        </div>
                        <div>
                            <h1>Platform Reports</h1>
                            <p>Manage and review all user, photo, and comment flags.</p>
                        </div>
                    </div>

                    <div className="stats-quick-view">
                        <div className="stat">
                            <span className="count">{reports?.length || 0}</span>
                            <span className="label">Total Reports</span>
                        </div>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="reports-grid">
                    {reports && reports.length > 0 ? (
                        reports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))
                    ) : (
                        <div className="empty-reports">
                            <h3>All clean!</h3>
                            <p>No reports found on the platform right now.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer type={'dash'} />
        </>
    )
}
