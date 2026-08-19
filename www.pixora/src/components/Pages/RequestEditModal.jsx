import React, { use, useState } from 'react'
import { showPixoraToast } from '../../assets/js/toast';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const RequestEditModal = ({ photo }) => {
    const [step, setStep] = useState(1);
    const [requestMessage, setRequestMessage] = useState('');
    const [request, setRequest] = useState("");
    const EDITION_PRICE = 50;
    const PLATFORM_FEE = 5;
    const { user } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['payment-account'],
        queryFn: async () => {
            const res = await axios.get('https://api.pixora.test/get_payment_account', { withCredentials: true, withXSRFToken: true });
            return res.data;
        },
    });

    if (isLoading) return <Spinner type={'mini'} />;

    const payment_account = data?.account ?? null;
    console.log(payment_account);

    const requestEditForm = async () => {
        try {
            const sendRequestEdit = async () => {
                const res = await axios.post('https://api.pixora.test/send_request', { message: requestMessage, owner_id: photo?.user?.id, image_id: photo?.id }, { withCredentials: true, withXSRFToken: true });
                if (res.data.success) {
                    showPixoraToast(res.data.message);
                    window.location.reload();
                    return;
                } else {
                    console.log(res.data.message);
                }
            }

            sendRequestEdit();
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    return (
        <div className="modal-body-content request-edit-modal">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div>
                    <p className="text-muted mb-0 small">Request Edition</p>
                    <strong className="fs-6">{photo?.title}</strong>
                </div>
                <span className="badge bg-secondary">Step {step} of 3</span>
            </div>

            {step === 1 && (
                <div className="step-content">
                    <label className="form-label small fw-bold">1. Describe your edits</label>
                    <textarea
                        name="request_message"
                        className="pixora-text-area form-control mb-3"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        placeholder="Describe how you want this photo edited..."
                        rows={4}
                    />
                    <button
                        className="btn-send-request w-100 py-2"
                        onClick={() => setStep(2)}
                        disabled={!requestMessage.trim()}
                    >
                        Next: Payment Method
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="step-content">
                    <label className="form-label small fw-bold mb-2">2. Payment Method Check</label>
                    <div className="payment-verification-box p-3 mb-3 border rounded bg-light">
                        {isLoading ? (
                            <p className="small text-muted mb-0">Checking payment accounts...</p>
                        ) : payment_account ? (
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="badge bg-success">Active</span>
                                    <span className="small fw-semibold">Card ending in {payment_account.credentials.email} ({payment_account?.credentials?.email})</span>
                                </div>
                                <Link to="/settings/profile" className="small text-decoration-underline">Change</Link>
                            </div>
                        ) : (
                            <div className="alert alert-warning p-2 mb-0 small">
                                <span>No active payment method found. </span>
                                <Link to={`/user/${user?.username}/myprofile`} className="fw-bold alert-link">Add payment method in settings</Link>
                            </div>
                        )}
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary w-50 py-2" onClick={() => setStep(1)}>
                            Back
                        </button>
                        <button
                            className={`btn-send-request w-50 py-2 ${!payment_account ? 'opacity-50' : ''}`}
                            onClick={() => setStep(3)}
                            disabled={!payment_account}
                        >
                            Next: Summary
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="step-content">
                    <label className="form-label small fw-bold mb-2">3. Price Summary & Confirm</label>
                    <div className="price-details-box p-3 mb-3 border rounded">
                        <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Editing Base Price</span>
                            <span>{EDITION_PRICE} MAD</span>
                        </div>
                        <div className="d-flex justify-content-between small text-muted mb-2">
                            <span>Platform Service Fee</span>
                            <span className="text-end">{PLATFORM_FEE} MAD</span>
                        </div>
                        <hr className="my-1" />
                        <div className="d-flex justify-content-between fw-bold text-dark">
                            <span>Total to pay (upon acceptance)</span>
                            <span>{EDITION_PRICE + PLATFORM_FEE} MAD</span>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary w-50 py-2" onClick={() => setStep(2)}>
                            Back
                        </button>
                        <button className="btn-send-request w-50 py-2" onClick={requestEditForm}>
                            Confirm & Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
