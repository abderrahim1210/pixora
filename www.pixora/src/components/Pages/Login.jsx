import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { notyf } from "../../assets/js/notyf";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
import Cookies from 'js-cookie';
import { api } from "../utils/getUser";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('https://api.pixora.test/sanctum/csrf-cookie', { withCredentials: true, withXSRFToken: true });
      // const xsrfToken = Cookies.get('XSRF-TOKEN');
      const res = await axios.post('https://api.pixora.test/login', { email, password }, {
        withCredentials: true, withXSRFToken: true, headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify());
        setError('');
        navigate('/');
      } else {
        console.log("User logged error");
        setError(res.data.message || 'Invalid credentials');
      }
    }
    catch (err) {
      setError(err.response?.data?.message || 'Server error')
    }
  }
  useEffect(() => {
    if (location.state?.liked) {
      notyf.error(location.state.message);
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state]);
  return (
    <div data-bs-page="login" id="login">
      <div className="dv1">
        <div className="dv1-0 login_div">
          <div>Login Page</div>
        </div>
        <div className="login-box text-center p-0 row">
          <div>
            <img
              src="/outils/pngs/logo_styled.png"
              className="img-fluid"
              width="150px"
              alt="logo"
              title="Welcome to Pixora"
            />
          </div>
          <div className="text-start col">
            <form
              onSubmit={handleSubmit}
              id="signupForm"
              className="d-flex justify-content-center align-items-center row"
            >
              <div>
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="email"
                    id="useremail"
                    className="form-control"
                    name="useremail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    role="text"
                    placeholder="Type your email ..."
                  />
                  <label htmlFor="useremail" className="form-label">
                    Email
                  </label>
                </div>
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="password"
                    id="userpass"
                    className="form-control"
                    name="userpass"
                    role="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password ..."
                  />
                  <label htmlFor="userpass" className="form-label">
                    Password
                  </label>
                </div>
                <div className="mt-2 mb-2">
                  You don't have a account ? <Link to={'/signup'}>Sign up</Link>
                </div>
                <div className="actionsButton mt-2 mb-2">
                  <button
                    type="submit"
                    className="btn w-100 actionButton"
                    title="Click for login."
                  >
                    Login
                  </button>
                </div>
                {error && <div className="container p-3 text-light bg-danger"><p>{error}</p></div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
