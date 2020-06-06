import React, { useState } from "react";
import { connect } from "react-redux";
import {updateCurrentUser, updateToken} from '../actions/index'

const Signup = (props) => {

    console.log(props)
  // todo change backend to swap require of username/fullname
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const signup = async (e) => {
    e.preventDefault();
    console.log('hi')
    try {
      const body = { name, email, password, confirmPassword };
      const res = await fetch(`http://localhost:8080/user`, {
        method: "POST",
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

          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          props.updateToken(token)
          props.updateCurrentUser(id)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "Name":
        setName(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "Password":
        setPassword(value);
        break;
      case "ConfirmPassword":
        setConfirmPassword(value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="signup-form-container">
          <div className='signup-errors-container alert alert-danger'>
              <ul>
                  {errors.map(error => {
                      return <li key={error} className='signup-errors'>{error}</li>
                  })}
              </ul>
          </div>
        <form className="signup-form" action="/users" onSubmit={signup}>
          <label>Name </label>
          <input
            type="text"
            name="Name"
            onChange={formChangeHandler}
            placeholder="Your full name"
            value={name}
            required
          ></input>
          <label>Email </label>
          <input
            type="text"
            name="Email"
            onChange={formChangeHandler}
            placeholder="name@work-email.com"
            value={email}
            required
          ></input>
          <label>Password </label>
          <input
            type="password"
            name="Password"
            id="password"
            onChange={formChangeHandler}
            placeholder="8 characters or more"
            value={password}
            required
          ></input>
          <label>Confirm Password </label>
          <input
            type="password"
            name="ConfirmPassword"
            onChange={formChangeHandler}
            value={confirmPassword}
            required
          ></input>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateToken: (token) => dispatch(updateToken(token)),
        updateCurrentUser: (currentUserId) => dispatch(updateCurrentUser(currentUserId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
