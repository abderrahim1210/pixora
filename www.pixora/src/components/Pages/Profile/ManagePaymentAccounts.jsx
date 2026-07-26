import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import Spinner from '../Spinner';
import { EmptyContent } from '../EmptyContent';
import { CircleAlert } from 'lucide-react';
import { FaCheckCircle, FaCreditCard, FaPaypal, FaPlus, FaStar, FaTrash, FaUniversity } from 'react-icons/fa';
import { Navbar } from '../Layouts/Navbar';
import { Footer } from '../Layouts/Footer';
import { useModal } from '../../context/ModalProvider';
import { PaymentSettings } from '../Settings/PaymentSettings';
import ModalTemplate from "../Templates/ModalTemplate";
import { showPixoraToast } from '../../../assets/js/toast';
import Swal from 'sweetalert2';

export const ManagePaymentAccounts = () => {
  const { show, openModal, closeModal } = useModal();
  const { data, isLoading, error } = useQuery({
    queryKey: ['payment_accounts'],
    queryFn: async () => {
      const res = await axios.get('https://api.pixora.test/get_payment_accounts', { withCredentials: true, withXSRFToken: true });
      if (res.data.success) return res.data;
    }
  });

  const getMethodDetails = (type, creds) => {
    switch (type?.toLowerCase()) {
      case 'paypal':
        return {
          name: 'Paypal',
          icon: <FaPaypal size={22} />,
          styleClass: 'paypal-style',
          identifier: creds?.email || 'Paypal Account'
        };
      case 'stripe':
      case 'card':
        return {
          name: 'Credit Card',
          icon: <FaCreditCard size={22} />,
          styleClass: 'stripe-style',
          identifier: `•••• •••• •••• ${creds?.last4 || '****'}`
        };
      case 'bank':
        return {
          name: 'Bank Transfer',
          icon: <FaUniversity size={22} />,
          styleClass: 'bank-style',
          identifier: creds?.account_name || 'Account'
        };
      default:
        return {
          name: type?.toUpperCase() || 'Payment Method',
          icon: <FaCreditCard size={22} />,
          styleClass: 'default-style',
          identifier: creds?.account_name || 'Account'
        };
    }
  }

  const payment_accounts = data?.accounts ?? [];

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`https://api.pixora.test/delete_payout_account/${id}`, { withCredentials: true, withXSRFToken: true });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(['payment_accounts']);
        showPixoraToast(data.message);
      }
    },
    onError: (error) => {
      console.error(error.response?.data?.message || 'Error deleting account');
    }
  });
  const delete_account = (id) => {
    Swal.fire({
      title: 'Delete account',
      text: 'Are you sure for delete this account ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it',
      confirmButtonColor: '#ed3d3d',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    })
  }
  return (
    <>
      {
        show === 'paymentSettings' && (
          <ModalTemplate show={show} closeModal={closeModal}>
            <PaymentSettings closeModal={closeModal} />
          </ModalTemplate>
        )
      }
      <div className='pixora-dashboard-wrapper'>
        <Navbar />
        {
          isLoading ? (<Spinner type={'mini'} text='Payment accounts is loading, wait a few secends ...' />) : error ? (<EmptyContent icon={<CircleAlert className='faIcon' />} text={'Error in loading payment accounts operation - try again later !'} />) : (<main className='dashboard-content-area'>
            <div className="pixora-dashboard-card payment-accounts-widget-light">
              <div className="widget-header">
                <div className="title-area">
                  <h3>Manage Payment Accounts</h3>
                  <p>Configure your default payout method or link new ones.</p>
                </div>
                <button
                  className="pixora-btn-primary"
                  onClick={() => openModal('paymentSettings')}
                >
                  <FaPlus size={14} />
                  <span>Add Account</span>
                </button>
              </div>

              <div className="widget-content">
                <div className="accounts-list-container">
                  {payment_accounts.length > 0 ? (
                    payment_accounts.map((account) => {
                      const details = getMethodDetails(account.method_type, account.credentials);
                      return (
                        <div
                          key={account.id}
                          className={`account-row-item ${account.is_default ? 'is-active' : ''}`}
                        >
                          <div className="account-main-info">
                            <div className={`method-icon-box ${details.badgeClass}`}>
                              {details.icon}
                            </div>
                            <div className="account-details-text">
                              <div className="identifier-row">
                                <span className="identifier-text">{details.identifier}</span>
                                {account.is_default && (
                                  <span className="active-badge-pill">
                                    <FaCheckCircle size={10} /> Active
                                  </span>
                                )}
                              </div>
                              <span className="method-type-label">{details.name}</span>
                            </div>
                          </div>

                          <div className="account-actions-box">
                            {!account.is_default && (
                              <button
                                className="action-icon-btn star-btn"
                                onClick={() => setDefaultMutation.mutate(account.id)}
                                title="Set as Active"
                              >
                                <FaStar size={14} />
                              </button>
                            )}
                            <button
                              className="action-icon-btn delete-btn"
                              onClick={() => delete_account(account.id)}
                              title="Delete Account"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="empty-state-box">
                      <p>No payout accounts connected yet. Link an account to receive payouts.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>)
        }
        <Footer type={'dash'} />
      </div>
    </>
  )
}
