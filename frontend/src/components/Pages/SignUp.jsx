import React from "react";

export const SignUp = () => {
  return (
    <div data-bs-page="signup">
      <div className="dv1">
        <div className="dv1-0 signup_div">
          <div>Sign up Page</div>
        </div>
        <div className="login-box text-center p-0 row">
          <div>
            <img
              src="outils/pngs/logo_styled.png"
              className="img-fluid"
              width="150px"
              alt="logo"
              title="Welcome to Pixora"
            />
          </div>
          <div className="text-start col">
            <form
              action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>"
              method="post"
              id="signupForm"
              className="d-flex justify-content-center align-items-center row"
            >
              <div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    id="username"
                    name="name"
                    className="form-control"
                    role="text"
                    placeholder="Type your name ..."
                    required=""
                  />
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <i style={{ opacity: "calc(0.6)" }}>
                    * Type just your name, we are generate it to special name
                    for you
                  </i>
                </div>
                <div className="form-floating mt-2 mb-2">
                  <input
                    type="email"
                    id="useremail"
                    className="form-control"
                    name="email"
                    role="text"
                    placeholder="Type your email ..."
                    required=""
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
                    name="password"
                    role="text"
                    placeholder="Type your password ..."
                    required=""
                  />
                  <label htmlFor="userpass" className="form-label">
                    Password
                  </label>
                </div>
                <div className="mt-2 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    role="checkbox"
                    required=""
                  />{" "}
                  I agree to the <a href="#">Terms ans Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </div>
                <div className="mt-2 mb-2">
                  You have a account ? <a href="login.php">Login</a>
                </div>
                <div className="mt-2 mb-2">
                  <button
                    type="submit"
                    className="btn w-100"
                    id="signupButton"
                    title="Click for sign up."
                  >
                    Sign up
                  </button>
                </div>
                {/*?php if(!empty($_SESSION['signerr'])): 
              <div className="container text-light p-3 bg-danger">
                {/*?= $_SESSION['signerr'];
              </div>
              {/*?php unset($_SESSION['signerr']); ?*/}
                {/*?php endif; ?*/}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
