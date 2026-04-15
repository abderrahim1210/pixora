import React from 'react'
import { Truncate } from './Truncate'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { EmptyContent } from './EmptyContent'
import { FaCameraRetro } from 'react-icons/fa'
import Spinner from './Spinner'

const PhotographersList = ({ user,filtredUsers, isLoading, visible,addFollow }) => {
    const navigate = useNavigate();
    return (

        <div className="container-fluid div3">
            {
                !isLoading ? filtredUsers?.length > 0 ? (
                    filtredUsers?.slice(0, visible).map((u) => (
                        <div className="card photographers" key={u.id}>
                            <div className="card-body">
                                <div className="mt-3 mb-3">
                                    <Avatar src={`http://localhost:8000/storage/profile_pictures/${u.photo_profile}`} size={80} />
                                </div>
                                <div className="mt-3 mb-3">
                                    <Truncate text={u.username} maxChars={20}>
                                        {({ text }) => (
                                            <Link to={`/photographer/${u.id}`}>{text}</Link>
                                        )}
                                    </Truncate>
                                </div>
                                {u.id !== user?.id ? (
                                    <div className="mt-3 mb-3">
                                        <button
                                            type="button"
                                            className={`followButton ${u.followClasse} ${user && user?.role === "admin" && "disabled"} btn`}
                                            id="followButton"
                                            onClick={() => addFollow(u.id)}
                                        >
                                            {u.followText}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-3 mb-3">
                                        <button
                                            type="button"
                                            className="followButton btn"
                                            id="followButton"
                                            onClick={() => navigate(`${user && user?.username}/myprofile`)}
                                        >
                                            View profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyContent icon={<FaCameraRetro className='faIcon' />} text={'No photographers found - Try searching with another name'} />
                ) : (<Spinner type={'mini'} text='Wait a few seconds for load all photographers' />)}
        </div>

    )
}

export default PhotographersList