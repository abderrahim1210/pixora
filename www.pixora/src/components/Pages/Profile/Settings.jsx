import React from 'react'
import { FaListUl, FaLock, FaMoon, FaPaintBrush, FaUserCog, FaUserSlash, FaWallet } from 'react-icons/fa'
import { FaRightFromBracket, FaShieldHalved } from 'react-icons/fa6'
import { useModal } from '../../context/ModalProvider';
import ModalTemplate from "../Templates/ModalTemplate";
import UpdateData from '../Settings/UpdateData';
import { useTheme } from '../../context/ThemeProvider';
import DeleteAccount from '../Settings/DeleteAccount';
import { PaymentSettings } from '../Settings/PaymentSettings';
import { useNavigate } from 'react-router-dom';
const Settings = ({ handleLogOut, paymentsSettings }) => {
    const { show, openModal, closeModal } = useModal();
    const { dark, setDark } = useTheme();

    const toggleTheme = () => {
        setDark(!dark);
    }
    const navigate = useNavigate();
    return (
        <div className="tab-pane fade show" id="settings">
            {
                show === 'updateData' && (
                    <ModalTemplate show={show} closeModal={closeModal}>
                        <UpdateData handleLogOut={handleLogOut} />
                    </ModalTemplate>
                )
            }
            {
                show === 'deleteAccount' && (
                    <ModalTemplate show={show} closeModal={closeModal}>
                        <DeleteAccount />
                    </ModalTemplate>
                )
            }
            {
                show === 'paymentSettings' && (
                    <ModalTemplate show={show} closeModal={closeModal}>
                        <PaymentSettings closeModal={closeModal} />
                    </ModalTemplate>
                )
            }
            <section className="settings-page container mt-4 mb-5">
                <h2>Settings</h2>
                <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                        <FaUserCog className="me-2" />
                        Account
                    </h5>
                    <div className="setting-card">
                        <div className="setting-info">
                            <FaLock />
                            <div>
                                <h6>Change Email &amp; Password</h6>
                                <p>
                                    Update your account email address or password
                                    securely.
                                </p>
                            </div>
                        </div>
                        <button onClick={() => openModal('updateData')} className="btn btn-sm">
                            Edit
                        </button>
                    </div>
                </div>
                <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                        <FaPaintBrush className="me-2" />
                        Display &amp; Theme
                    </h5>
                    <div className="setting-card">
                        <div className="setting-info">
                            <FaMoon />
                            <div>
                                <h6>Theme</h6>
                                <p>Switch between light and dark mode.</p>
                            </div>
                        </div>
                        <button onClick={toggleTheme} type="button" className="btn btn-sm">
                            Change
                        </button>
                    </div>
                </div>
                <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                        <FaWallet className="me-2" />
                        Financials &amp; Payouts
                    </h5>
                    <div className="setting-card">
                        <div className="setting-info">
                            <FaWallet />
                            <div>
                                <h6>Payouts Accounts</h6>
                                <p>Configure your preferred method to receive earnings (PayPal active).</p>
                            </div>
                        </div>
                        <button onClick={() => openModal('paymentSettings')} type="button" className="btn btn-sm">
                            Configure
                        </button>
                    </div>
                    {
                        paymentsSettings?.length > 0 && (
                            <div className="setting-card">
                                <div className="setting-info">
                                    <FaListUl />
                                    <div>
                                        <h6>Manage Payment Methods</h6>
                                        <p>You have {paymentsSettings?.length ?? 0} connected account(s). View and switch active methods.</p>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/manage_payment_accounts')} type="button" className="btn btn-sm">
                                    Manage accounts
                                </button>
                            </div>
                        )
                    }
                </div>
                <div className="settings-group mb-4">
                    <h5 className="text-secondary mb-3">
                        <FaShieldHalved className="me-2" />
                        Security
                    </h5>
                    <div className="setting-card">
                        <div className="setting-info">
                            <FaRightFromBracket />
                            <div>
                                <h6>Log out</h6>
                                <p>Sign out from your current session.</p>
                            </div>
                        </div>
                        <a onClick={handleLogOut} style={{ cursor: "pointer" }} className="btn btn-sm">
                            Log out
                        </a>
                    </div>
                    <div className="setting-card text-danger">
                        <div className="setting-info">
                            <FaUserSlash />
                            <div>
                                <h6>Delete Account</h6>
                                <p>Permanently remove your account and all data.</p>
                            </div>
                        </div>
                        <button type="button" onClick={(() => openModal('deleteAccount'))} className="btn btn-sm">
                            Delete
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Settings