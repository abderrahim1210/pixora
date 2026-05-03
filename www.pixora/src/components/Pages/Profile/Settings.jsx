import React from 'react'
import { FaLock, FaMoon, FaPaintBrush, FaUserCog, FaUserSlash } from 'react-icons/fa'
import { FaRightFromBracket, FaShieldHalved } from 'react-icons/fa6'
import { useModal } from '../../context/ModalProvider';
import ModalTemplate from "../ModalTemplate";
import UpdateData from '../Settings/UpdateData';
import { useTheme } from '../../context/ThemeProvider';
const Settings = ({ handleLogOut }) => {
    const { show, openModal, closeModal } = useModal();
    const {dark,setDark} = useTheme();

    const toggleTheme = () => {
        setDark(!dark);
    }
    return (
        <div className="tab-pane fade show" id="settings">
            {
                show === 'updateData' && (
                    <ModalTemplate show={show} closeModal={closeModal}>
                        <UpdateData handleLogOut={handleLogOut} />
                    </ModalTemplate>
                )
            }
            <section className="settings-page container mt-4 mb-5">
                <h2>Setting</h2>
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
                        <button type="button" className="btn btn-sm">
                            Delete
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Settings