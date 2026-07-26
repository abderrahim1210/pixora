import React, { useState } from 'react'
import { FaPaypal } from 'react-icons/fa';

export const PaymentSettings = ({ closeModal }) => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [paypal, setPaypal] = useState({
        email: '',
        isConnected: false,
    });
    const [loading, setLoading] = useState(false);
    
    const handleConnectPayPal = () => {
        setLoading(true);
        window.location.href = "https://api.pixora.test/auth/paypal/redirect";
    }
    return (
        <div className="credential-settings-body">
            <div className="step-wrapper fade-in">
                <div className="info-section">
                    <h3 className="step-title">Payment &amp; Payout Settings</h3>
                    <p className="step-desc">Connect your verified PayPal account to securely receive your earnings.</p>
                </div>

                <div className="input-grid">
                    <div className="input-field">
                        <label>Payout Method</label>
                        <select
                            className="glass-input"
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                        >
                            <option value="">Select a payment method</option>
                            <option value="paypal">PayPal (Active)</option>
                            <option value="bank_transfer" disabled>Bank Transfer (Coming Soon)</option>
                            <option value="stripe" disabled>Stripe (Coming Soon)</option>
                        </select>
                    </div>

                    {selectedMethod === 'paypal' && (
                        <div className="input-field mt-3">
                            <label>PayPal Account Status</label>

                            {paypal.isConnected ? (
                                <div className="connected-paypal-box p-3 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <FaPaypal size={20} />
                                        <span className="text-sm font-medium">Connected: {paypal.email}</span>
                                    </div>
                                    <span className="badge-verified">Verified</span>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-connect-paypal flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition"
                                    onClick={handleConnectPayPal}
                                >
                                    <FaPaypal size={18} />
                                    <span>Connect with PayPal</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="button-group mt-4">
                    <button className="back-link" onClick={closeModal} type="button">Close</button>
                </div>
            </div>
        </div>
    )
}
