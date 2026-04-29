import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, Copyright, Ban, MessageSquare, Info, ChevronRight, Send } from 'lucide-react';
import axios from 'axios';
import { notyf } from '../../assets/js/notyf';
const Report = ({ id, user, type }) => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        try {
            const send = async () => {
                const payload = { id: id, reason: reason, description: description, type: type };
                if (!user) return navigate('/login');
                const res = await axios.post('https://api.pixora.test/send_report', { data: payload }, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    notyf.success(res.data);
                    return navigate(`/user/${user?.username}/myprofile`);
                } else {
                    console.log(res.data);
                }
            }

            send();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="pixora-report-container">
            <div className="report-header-mini mb-4">
                <h6 className="fw-bold mb-1">Help us understand</h6>
                <p className="text-muted small">Select the most relevant category for this report.</p>
            </div>

            <div className="reasons-wrapper">
                {[
                    { id: 'spam', label: 'Spam or Harassment', icon: <Ban size={18} />, color: '#6366f1' },
                    { id: 'copyright', label: 'Copyright Violation', icon: <Copyright size={18} />, color: '#f59e0b' },
                    { id: 'inappropriat_content', label: 'Inappropriat Content', icon: <ShieldAlert size={18} />, color: '#ef4444' },
                    { id: 'other', label: 'Something else', icon: <MessageSquare size={18} />, color: '#10b981' }
                ].map((r) => (
                    <div
                        key={r.id}
                        className={`report-option ${reason === r.id ? 'active' : ''}`}
                        onClick={() => setReason(r.id)}
                    >
                        <div className="option-icon" style={{ backgroundColor: reason === r.id ? r.color : 'transparent', color: reason === r.id ? '#fff' : r.color }}>
                            {r.icon}
                        </div>
                        <div className="option-content">
                            <span className="option-label">{r.label}</span>
                        </div>
                        <ChevronRight size={16} className="arrow-indicator" />
                    </div>
                ))}
            </div>

            <div className="detail-section mt-4">
                <label className="d-flex align-items-center gap-2 mb-2 small fw-bold text-uppercase text-muted">
                    <Info size={14} />
                    Details
                </label>
                <textarea
                    className="pixora-input-field"
                    placeholder="Provide additional information to help our moderators..."
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button
                className={`btn-pixora-submit ${loading ? 'is-loading' : ''}`}
                disabled={!reason || loading}
                onClick={handleSubmit}
            >
                {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                ) : (
                    <Send size={18} className="btn-icon" />
                )}
                <span className="btn-text">{loading ? 'Sending...' : 'Submit Report'}</span>
            </button>
        </div>
    )
}

export default Report