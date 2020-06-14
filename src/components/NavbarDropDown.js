import React, {useState} from "react";
import { connect } from "react-redux";
import { updateUserInfo, logout } from "../actions/index";
import Modal from "react-modal";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";

const NavbarDropDown = (props) => {
  const { userInfo, updateUserInfo, logout, closeDropDown } = props;
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  Modal.setAppElement("#root");
  function closeUserCard() {
    setShowProfileCard(false);
  }

  function closeEditProfile() {
    setShowEditProfile(false);
  }

  const profileCardStyles = {
    content: {
        top: "50%",
        left: "25%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: '0',
        border: 'none',
        borderRadius: '5px',
        transform: "translate(-50%, -50%)",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        zIndex: '1000'
      },
  };

  const editProfileCardStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "1000",
    },
  };

  const openProfileCard = (e) => {
      setShowProfileCard(true);
  };

  const openEditProfile = () => {
    closeUserCard();
    setShowEditProfile(true);
  };

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
      <>
    <div className="navbar__dropdown-container">
      <div className="navbar__dropdown-header">
        <div className="navbar__dropdown-profileImg-container">
          <img
            className="navbar__dropdown-profileImg"
            src={userInfo.userInfo.profileImageUrl}
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
        <li onClick={openProfileCard} className="navbar__dropdown-link">View Profile</li>
        <li className="navbar__dropdown-link">
          <a href="https://github.com/jamesurobertson/slick" rel="noopener noreferrer" target="_blank"> Github</a>
        </li>
        <li onClick={userLogout} className="navbar__dropdown-link">
          Logout
        </li>
      </ul>
      <div className="navbar__dropdown-listItems"></div>
    </div>
    <Modal
    isOpen={showProfileCard}
    onRequestClose={closeUserCard}
    style={profileCardStyles}
    contentLabel="Example Modal"
  >
    <ProfileCard userId={localStorage.getItem('SLICK_CURRENT_USER_ID')} openEditProfile={openEditProfile} />
  </Modal>
  <Modal
        isOpen={showEditProfile}
        onRequestClose={closeEditProfile}
        style={editProfileCardStyles}
        contentLabel="Example Modal"
      >
        <EditProfile closeDropDown={closeDropDown} closeModal={closeEditProfile}/>
      </Modal>
  </>
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
