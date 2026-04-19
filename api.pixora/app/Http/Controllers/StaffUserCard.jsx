import React from 'react'
import { FaTrash, FaUserMinus } from 'react-icons/fa'

const StaffUserCard = ({ user }) => {
    return (
        <div className="staff-member-card">
            <div className={`avatar-box ${user.role}`}>
                {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="user-details">
                <p className="name">{user.username}</p>
                <span className={`role-badge ${user.role}`}>
                    {user.role}
                </span>
            </div>

            <div className="card-actions">
                {/* Button: Remove Role (y-welli user 3adi) */}
                <button
                    className="action-btn remove"
                    onClick={() => onRemoveRole(user.id)}
                    title="Remove Staff Role"
                >
                    <FaUserMinus />
                </button>

                {/* Button: Delete User */}
                <button
                    className="action-btn delete"
                    onClick={() => onDelete(user.id)}
                    title="Delete Account"
                >
                    <FaTrash />
                </button>
            </div>
            {/* <div className="online-status"></div> */}
        </div>
    )
}

export default StaffUserCard