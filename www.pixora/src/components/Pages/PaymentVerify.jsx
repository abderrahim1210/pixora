import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { PayPalButtons } from '@paypal/react-paypal-js';

export const PaymentVerify = () => {
  const { req_id } = useParams();
  const totalAmount = 55;
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Complete Payment to Unlock Photo</h3>
        <p>Amount: ${totalAmount}</p>
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
      </div>
      <Footer type={'dash'} />
    </>
  )
}
