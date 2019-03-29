import React, { Component } from "react";
import "./auth-style.css";

import { signUp } from "../../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);

    document.querySelector(".form-auth").reset();
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/create" />;

    return (
      <div className="container-auth">
        <form className="form-auth" onSubmit={this.handleSubmit}>
          <h5 className="auth-header">Sign Up</h5>
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
            <label className="auth-label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="input-auth"
              type="text"
              id="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container-auth">
            <label className="auth-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input-auth"
              type="text"
              id="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <button className="polls-button auth-button">Sign up</button>
            <div className="error-container-auth ">
              {authError && <p>{authError}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
