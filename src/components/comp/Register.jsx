import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEyeSlash, faUserCircle } from '@fortawesome/free-solid-svg-icons';


export const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '24rem' }}>
        <div className="text-center mb-4">
          <FontAwesomeIcon icon={faUserCircle} size="6x" className="text-primary" />
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} className="text-primary" />
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Full Name" />
          </div>
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
              </span>
            </div>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} className="text-primary" />
              </span>
            </div>
            <input type="password" className="form-control" placeholder="Password" />
            <div className="input-group-append">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEyeSlash} className="text-primary" />
              </span>
            </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} className="text-primary" />
              </span>
            </div>
            <input type="password" className="form-control" placeholder="Confirm Password" />
            <div className="input-group-append">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEyeSlash} className="text-primary" />
              </span>
            </div>
          </div>
        </div>
        <button className="btn btn-primary w-100 mb-3">REGISTER</button>
        <div className="text-center">
          <a href="#" className="text-primary">Already have an account? Login</a>
        </div>
      </div>
    </div>
  )
}

export default Register
