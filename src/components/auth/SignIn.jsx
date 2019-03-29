import React, { Component } from "react";
import "./auth-style.css";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    document.querySelector(".form-auth").reset();
  };

  render() {
    return (
      <div className="container-auth">
        <form className="form-auth" onSubmit={this.handleSubmit}>
          <h5 className="auth-header">Sign In</h5>
          <div className="input-container-auth">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              className="input-auth"
              type="email"
              id="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container-auth">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-auth"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container-auth">
            <button className="polls-button auth-button">Login</button>
            <div className="error-container-auth center">
              {/* {authError && <p>{authError}</p>} */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
