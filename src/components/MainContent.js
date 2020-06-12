import React from "react";
import { connect } from "react-redux";
import Channel from "./Channel";
import { Route } from "react-router-dom";


const MainContent = () => {
  return (
    <div className="main-content">
        <Route exact path='/' component={Channel}/>
    </div>
  );
};

export default connect()(MainContent);
