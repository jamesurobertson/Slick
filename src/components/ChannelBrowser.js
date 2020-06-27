import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import { changeChannel, postAddChannel } from "../actions/index";

const ChannelBrowser = (props) => {
  const [channelArray, setChannelArray] = useState([]);
  const [userChannels, setUserChannels] = useState([])
  const [searchInput, setSearchInput] = useState("");

  const { channels, changeChannel, postAddChannel } = props;

  const searchForm = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/channel", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      });

      const allChannels = await res.json();
      const filteredOptions = allChannels
        .filter(
          (channel) =>
            channel.name[0] === "#"
        )

      setChannelArray(filteredOptions);
    })();
  }, [channels]);

  useEffect(() => {
      setUserChannels(Object.values(channels).map(channel => channel.name))
  }, [channels])

  useEffect(() => {
    searchForm.current.focus();
  });

  const searchChannels = (e) => {
    e.preventDefault();
    console.log(`search for ${searchInput}`);
    setSearchInput("");
  };

  const searchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const changeChannelHandler = (e) => {
    const channelName = e.currentTarget.firstChild.innerHTML;
    console.log(channelName)
    for (let i = 0; i < channelArray.length; i++ ) {
        const channel = channelArray[i]
        if (channel.name === channelName) {
            if (userChannels.includes(channelName)) {
                changeChannel([channel.id, channel.name]);
            } else {
                postAddChannel(channelName)
            }
            return
        }
    }

    }

  return (
    <div className="channel-browser__container">
      <div className="channel-browser__header">
        <div className="channel-browser__title">Channel Browser</div>
        <div className="channel-browser__channels">
          <div className="channel-browser__channel"> Channels</div>
        </div>
        <div className="message-input-container-inner">
          <form className="people-search-form" onSubmit={searchChannels}>
            <input
              ref={searchForm}
              className="message-input"
              onChange={searchChange}
              value={searchInput}
              placeholder={`Serach by channel name`}
            />
          </form>
        </div>
        <div className="channel-browser__channel-count">{`${channelArray.length} Channels`}</div>
      </div>
      <div className="channel-browser-cards">
        {channelArray.map((channel) => {
          const { name, numUsers } = channel;
          return (
            <Link to="/">
              <div
                className="channelcard__container"
                onClick={changeChannelHandler}
                key={name}
              >
                <ChannelCard name={name} numUsers={numUsers} />
              </div>
            </Link>
          );
        })}
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
    postAddChannel: (channelName) => dispatch(postAddChannel(channelName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBrowser);
