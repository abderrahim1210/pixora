import React, { useState } from 'react'
import { ArrowLeft, Link, Mail, Send } from 'lucide-react'
import { Exception } from 'sass';
import axios from 'axios';
export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            setIsSent(true);
        }, 2000);

        try{
            const res = await axios.post('https://api.pixora.test/send_link_email',{email:email},{withCredentials:true});
            if (res.data.success){
                setIsSent(true);
                setLoading(false);
            }
        }catch(err){
            console.log(err?.response?.data);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-morphism">
                {!isSent ? (
                    <div className="form-container animate-in">
                        <div className="auth-header">
                            <div className="icon-box">
                                <Mail size={32} />
                            </div>
                            <h2>Forgot Password?</h2>
                            <p>No worries, we'll send you reset instructions.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-auth" disabled={loading}>
                                {loading ? <span className="loader"></span> : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="success-container animate-in text-center">
                        <div className="icon-box success">
                            <Send size={32} />
                        </div>
                        <h2>Check your email</h2>
                        <p>We've sent a password reset link to <strong>{email}</strong></p>

                        <button className="btn-auth secondary" onClick={() => setIsSent(false)}>
                            Try another email
                        </button>
                    </div>
                )}

                <div className="auth-footer">
                    <Link to="/login" className="back-link">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
