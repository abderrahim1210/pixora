import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { FaCamera, FaHeart, FaUserPlus, FaUsers } from 'react-icons/fa'
import { FaMapMarkerAlt, FaChartPie, FaFire, FaHistory } from 'react-icons/fa';
const Statistics = ({ statistics }) => {
    const fetchStats = async () => {
        try {
            const res = await axios.get('https://api.pixora.test/profile_statistics', { withCredentials: true, withXSRFToken: true });
            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    const { data: stats = [], isLoading, errors } = useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats
    });
    const nicheAnalysis = stats?.nicheAnalysis ?? [];
    const audienReach = stats?.audienReach ?? [];
    const engagementScore = stats?.engagementScore ?? [];
    const topLocation = stats?.topLocation ?? 0;
    const chartData = stats?.chartData ?? [];
    return (
        <div className="tab-pane fade show" id="statistics">
            <div className="advanced-stats-grid">

                <div className="stats-card details-card">
                    <div className="card-header">
                        <FaChartPie className="icon blue" />
                        <h6>Niche Analysis</h6>
                    </div>
                    <div className="category-list">
                        {
                            nicheAnalysis?.length > 0 ? (
                                nicheAnalysis?.map((n, index) => (
                                    <div className="cat-item" key={index}>
                                        <span className="label">{n.cat_name}</span>
                                        <div className="bar-wrapper">
                                            <div className="bar-fill" style={{ width: `${Math.min(n.engagement, 100)}%` }}></div>
                                        </div>
                                        <span className="val">{parseFloat(n.engagement).toFixed(1)} Eng.</span>
                                    </div>
                                ))
                            ) : (<p className="text-muted small">No categories analyzed yet.</p>)
                        }
                    </div>
                </div>

                <div className="stats-card locations-card">
                    <div className="card-header">
                        <FaMapMarkerAlt className="icon red" />
                        <h6>Audience Reach</h6>
                    </div>
                    <ul className="location-list">
                        {
                            audienReach?.length > 0 ? (
                                audienReach?.map((a, index) => (
                                    <li key={index}><span>{a.country}</span> <strong>{a.percentage}%</strong></li>
                                ))
                            ) : (<p className="text-muted small">No audience reach analyzed yet.</p>)
                        }
                    </ul>
                </div>

                <div className="stats-card score-card">
                    <div className="card-header">
                        <FaFire className="icon orange" />
                        <h6>Engagement Score</h6>
                    </div>
                    <div className="score-display">
                        <span className="big-number">{engagementScore}</span>
                        <p>Your profile is in the top {engagementScore} of photographers this month.</p>
                    </div>
                </div>

                <div className="stats-glass-card activity-section">
                    <div className="card-header">
                        <FaHistory className="icon blue" />
                        <h6>Upload Activity</h6>
                    </div>
                    <div className="activity-chart-container">
                        {chartData.length > 0 ? (
                            chartData.map((item, i) => (
                                <div key={i} className="bar-column">
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill"
                                            style={{ height: `${Math.min((item.count / 10) * 100, 100)}%` }}
                                        >
                                            <span className="tooltip-value">{item.count}</span>
                                        </div>
                                    </div>
                                    <span className="day-label">{item.day}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No activity recorded this week.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Statistics