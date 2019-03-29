import React, { Component } from "react";
import "./auth-style.css";

import { connect } from "react-redux";
import { signIn } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";

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
    this.props.signIn(this.state);
    document.querySelector(".form-auth").reset();
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/create" />;

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
    signIn: credentials => dispatch(signIn(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
