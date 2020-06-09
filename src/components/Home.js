import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import MainContent from "./MainContent";
import { getChannels, getUserInfo, getAllMessages } from "../actions/index";

const Home = (props) => {
  const userId = localStorage.getItem("SLICK_CURRENT_USER_ID");
    const {getChannels, getUserInfo, getAllMessages } = props

  useEffect(() => {
      getChannels(userId)
      getUserInfo(userId)
  }, [getChannels, getUserInfo ,userId]);

  useEffect(() => {
      getAllMessages()
  }, [getAllMessages])

  return (
    <div className="root-container">
      <SearchBar />
      <Navbar />
      <MainContent />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChannels: (userId) => dispatch(getChannels(userId)),
    getUserInfo: (userId) => dispatch(getUserInfo(userId)),
    getAllMessages: () => dispatch(getAllMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
