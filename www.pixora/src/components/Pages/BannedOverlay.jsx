import { LogOut, Mail, ShieldAlert } from 'lucide-react';
import React from 'react'
import { useAuth } from '../context/AuthProvider';
export const BannedOverlay = ({ user }) => {
    const handleLogout = () => {
        window.location.href = '/login';
    };

    return (
        <div data-bs-page='banned_user'>
            <div className="pixora-banned-wrapper">
                <div className="banned-card">
                    <div className="glow-1"></div>
                    <div className="glow-2"></div>

                    <div className="card-content">
                        <div className="icon-box">
                            <ShieldAlert size={48} className="alert-icon" />
                        </div>

                        <h1 className="title">Access Suspended</h1>

                        <div className="user-info">
                            <span>Account:</span> <strong>{user?.email || 'User'}</strong>
                        </div>

                        <p className="description">
                            Your account has been permanently deactivated for a serious violation of our
                            <strong> Community Guidelines</strong>. This includes actions like spamming,
                            copyright infringement, or inappropriate behavior.
                        </p>

                        <div className="action-grid">
                            <button className="btn-primary" onClick={() => window.location.href = 'mailto:support@pixora.com'}>
                                <Mail size={18} />
                                Contact Support
                            </button>

                            <button className="btn-secondary" onClick={handleLogout}>
                                <LogOut size={18} />
                                Logout Session
                            </button>
                        </div>

                        <footer className="card-footer">
                            <a href="/terms" target="_blank">
                                Review Terms of Service <externalLink size={14} />
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
