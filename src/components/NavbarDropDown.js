import React from "react";
// TODO: GET IMAGE FROM AWS INSTEAD
import logo from "../profileImages/profile.jpeg";
import { connect } from "react-redux";
import { updateUserInfo, logout } from "../actions/index";

const NavbarDropDown = (props) => {
  const { userInfo, updateUserInfo, logout } = props;

  if (userInfo.userInfo) {
    // console.log(userInfo.userInfo.fullName)
  }

  const userLogout = (e) => {
    window.localStorage.removeItem("SLICK_ACCESS_TOKEN");
    window.localStorage.removeItem("SLICK_CURRENT_USER_ID");
    logout({ authToken: "", currentUserId: "", activeChannel: [] });
    window.location.reload();
  };

  const changeUserStatus = (e) => {
    const user = userInfo.userInfo;
    userInfo.userInfo.status === "Active" || null
      ? (user.status = "Away")
      : (user.status = "Active");
    updateUserInfo(user);
  };
  if (!userInfo.userInfo) return null;
  return (
    <div className="navbar__dropdown-container">
      <div className="navbar__dropdown-header">
        <div className="navbar__dropdown-profileImg-container">
          <img
            className="navbar__dropdown-profileImg"
            src={logo}
            alt="profileImg"
          />
        </div>
        <div className="navbar__dropdown-userInfo">
          <div className="navbar__dropdown-fullName">
            {userInfo.userInfo.fullName}
          </div>
          <div className="navbar__dropdown-userStatus">
            You're set to{" "}
            <span className="navbar__dropdown-status">
              {userInfo.userInfo.status === "Active" ? "active" : "away"}
            </span>
            <span className="changeStatus" onClick={changeUserStatus}>
              Change
            </span>
          </div>
        </div>
      </div>
      <ul className="navbar__dropdown-links">
        <li className="navbar__dropdown-link">View Profile</li>
        <li className="navbar__dropdown-link">
          <a href="https://github.com/jamesurobertson/slick" target="_blank"> Github</a>
        </li>
        <li onClick={userLogout} className="navbar__dropdown-link">
          Logout
        </li>
      </ul>
      <div className="navbar__dropdown-listItems"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
    logout: (session) => dispatch(logout(session)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarDropDown);
