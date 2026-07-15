import React, { useState } from 'react'
import { FaArrowRight, FaCheckCircle, FaExclamationTriangle, FaLock, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showPixoraToast } from '../../../assets/js/toast';

const DeleteAccount = () => {
    const [step, setStep] = useState(1);
    const [currentPass, setCurrPass] = useState('');
    const navigate = useNavigate();
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleVerify = () => {
        if (!currentPass) return showPixoraToast("Error : Please enter your current password !");
        setLoading(true);
        try {
            const verify = async () => {
                const res = await axios.post('https://api.pixora.test/verify_password', { password: currentPass }, { withCredentials: true, withXSRFToken: true });
                if (!res.data.success) {
                    showPixoraToast(`Error : ${res.data.message}`);
                    return setLoading(false);
                } else {
                    console.log(res.data.message);
                    setStep(2);
                }
            }
            verify();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const res = await axios.delete('https://api.pixora.test/delete_account', { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                showPixoraToast(res.data.message);
                console.log(res.data);
                return navigate('/signup');
            }else{
                console.log(res.data.message);
            }

        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="delete-account-flow credential-settings-body p-3">
            {step === 1 && (
                <div className="step-wrapper fade-in">
                    <div className="info-section">
                        <h3 className="step-title">Verify Identity</h3>
                        <p className="step-desc">Enter your current password to delete your account.</p>
                    </div>

                    <div className="input-field">
                        <label>Current Password</label>
                        <input type="password" placeholder="••••••••" className="glass-input" value={currentPass} onChange={(e) => setCurrPass(e.target.value)} />
                    </div>

                    <button
                        className={`action-btn ${loading ? 'loading' : ''}`}
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Continue'}
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="step-content flex-column animate__animated animate__fadeIn">
                    <div className="warning-card p-3 mb-3">
                        <h5 className="text-danger d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" /> What happens now?
                        </h5>
                        <ul className="mt-3 list-unstyled">
                            <li className="mb-2">⚠️ Your <strong>Pixora</strong> portfolio will be permanently deleted.</li>
                            <li className="mb-2">⚠️ All comments, likes, and galleries will be removed.</li>
                            <li className="mb-2">⚠️ This action cannot be undone.</li>
                        </ul>
                    </div>
                    <div className="form-check custom-checkbox mt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="confirmCheck"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                        />
                        <label className="form-check-label ms-2" htmlFor="confirmCheck">
                            I understand and want to proceed.
                        </label>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <button className="btn btn-light flex-grow-1" onClick={() => setStep(1)}>Back</button>
                        <button
                            className="btn btn-danger flex-grow-2"
                            disabled={!agreed}
                            onClick={() => setStep(3)}
                        >
                            Final Step
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="step-content flex-column text-center animate__animated animate__shakeX">
                    <div className="icon-wrapper mb-3 text-danger">
                        <FaTrashAlt size={50} />
                    </div>
                    <h4 className="fw-bold">Are you absolutely sure?</h4>
                    <p className="text-muted text-wrap">Once you click the button below, your account data will be wiped from our servers.</p>

                    <button
                        className="btn btn-danger w-100 mt-4 py-3 fw-bold"
                        onClick={handleDeleteAccount}
                    // disabled={loading}
                    >
                        {/* {loading ? 'Deleting Account...' : 'Yes, Delete My Account'}
                         */}
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default DeleteAccount