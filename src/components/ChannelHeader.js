import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
// import {Link} from 'react-router-dom'
// TODO: add direct links to channels
import { postChannelUpdate } from "../actions/index";

const ChannelHeader = (props) => {
  const { postChannelUpdate, channel, channelName} = props;
  const [modalIsOpen, setIsOpen] = useState(false);
//   const [numUsers, setNumUsers] = useState('35')
  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }


  const changeTopic = (e) => {
    e.preventDefault();
    const newTopic = e.target.firstChild.innerText;
    postChannelUpdate(channel.id, newTopic, channel.numUsers)
    setIsOpen(false);
  };

  const customStyles = {
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
      zIndex: '1000'
    },
  };

  if (!channel) {
    return null
  }

  return (
    <div className="channel-header-outer">
      <div className="channel-header-inner">
        <div className="channel__header-name">{channelName}</div>
        <div className="channel__header-info">
          <div className="channel__header-members">
            <i className="far fa-user"></i>{channel.numUsers} |
          </div>
          <button className="channel__header-topic" onClick={openModal}>
            {channel.topic}
          </button>
          <Modal

            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 className="modal-form-title">Edit channel Topic</h1>
            <div className="modal-form-container">
              <form onSubmit={changeTopic}>
                <div
                  contentEditable
                  suppressContentEditableWarning={true}
                  name="title"
                  type="text"
                  cols="55"
                  spellCheck="true"
                >
                  {channel.topic}
                </div>
                <div className="modal-form-buttons">
                  <button
                    className="modal-form-button modal-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-form-button modal-set-topic"
                    type="submit"
                  >
                    Set Topic
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channels[state.session.activeChannel[0]],
    channelName: state.session.activeChannel[1]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postChannelUpdate: (channelId, topic, numUsers) =>
      dispatch(postChannelUpdate(channelId, topic, numUsers)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeader);
