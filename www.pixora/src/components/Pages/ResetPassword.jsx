import axios from 'axios';
import { CheckCircle2, Eye, EyeOff, Lock as LockIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
        token: searchParams.get('token') || '',
        email: searchParams.get('email') || ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Hna ghadi t-kon l-appel Axios l Laravel: /api/password/reset
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
            // Mnb3d 3 seconds n-diwh l-Login
            setTimeout(() => navigate('/login'), 3000);
        }, 2000);

        try{
            const res = await axios.post('https://api.pixora.test/reset_password',formData,{withCredentials:true});
            if (res.data.success){
                setStatus('success');
                setLoading(false);
            }
        }catch(err){
            console.log(err?.response?.data);
        }
    };

    if (status === 'success') {
        return (
            <div className="auth-wrapper light-theme">
                <div className="auth-card glass-morphism text-center animate-in">
                    <div className="icon-box success">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2>Password Reset!</h2>
                    <p>Your password has been updated successfully. Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrapper light-theme">
            <div className="auth-card glass-morphism animate-in">
                <div className="auth-header">
                    <div className="icon-box">
                        <LockIcon size={32} />
                    </div>
                    <h2>Set New Password</h2>
                    <p>Create a strong password for your Pixora account.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div className="input-group">
                        <label>New Password</label>
                        <div className="input-wrapper">
                            <LockIcon className="input-icon" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <div className="input-wrapper">
                            <LockIcon className="input-icon" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? <span className="loader"></span> : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
