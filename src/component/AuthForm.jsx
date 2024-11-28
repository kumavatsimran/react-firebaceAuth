import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup } from 'firebase/auth';
import React from 'react';
import  { useState } from 'react'
import {auth} from "../conig"
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [user, setUser] = useState({});
    const [signIn, setSignIn] = useState(false);
    const navigate=useNavigate();
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        
      };

     const handleSubmit=(e)=>{
        e.preventDefault();
 if (signIn) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
    } else {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
        setUser("")
     } 
     const handleGoogleAuth =()=>{
      signInWithPopup(auth, provider)
    }

  return (
    <><div className=" bg-dark  p-5 ">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg rounded mt-5 bg-black">
          <div className="card-header text-center  text-white">
            <h3>{signIn ? "Welcome Back!" : "Join Us Today!"}</h3>
            <p>{signIn ? "Sign in to continue" : "Create an account to get started"}</p>
          </div>
          <div className="card-body p-4">
            <div className="d-flex justify-content-center mb-4">
              <button
                onClick={() => setSignIn(false)}
                className={`btn ${!signIn ? "btn-primary" : "btn-outline-primary"} me-2`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setSignIn(true)}
                className={`btn ${signIn ? "btn-primary" : "btn-outline-primary"}`}
              >
                Sign In
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary mb-3">
                  {signIn ? "Sign In" : "Sign Up"}
                </button>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-google me-2"></i> Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</>
  )
}

export default AuthForm;
