import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import MainContent from "./MainContent";

const Home = () => {
  return (
    <div className="root-container">
      <SearchBar />
      <Navbar />
      <MainContent />
    </div>
  );
};

export default connect()(Home)
