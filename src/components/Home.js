import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import MainContent from "./MainContent";
import { getChannels, getUserInfo } from "../actions/index";

const Home = (props) => {
  const userId = localStorage.getItem("SLICK_CURRENT_USER_ID");

  useEffect(() => {
      console.log('hi')
      props.getChannels(userId)
      props.getUserInfo(userId)
  }, []);

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
    getChannels: async (userId) => dispatch(getChannels(userId)),
    getUserInfo: async (userId) => dispatch(getUserInfo(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
