import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notyf } from "../../assets/js/notyf";
import { FaGoogle } from "react-icons/fa";


export const SignUp = () => {
  const [step, setStep] = useState(1);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    display_name: "",
    country: "",
    phone_number: "",
    gender: "",
    birth_date: "",
    aggres_condition: false
  });
  const navigate = useNavigate();
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);
  const [countries,setCountries] = useState([]);
  useEffect(() => {
    try{
      axios.get('/json/countries.json')
      .then(res => res.data)
      .then(data => setCountries(data));
    }catch(err){
      console.log(err);
    }
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: user.username,
        email: user.email,
        password: user.password,
        display_name: user.display_name,
        country: user.country,
        phone_number: user.phone_number,
        gender: user.gender,
        birth_date: user.birth_date,
        aggres_condition: user.aggres_condition
      }
      const res = await axios.post('http://localhost/Pixora/backend/api/sign-up.php', payload, { withCredentials: true });
      console.log(res.data)
      if (res.data.success) {
        // console.log(res.data.message);
        Swal.fire({
          icon: "success",
          title: "Sign up successfully",
          text: res.data.message,
          timer: 2000,
          showConfirmButton: true,
        });
      } else {
        notyf.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div data-bs-page="signup" id="signup">
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
          <div>
            <form
              method="post"
              id="signupForm"
            >
              {step === 1 && <StepOne next={next} step={step} navigate={navigate} />}
              {step === 2 && <StepTwo next={next} prev={prev} step={step} navigate={navigate} user={user} setUser={setUser} />}
              {step === 3 && <StepThree next={next} prev={prev} step={step} navigate={navigate} user={user} setUser={setUser} countries={countries} />}
              {step === 4 && <StepFour next={next} prev={prev} step={step} navigate={navigate} user={user} setUser={setUser} handleSubmit={handleSubmit} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function StepOne({ next, step }) {
  return (
    <section className={`step ${step === 1 ? "active" : ""}`} id="step1" data-step={1}>
      <div>Hey</div>
      <button onClick={next} className={`actionButton btn w-50 next`}>Next</button>
    </section>

  )
}

function StepTwo({ next, prev, step, navigate, user, setUser }) {
  const ok = user.username && user.email && user.password && user.aggres_condition;
  let emailreg = /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com|hotmail\.com|[a-zA-Z]\.(ma|org|com))$/;
  let passreg = /^(?=.*[a-zA-Z0-9])(?=.*\d)(?=.*[@&]).{8,}$/;
  return (
    <section className={`step ${step === 2 ? "active" : ""}`} id="step2" data-step={2}>
      <div className="text-start col">
        <div>
          <div className="form-floating mb-2">
            <input
              type="text"
              id="username"
              name="name"
              className="form-control"
              role="text"
              placeholder="Type your name ..."
              value={user.username}
              onChange={(e => setUser({ ...user, username: e.target.value }))}
              required
            />
            <label htmlFor="username" className="form-label">
              Username *
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
              value={user.email}
              style={!emailreg.test(user.email) ? { borderBottom: "2px solid red" } : { borderBottom: "2px solid green" }}
              onChange={(e => setUser({ ...user, email: e.target.value }))}
              required
            />
            <label htmlFor="useremail" className="form-label">
              Email *
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
              value={user.password}
              style={!passreg.test(user.password) ? { borderBottom: "2px solid red" } : { borderBottom: "2px solid green" }}
              onChange={(e => setUser({ ...user, password: e.target.value }))}
              required
            />
            <label htmlFor="userpass" className="form-label">
              Password *
            </label>
          </div>
          <div className="mt-2 mb-2">
            <label>
              <input
                type="checkbox"
                className="form-check-input"
                role="checkbox"
                required
                // checked={(prev) => !prev}
                onChange={(e) => setUser({ ...user, aggres_condition: e.target.checked })}
              />{" "}
              I agree to the <a href="#">Terms and Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </label>
          </div>
          <div className="mt-2 mb-2">
            You have a account ? <a href="/login" onClick={() => navigate('/login')}>Login</a>
          </div>
          <div className="connect-google">
            <button className="btn d-flex align-items-center"><FaGoogle /> Connect with google</button>
          </div>
          <div className="actions mt-2 mb-2">
            <button
              // type="submit"
              // className="btn w-100"
              // id="signupButton"
              onClick={prev} className={`actionButton btn prev`}
            // title="Click for sign up."
            >
              Prev
            </button>
            <button
              // type="submit"
              // className="btn w-100"
              id="signupButton"
              onClick={next} className={`actionButton btn next ${!ok ? "disabled" : ""}`}
            // title="Click for sign up."
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}

function StepThree({ prev, next, step, user, setUser,countries }) {
  const ok = user.display_name && user.phone_number && user.birth_date && user.country;
  let phonereg = /^\+[1-9]\d{7,14}$/;
  return (
    <section className={`step ${step === 3 ? "active" : ""}`} id="step3" data-step={3}>
      <div className="text-start col">
        <div>
          <div className="form-floating mb-2">
            <input
              type="text"
              id="displayName"
              name="dname"
              className="form-control"
              role="text"
              placeholder="Type your display name ..."
              value={user.display_name}
              onChange={(e => setUser({ ...user, display_name: e.target.value }))}
              required
            />
            <label htmlFor="displayName" className="form-label">
              Display name
            </label>
            {/* <i style={{ opacity: "calc(0.6)" }}>
              * Type just your name, we are generate it to special name
              for you
            </i> */}
          </div>
          <div className="form-floating mt-2 mb-2">
            {/* <input
              type="text"
              id="usercountry"
              className="form-control"
              name="country"
              role="text"
              placeholder="Type your country ..."
              value={user.country}
              onChange={(e => setUser({ ...user, country: e.target.value }))}
              required
            /> */}
            <select
            name="country"
            id="usercountry"
            className="form-control"
            value={user.country}
              onChange={(e => setUser({ ...user, country: e.target.value }))}
            >
              {countries.map((c) => (<option value={c.name}>{c.name}</option>))}
            </select>
            <label htmlFor="usercountry" className="form-label">
              Country
            </label>
          </div>
          <div className="form-floating mt-2 mb-2">
            <input
              type="tel"
              id="phone_number"
              className="form-control"
              name="phoneNumber"
              role="text"
              placeholder="Type your phone number ..."
              value={user.phone_number}
              style={!phonereg.test(user.phone_number) ? {borderBottom:"2px solid red"} : {borderBottom:"2px solid green"}}
              onChange={(e => setUser({ ...user, phone_number: e.target.value }))}
              required
            />
            <label htmlFor="phone_number" className="form-label">
              Phone number
            </label>
          </div>
          <div className="form-floating mt-2 mb-2">
            <select
              className="form-select"
              id="gender"
              value={user.gender}
              onChange={(e => setUser({ ...user, gender: e.target.value }))}
              required
            >
              <option value="">Choose your gender</option>
              <option value="Male">Male</option>
              <option value="Femal">Female</option>
            </select>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
          </div>
          <div className="form-floating mt-2 mb-2">
            <input
              type="date"
              id="userbirthDate"
              className="form-control"
              name="birthdate"
              role="text"
              // placeholder="Type your password ..."
              value={user.birth_date}
              onChange={(e => setUser({ ...user, birth_date: e.target.value }))}
              required
            />
            <label htmlFor="userbirthDate" className="form-label">
              Birth Date
            </label>
          </div>
          <div className="actions mt-2 mb-2">
            <button
              // type="submit"
              // className="btn w-100"
              // id="signupButton"
              onClick={prev} className={`actionButton btn prev`}
            // title="Click for sign up."
            >
              Prev
            </button>
            <button
              // type="submit"
              // className="btn w-100"
              id="signupButton"
              onClick={next} className={`actionButton btn next`}
            // title="Click for sign up."
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}

function StepFour({ prev, next, step, navigate, handleSubmit }) {
  return (
    <section className={`step ${step === 1 ? "active" : ""}`} id="step1" data-step={1}>
      <div className="text-start col">
        <div>
          <div className="actions mt-2 mb-2">
            <button
              // type="submit"
              // className="btn w-100"
              // id="signupButton"
              onClick={prev} className={`actionButton btn prev`}
            // title="Click for sign up."
            >
              Prev
            </button>
            <button
              // type="submit"
              // className="btn w-100"
              id="signupButton"
              onClick={handleSubmit} className={`actionButton btn next`}
            // title="Click for sign up."
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}