import React from 'react'
import { FaCamera, FaHeart, FaUserPlus, FaUsers } from 'react-icons/fa'

const Statistics = ({statistics}) => {
    return (
        <div className="tab-pane fade show" id="statistics">
            <div className="mt-2 mb-2">
                <h2>Statistics</h2>
                <p>
                    Track your progress and see how your profile evolves over
                    time
                </p>
                <div className="stat-container">
                    <div className="stat-card">
                        <FaUserPlus size={25} className="stat-icon" />
                        <h3>Following</h3>
                        <p>{statistics?.followings ?? 0}</p>
                    </div>
                    <div className="stat-card">
                        <FaHeart size={25} className="stat-icon" />
                        <h3>Likes</h3>
                        <p>{statistics?.likes ?? 0}</p>
                    </div>
                    <div className="stat-card">
                        <FaUsers size={25} className="stat-icon" />
                        <h3>Followers</h3>
                        <p>{statistics?.followers ?? 0}</p>
                    </div>
                    <div className="stat-card">
                        <FaCamera size={25} className="stat-icon" />
                        <h3>Photos</h3>
                        <p>{statistics?.photosCount ?? 0}</p>
                    </div>
                </div>
                <div className="container statisticsGraph">
                    <canvas id="statisticsChart" height="auto" />
                </div>
            </div>
        </div>
    )
}

export default Statistics