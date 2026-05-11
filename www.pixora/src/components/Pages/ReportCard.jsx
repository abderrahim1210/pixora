import React from 'react'
import moment from 'moment'
import { Truncate } from './Truncate';
import Tooltip from '../Overlays/Tooltip';
import { ArrowRight, Calendar, MoreVertical, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
export const ReportCard = ({ report }) => {
    const getTypeTheme = () => {
        const type = report.reportable_type.toLowerCase();
        if (type.includes('photo')) return { color: '#3b82f6', label: 'Photo Content' };
        if (type.includes('comment')) return { color: '#10b981', label: 'User Comment' };
        return { color: '#8b5cf6', label: 'User Account' };
    };

    const theme = getTypeTheme();

    return (
        <div className="pixora-pro-card glass-morphism">
            <div className="card-top">
                <div className="type-indicator">
                    <div className="dot" style={{ backgroundColor: theme.color }}></div>
                    <span style={{ color: theme.color }}>{theme.label}</span>
                </div>
            </div>

            <div className="card-mid">
                <div className="reason-wrapper">
                    <ShieldAlert size={18} className="icon" />
                    <h4>{report.reason}</h4>
                </div>

                <div className="target-preview">
                    <div className="target-item">
                        <span className="label">Target:</span>
                        <span className="value">{report.target_name}</span>
                    </div>
                    <div className="target-item">
                        <span className="label">Reporter:</span>
                        <span className="value">{report.reporter_name}</span>
                    </div>
                </div>

                <p className="description">{report.description}</p>
            </div>

            <div className="card-bottom">
                <div className="time-stamp">
                    <Calendar size={14} />
                    <span>{moment(report.created_at).format('MMM DD, YYYY')}</span>
                </div>
                <Link to={`/report/${report?.id}`} className="main-action-btn" style={{ '--hover-color': theme.color, textDecoration:'none' }}>
                    Details <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
