import React from "react";
import { connect } from "react-redux";
import Channel from "./Channel";
import { Route } from "react-router-dom";
import PeopleBrowser from "./PeopleBrowser";
import ChannelBrowser from './ChannelBrowser'


const MainContent = () => {
  return (
    <div className="main-content">
        <Route exact path='/' component={Channel}/>
        <Route path='/people' component={PeopleBrowser}/>
        <Route path='/channelBrowser' component={ChannelBrowser}/>
    </div>
  );
};

export default connect()(MainContent);
