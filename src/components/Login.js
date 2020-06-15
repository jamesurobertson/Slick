import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import {
  updateCurrentUser,
  updateToken,
  updateUserInfo,
} from "../actions/index";
import {Link} from 'react-router-dom'

const Login = (props) => {
  // todo change backend to swap require of username/fullname
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password };
      const res = await fetch(`http://localhost:8080/user/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw res;
      const response = await res.json();

      if (response[0] === "ERRORS") {
        response.splice(0, 1);
        setErrors(response);
      } else {
        const {
          token,
          user: { id },
        } = response;

        localStorage.setItem("SLICK_ACCESS_TOKEN", token);
        localStorage.setItem("SLICK_CURRENT_USER_ID", id);

        setEmail("");
        setPassword("");
        props.updateToken(token);
        props.updateCurrentUser(id);
        props.updateUserInfo({ email });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="signup-form-container">
        <div className="signup-errors-container alert alert-danger">
          <ul>
            {errors.map((error) => {
              return (
                <li key={error} className="signup-errors">
                  {error}
                </li>
              );
            })}
          </ul>
        </div>
        <form
          onSubmit={login}
          id="login-profile-form"
          className="edit-profile-form"
        >
          <div className="edit-form-input">
            <TextField
              name="email"
              onChange={formChangeHandler}
              fullWidth
              id="login-form-email"
              label="Email"
              variant="outlined"
              defaultValue={email}
            />
          </div>
          <div className="edit-form-input">
            <TextField
              type="password"
              name="password"
              onChange={formChangeHandler}
              fullWidth
              id="login-form-fullName"
              label="Password"
              variant="outlined"
              defaultValue={password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
            <Link to='/register'>Don't have an Account? Click here to register.</Link></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userFullName: state.userInfo.fullName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateToken: (token) => dispatch(updateToken(token)),
    updateCurrentUser: (currentUserId) =>
      dispatch(updateCurrentUser(currentUserId)),
    updateUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
