import React, { useState, useEffect } from "react";
import {backendUrl} from '../config/index'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeChannel,
  postAddChannel,
  postCreateChannel,
  deleteRemoveChannel,
} from "../actions/index";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NavbarHeader from "./NavbarHeader";
import DmBrowse from "./DmBrowser";

const Navbar = (props) => {
  const [showChannels, setShowChannels] = useState(false);
  const [showDms, setShowDms] = useState(false);
  const [navChannels, setNavChannels] = useState([]);

  const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
  const [dmModalIsOpen, setDmModalIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [addChannelInput, setAddChannelInput] = useState("");

  Modal.setAppElement("#root");

  const {
    channels,
    postAddChannel,
    postCreateChannel,
    currentUserId,
    users,
    deleteRemoveChannel,
    changeChannel,
  } = props;

  useEffect(() => {
    (async () => {
      const res = await fetch(`${backendUrl}/channel`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      });

      const allChannels = await res.json();
      const filteredOptions = allChannels
        .filter(
          (channel) =>
            !channels.hasOwnProperty(channel.id) && channel.name[0] === "#"
        )
        .map((option) => option.name);
      setOptions(filteredOptions);
    })();
  }, [channels]);

  useEffect(() => {
    setNavChannels(Object.values(channels));
  }, [channels]);

  const expandChannels = (e) => {
    setShowChannels(!showChannels);
  };

  const expandDms = (e) => {
    setShowDms(!showDms);
  };

  const changeChannelHandler = (e) => {
    changeChannel([
      e.target.id,
      e.currentTarget.textContent.split(" ").join(""),
    ]);
  };

  const changeDm = (e) => {
    changeChannel([e.target.id, e.currentTarget.textContent]);
  };
  // + button to add / create channels TODO: a better name?
  const browseChannels = (e) => {
    setChannelModalIsOpen(true);
  };

  const browseUserDms = (e) => {
    setDmModalIsOpen(true);
  };

  function closeChannelModal() {
    setChannelModalIsOpen(false);
  }

  function closeDmModal() {
    setDmModalIsOpen(false);
  }

  // cancel from modal
  const closeNewChannel = (e) => {
    e.preventDefault();
    setChannelModalIsOpen(false);
  };

  // adds a channel to users navbar
  const addChannel = (e) => {
    e.preventDefault();
    if (options.includes(addChannelInput)) {
      postAddChannel(addChannelInput);
    } else {
      postCreateChannel(addChannelInput);
    }
    setAddChannelInput("");
    closeChannelModal();
  };

  const addChannelInputHandler = (e) => {
    setAddChannelInput(e.target.value || e.target.innerHTML);
  };

  const removeChannel = async (e, channelId) => {
    e.preventDefault();
    await deleteRemoveChannel(channelId);
    if (channels) {
      const allChannels = Object.entries(channels);
      changeChannel([parseInt(allChannels[0][0]), allChannels[0][1].name]);
    }
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
      zIndex: "1000",
    },
  };

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "700px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "1000",
    },
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <NavbarHeader />
        </div>
        <div className="navbar-more">
          <Link to="/people">
            <div className="navbar__more-container">
              <div className="navbar__more-subheader">
                <i className="far fa-address-book" />
                <div className="navbar__subheader-name"> People </div>
              </div>
            </div>
          </Link>
          <Link to="/channelBrowser">
            <div className="navbar__more-container">
              <div className="navbar__more-subheader">
                <i className="fab fa-slack-hash" />
                <div className="navbar__subheader-name"> Channel Browser </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-channel-dms-container">
          <div className="navbar-channels-container">
            <div className="navbar__subheader">
              <div className="navbar__subheader-title" onClick={expandChannels}>
                <div
                  className={showChannels ? "arrow-down" : "arrow-right"}
                ></div>
                <div className="navbar__subheader-name"> Channels</div>
              </div>
              <button
                className="navbar-channel-browser"
                onClick={browseChannels}
              >
                <i className="fas fa-plus"></i>
              </button>
              <Modal
                isOpen={channelModalIsOpen}
                onRequestClose={closeChannelModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div style={{ width: 300 }}>
                  <div className="modalContent">
                    <div id="modal-addChannel-container">
                      <h1 className="addChannel-form-title">
                        Search or Create Channel
                      </h1>
                      <Autocomplete
                        freeSolo
                        onInputChange={addChannelInputHandler}
                        options={options}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search for Channels"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                      <div className="addChannel-form-buttons">
                        <button
                          className="addChannel-form-button addChannel-add"
                          onClick={addChannel}
                        >
                          Add
                        </button>
                        <button
                          className="addChannel-form-button addChannel-cancel"
                          onClick={closeNewChannel}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="navbar-channels">
              {showChannels
                ? navChannels.map((channel) => {
                    if (channel.name.startsWith("-")) return "";
                    return (
                      <Link key={`nav ${channel.id}`} to="/">
                          <div
                            className="navbar-channel"
                            id={channel.id}
                            onClick={changeChannelHandler}
                          >
                            {`${channel.name.slice(0, 1)} ${channel.name.slice(
                              1
                            )}`}
                          <button
                            onClick={(event) =>
                              removeChannel(event, channel.id)
                            }
                            className="channel-delete-button"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          </div>
                      </Link>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="navbar-dms-container">
            <div className="navbar__subheader">
              <div className="navbar__subheader-title" onClick={expandDms}>
                <div className={showDms ? "arrow-down" : "arrow-right"}></div>
                <div className="navbar__subheader-name"> Direct Messagess</div>
              </div>
              <button onClick={browseUserDms} className="navbar-dm-browser">
                <i className="fas fa-plus"></i>
              </button>
              <Modal
                isOpen={dmModalIsOpen}
                onRequestClose={closeDmModal}
                style={customStyles2}
                contentLabel="Example Modal"
              >
                <DmBrowse closeDmModal={closeDmModal} />
              </Modal>
            </div>
            <div className="navbar-dms">
              {showDms
                ? navChannels.map((channel) => {
                    if (channel.name.startsWith("#")) return "";
                    return (
                      <Link key={`nav ${channel.id}`} to="/">
                        <div
                          className="navbar-channel"
                          id={channel.id}
                          onClick={changeDm}
                        >
                          {
                          `${channel.name
                            .split(" ")
                            .slice(1)
                            .map((id) => {
                              if (id === currentUserId.toString()) return "";
                              return users[id].fullName;
                            })
                            .join("")}`}
                          <button
                            onClick={(event) =>
                              removeChannel(event, channel.id)
                            }
                            className="channel-delete-button"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </Link>
                    );
                  })
                : ""}
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
    users: state.users,
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeChannel: (channel) => dispatch(changeChannel(channel)),
    postAddChannel: (channelName) => dispatch(postAddChannel(channelName)),
    postCreateChannel: (channelName) =>
      dispatch(postCreateChannel(channelName)),
    deleteRemoveChannel: (channelId) =>
      dispatch(deleteRemoveChannel(channelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
