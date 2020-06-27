import React from "react";
import { connect } from "react-redux";

const ChannelCard = (props) => {
    const {name, numUsers,} = props

  return (
    <>
      <div className="channelcard__title">{name}</div>
      <div className="channelcard__members">{numUsers != 1 ? `${numUsers} members` : `${numUsers} member`}</div>
    </>
  );
};

export default connect()(ChannelCard);
