import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost/Pixora/backend/api/log-in.php',{email,password}, { withCredentials: true });
      if(res.data.success) {
        console.log("User logged successfully");
        setError('');
        navigate('/');
      }else{
        console.log("User logged error");
        setError(res.data.message || 'Invalid credentials');
      }
    }
    catch(err){
      setError(err.response?.data?.message || 'Server error')
    }
  }
  return (
    <>
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
                  You don't have a account ? <a href="signup.php">Sign up</a>
                </div>
                <div className="mt-2 mb-2">
                  <button
                    type="submit"
                    className="btn w-100"
                    id="signupButton"
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
    </>
  );
};
