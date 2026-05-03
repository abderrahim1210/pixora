import React, { useState } from 'react'
import axios from 'axios'
import {notyf} from '../../../assets/js/notyf'
const UpdateData = ({handleLogOut}) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        current_password: '',
        new_email: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev + 1);
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        if (!form.current_password){
            notyf.error('Please enter the password !');
            return;
        }
        setLoading(true);
        try{
            const verify = async () => {
                const res = await axios.post('https://api.pixora.test/verify_password',{password:form.current_password},{withCredentials:true,withXSRFToken:true});
                if (!res.data.success){
                    notyf.error(res.data.message);
                    return setLoading(false);
                }else{
                    console.log(res.data.message);
                    setStep(2);
                }
            }
            verify();
        }catch(err){
            console.log(err?.response?.data);
        }
    }


    const handleUpdateData = () => {
        if (!form.new_email || !form.newPassword){
            notyf.error('Please enter new email or new password');
            return;
        }

        setLoading(true);
        try{
            const payload = {
                new_email:form.new_email,
                new_password:form.newPassword
                // new_password_confirmation
            }
            const update = async () => {
                const res = await axios.post('https://api.pixora.test/update_email_password',payload, {withCredentials:true, withXSRFToken:true});
                if (res.data.success){
                    console.log(res.data);
                    notyf.success(res.data.message);
                    handleLogOut();
                }else{
                    console.log(res.data);
                    notyf.error(res.data.message);
                    setLoading(false);
                }
            }
            update();
        }catch(err){
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="credential-settings-body">
            {step === 1 ? (
                <div className="step-wrapper fade-in">
                    <div className="info-section">
                        <h3 className="step-title">Verify Identity</h3>
                        <p className="step-desc">Enter your current password to update your email or password.</p>
                    </div>

                    <div className="input-field">
                        <label>Current Password</label>
                        <input type="password" placeholder="••••••••" className="glass-input" value={form.current_password} onChange={(e) => setForm(prev => ({...prev, current_password:e.target.value}))} />
                    </div>

                    <button
                        className={`action-btn ${loading ? 'loading' : ''}`}
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Continue'}
                    </button>
                </div>
            ) : (
                <div className="step-wrapper fade-in">
                    <div className="info-section">
                        <h3 className="step-title">New Credentials</h3>
                        <p className="step-desc">Update your account information below.</p>
                    </div>

                    <div className="input-grid">
                        <div className="input-field">
                            <label>New Email Address</label>
                            <input type="email" placeholder="new-email@domain.com" className="glass-input" value={form.new_email} onChange={(e) => setForm(prev => ({...prev, new_email:e.target.value}))} />
                        </div>

                        <div className="input-field">
                            <label>New Password</label>
                            <input type="password" placeholder="••••••••" className="glass-input" value={form.newPassword} onChange={(e) => setForm(prev => ({...prev, newPassword:e.target.value}))} />
                        </div>

                        {/* <div className="input-field">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="••••••••" className="glass-input" />
                        </div> */}
                    </div>

                    <div className="button-group">
                        <button className="back-link" onClick={() => setStep(1)}>Back</button>
                        <button className="action-btn save" onClick={handleUpdateData}>Update All Changes</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateData