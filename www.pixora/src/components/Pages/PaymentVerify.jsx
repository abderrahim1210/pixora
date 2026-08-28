import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { PayPalButtons } from '@paypal/react-paypal-js';

export const PaymentVerify = () => {
  const { req_id } = useParams();
  const totalAmount = 55;
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const send = async () => {
      try {
        const res = await axios.get(`https://api.pixora.test/check_payment_image/${req_id}`, { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          setIsPaid(true);
          console.log(res.data);
        } else {
          console.log(res.data)
          setError(res.data.message);
        }
      } catch (err) {
        console.log(err?.response?.data);
        setIsPaid(false);
      }
    }
    send();

  }, [req_id]);

  useEffect(() => {
    if (isPaid) {
      navigate(`/download/image/${req_id}`);
    }
  }, [isPaid, req_id, navigate]);
  return (
    <>
      <Navbar />
      <div className="pixora-payment-container">
        {
          error ? (
            <div className="pixora-error-card">
              <div className="error-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3>Access Restricted</h3>
              <p>{error}</p>
              <button className="pixora-btn-primary" onClick={() => window.history.back()}>
                Go Back
              </button>
            </div>
          ) : (
            <div className="payment-card">
              <h2>Unlock Your Edited Photo</h2>
              <p className="subtitle">Complete the secure payment below to download your high-resolution image.</p>

              <div className="amount-box">
                <span>Total to pay</span>
                <span className="price">${totalAmount} USD</span>
              </div>

              <div className="paypal-buttons-wrapper">
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalAmount,
                        },
                      }],
                    });
                  }}

                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    const realTransactionId = details.id;

                    try {
                      const res = await axios.post('https://api.pixora.test/payment/capture', {
                        req_id: req_id,
                        transaction_id: realTransactionId
                      }, { withCredentials: true, withXSRFToken: true });

                      console.log(res.data)

                      if (res.data.success) {
                        alert('Payment successful! Photo unlocked.');
                        window.location.href = `https://www.pixora.test/download/image/${req_id}`;
                      }
                    } catch (err) {
                      console.log('Error updating payment', err);
                    }
                  }}
                  onError={(err) => {
                    console.error('PayPal SDK Error:', err);
                    alert('PayPal Error: Check console for details.');
                  }}
                />
              </div></div >
          )
        }

      </div >
      <Footer type={'dash'} />
    </>
  )
}
