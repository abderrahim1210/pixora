import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const EditProfile = ({ user, register, errors, openModal, handleDeleteAvatar, setEdit, handleSubmit, edit, onSubmit }) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get("/json/countries.json").then((res) => res.data).then(data => {
            const filterdCountries = data.map(c => ({ id: c.id, name: c.name }));
            setCountries(filterdCountries);
        });
    }, []);
    return (
        <div className="tab-pane fade show" id="editProfile">
            <div className="card-info">
                <div className="mt-5 mx-auto">
                    <input
                        type="file"
                        className="d-none"
                        name="profileImage"
                        id="profile_img"
                        accept=".png, .jpg"
                    />
                    <img
                        src={user.photo_profile ? `https://api.pixora.test/storage/profile_pictures/${user.photo_profile}` : "/outils/pngs/useracc2.png"}
                        width="100px"
                        className="img_acc mt-2 mb-2"
                        id="imgAcc1"
                        alt=""
                        data-bs-toggle="tooltip"
                        title=""
                    />
                    <div className="d-flex justify-content-center align-items-center gap-3 text-center profile_actions mx-auto">
                        <a
                            style={{ cursor: "pointer" }}
                            onClick={() => openModal("profilePicture")}
                        >
                            <FaPencil />
                        </a>
                        <a style={{ cursor: 'pointer' }} onClick={handleDeleteAvatar}>
                            <FaTrash />
                        </a>
                    </div>
                </div>
                <div id="edit_profile">
                    <h2 className="text-center fw-bold">Account center</h2>
                    <div className="d-flex justify-content-end align-items-center">
                        <button
                            type="button"
                            className="btn"
                            id="editInfos"
                            title="Edit"
                            onClick={() => setEdit(prev => !prev)}
                        >
                            <FaPencil size={15} />
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input type="hidden" name="user_id" defaultValue="" />
                        <ul className="list-group">
                            {edit ? (
                                <div key={"edit"}>
                                    <li className="list-group-item">
                                        <strong>Username</strong>
                                        <div className="edit-div">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                {...register('username', {
                                                    validate: (value) => {
                                                        if (value === originalUser.username) return true;
                                                        return /^[a-zA-Z0-9_]{6,}$/.test(value) || 'Invalid username'
                                                    },
                                                })}
                                                defaultValue={user.username}
                                            />
                                            {errors.username && <span className="errors">{errors.username.message}</span>}
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Display name</strong>
                                        <div className="edit-div">
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('display_name')}
                                                id="userdname"
                                                defaultValue={user.display_name}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email</strong>
                                        <div className="edit-div">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="useremail"
                                                {...register('email', {
                                                    validate: (value) => {
                                                        if (value === originalUser.email) return true;
                                                        return /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/.test(value) || 'Invalid email'
                                                    },
                                                })}
                                                defaultValue={user.email}
                                            />
                                            {errors.email && <span className="errors">{errors.email.message}</span>}
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone number</strong>
                                        <div className="edit-div">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                {...register('phone', {
                                                    validate: (value) => {
                                                        if (originalUser.phone_number && value === originalUser.phone_number) return true;
                                                        return /^\+[1-9]\d{7,14}$/.test(value) || 'Invalid phone number'
                                                    },
                                                })}
                                                id="userphone"
                                                defaultValue={user.phone_number}
                                            />
                                            {errors.phone && <span className="errors">{errors.phone.message}</span>}
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Bio</strong>
                                        <div className="edit-div">
                                            <textarea
                                                id="bio"
                                                className="form-control"
                                                rows={1}
                                                {...register('bio')}
                                                defaultValue={user.bio}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Birthay</strong>
                                        <div className="edit-div">
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="userbirth"
                                                {...register('birth_date')}
                                                defaultValue={user.birth_date}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Gender</strong>
                                        <div className="edit-div">
                                            <select
                                                className="form-control"
                                                id="usergender"
                                                {...register('gender')}
                                            >
                                                <option value={user.gender} disabled hidden>Choose gender</option>
                                                <option value="Male" >Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Country</strong>
                                        <div className="edit-div">
                                            <div>
                                                <select
                                                    className="form-control"
                                                    id="countrySelect"
                                                    {...register('country')}
                                                >
                                                    <option value={user?.country}>{user?.country}</option>
                                                    {
                                                        countries.map(c => (
                                                            <option key={c.id} value={c.name}>{c.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <input
                                                    type="hidden"
                                                    name="update_location"
                                                    id="selectedCountry"
                                                    defaultValue={user.country}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Facebook</strong>
                                        <div className="edit-div">
                                            <textarea
                                                id="facebook"
                                                className="form-control"
                                                rows={1}
                                                {...register('facebook')}
                                                defaultValue={user.facebook}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Website</strong>
                                        <div className="edit-div">
                                            <textarea
                                                id="website"
                                                className="form-control"
                                                rows={1}
                                                {...register('website')}
                                                defaultValue={user.website}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>X</strong>
                                        <div className="edit-div">
                                            <textarea
                                                id="x"
                                                className="form-control"
                                                rows={1}
                                                {...register('x')}
                                                defaultValue={user.x}
                                            />
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Instagram</strong>
                                        <div className="edit-div">
                                            <textarea
                                                id="instagram"
                                                className="form-control"
                                                rows={1}
                                                {...register('instagram')}
                                                defaultValue={user.instagram}
                                            />
                                        </div>
                                    </li>
                                </div>
                            ) : (
                                <div key={"View"}>
                                    <li className="list-group-item">
                                        <strong>Username</strong>
                                        <div className="display-div">
                                            <p>{user.username}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Display name</strong>
                                        <div className="display-div">
                                            <p>{user.display_name}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Email</strong>
                                        <div className="display-div">
                                            <p>{user.email}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone number</strong>
                                        <div className="display-div">
                                            <p>{user.phone_number}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Bio</strong>
                                        <div className="display-div">
                                            <p>{user.bio}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Birthay</strong>
                                        <div className="display-div">
                                            <p>{user.birth_date}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Gender</strong>
                                        <div className="display-div">
                                            <p>{user.gender}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Country</strong>
                                        <div className="display-div">
                                            <p>{user.country}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Facebook</strong>
                                        <div className="display-div">
                                            <p className="fc">{user.facebook}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Website</strong>
                                        <div className="display-div">
                                            <p className="wb">{user.website}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>X</strong>
                                        <div className="display-div">
                                            <p className="xLink">{user.x}</p>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Instagram</strong>
                                        <div className="display-div">
                                            <p className="itgm">{user.instagram}</p>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </ul>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <button
                                type="reset"
                                className="btn tooltip-tab d-none"
                                id="resetInfos"
                                title="Reset all changes"
                            >
                                <i className="fas fa-sync" />
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`btn w-100 ${!edit && 'disabled'}`}
                            id="saveChangeBtn"
                        >
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile