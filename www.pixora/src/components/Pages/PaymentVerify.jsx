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

  useEffect(() => {
    try {
      const send = async () => {
        const res = await axios.get(`https://api.pixora.test/check_paiment_image/${req_id}`, { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          setIsPaid(true);
        }
      }
      send();
    } catch (err) {
      console.log(err?.response?.data);
    }
  }, [req_id]);

  if (isPaid) return navigate(`/download/image/${req_id}`);
  return (
    <>
      <Navbar />
      <div className="pixora-payment-container">
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
                  }, { withCredentials: true });

                  if (res.data.success) {
                    alert('Payment successful! Photo unlocked.');
                    window.location.href = `https://www.pixora.test/download/image/${req_id}`;
                  }
                } catch (err) {
                  console.log('Error updating payment', err);
                }
              }}
            />
          </div></div>

      </div>
      <Footer type={'dash'} />
    </>
  )
}
