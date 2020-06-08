import React from "react";
import { connect } from "react-redux";

const Navbar = props => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-more"></div>
        <div className="navbar-channel-dms-container">
          <div className="navbar-channels-container">
            <div className="navbar-channels-header">
              <div className="navbar-channels-title">
                <div className="arrow-right"></div>
                <div> Channels</div>
              </div>
              <button className="navbar-channel-browser"></button>
            </div>
            <div className="navbar-channels">{
                props.channels.map(channel => {
                    return <div key={channel}>{channel}</div>
                })
            }</div>
          </div>
          <div className="navbar-dm-container"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        channels: state.channels
    }
}

export default connect(mapStateToProps)(Navbar);
