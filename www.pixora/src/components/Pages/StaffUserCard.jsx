import { UserCog } from 'lucide-react'
import React from 'react'
import { FaTrash, FaUserCog, FaUserMinus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const StaffUserCard = ({ user, onRemoveRole, onChangeRole, onDelete }) => {
    return (
        <div className="staff-member-card">
            <div className={`avatar-box ${user.role}`}>
                {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="user-details">
                <Link to={`/photographer/${user?.id}`}>
                    <p className="name">{user.username}</p>
                </Link>
                <span className={`role-badge ${user.role}`}>
                    {user.role}
                </span>
            </div>

            <div className="card-actions">
                <button
                    className="action-btn remove"
                    onClick={() => onRemoveRole(user.id)}
                    title="Remove Staff Role"
                >
                    <FaUserMinus />
                </button>
                <button
                    className="action-btn change"
                    onClick={() => onChangeRole(user.id,user.username,user.role)}
                    title="Change Staff Role"
                >
                    <FaUserCog />
                </button>

                <button
                    className="action-btn delete"
                    onClick={() => onDelete(user.id)}
                    title="Delete Account"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default StaffUserCard