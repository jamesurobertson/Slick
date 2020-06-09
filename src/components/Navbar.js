import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeChannel } from "../actions/index";

const Navbar = (props) => {
  const [showChannels, setShowChannels] = useState(false);
  const [showDms, setShowDms] = useState(false);
  const [navChannels, setNavChannels] = useState([]);

  const { channels } = props;

  const expandChannels = (e) => {
    setShowChannels(!showChannels);
  };

  const expandDms = (e) => {
    setShowDms(!showDms);
  };

  const changeChannel = (e) => {
    props.changeChannel(e.target.id);
  };

  useEffect(() => {
    setNavChannels(Object.values(channels))
  }, [channels])

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-more"></div>
        <div className="navbar-channel-dms-container">
          <div className="navbar-channels-container">
            <div className="navbar__subheader">
              <div className="navbar__subheader-title" onClick={expandChannels}>
                <div
                  className={showChannels ? "arrow-down" : "arrow-right"}
                ></div>
                <div className="navbar__subheader-name"> Channels</div>
              </div>
              <button className="navbar-channel-browser"></button>
            </div>
            <div className="navbar-channels">
              {showChannels
                ? navChannels.map((channel) => {
                    return (
                      <div key={channel.id} className='navbar-channel' id={channel.id} onClick={changeChannel}>
                        {channel.name}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="navbar-dms-container">
            <div className="navbar__subheader">
              <div className="navbar__subheader-title" onClick={expandDms}>
                <div className="arrow-down"></div>
                <div className="navbar__subheader-name"> Direct Messagess</div>
              </div>
              <button className="navbar-dm-browser"></button>
            </div>
            <div className="navbar-dms">
              {/* TODO dynamicaly add users who you are messaging */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeChannel: (channel) => dispatch(changeChannel(channel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
