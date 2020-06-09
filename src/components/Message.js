import React from "react";
import { connect } from "react-redux";
import logo from "../profileImages/profile.jpeg";

const Message = (props) => {
  return (
    <>
      <img className="message-profile-pic" src={logo} alt="profile-pic" />
      <div className="message-content">
        <div className="messageSender">{props.sender}</div>
        <div className="messageContent">{props.message}</div>
      </div>
    </>
  );
};


export default connect()(Message);
