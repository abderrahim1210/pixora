import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PhotographersTemplate = ({ photographers }) => {
    const navigate = useNavigate();
    return (
        photographers?.map((u) => (
            <div className="card photographers" key={u.id}>
                <div className="card-body">
                    <div className="mt-3 mb-3">
                        <img
                            src={`${u.photo_profile
                                ? `https://api.pixora.test/storage/profile_pictures/${u.photo_profile}`
                                : "/outils/pngs/useracc2.png"
                                }`}
                            id="imgAcc"
                            width="100px"
                            height="auto"
                            alt={u.username}
                        />
                    </div>
                    <div className="mt-3 mb-3">
                        <span>
                            {u.username}
                        </span>
                    </div>
                    <div className="mt-3 mb-3">
                        <button
                            type="button"
                            className="followButton btn"
                            id="followButton"
                            onClick={() => navigate(`/photographer/${u.id}`)}
                        >
                            View profile
                        </button>
                    </div>
                </div>
            </div>
        ))
    )
}

export default PhotographersTemplate