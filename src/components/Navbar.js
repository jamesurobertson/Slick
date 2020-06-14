import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changeChannel,
  postAddChannel,
  postCreateChannel,
} from "../actions/index";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NavbarHeader from './NavbarHeader'
import DmBrowse from './DmBrowser'

const Navbar = (props) => {
  const [showChannels, setShowChannels] = useState(false);
  const [showDms, setShowDms] = useState(false);
  const [navChannels, setNavChannels] = useState([]);
  const [navDms, setNavDms] = useState([])

  const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
  const [dmModalIsOpen, setDmModalIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [addChannelInput, setAddChannelInput] = useState("");

  Modal.setAppElement("#root");

  const { channels, postAddChannel, postCreateChannel, currentUserId, users } = props;

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/channel", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      });

      const allChannels = await res.json();
      const filteredOptions = allChannels.filter(
        (channel) => !channels.hasOwnProperty(channel.id) && channel.name[0] === '#'
      ).map(option => option.name)
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

  const changeChannel = (e) => {
      console.log(e.target.innerHTML)
    props.changeChannel([e.target.id, e.target.innerHTML]);
  };

  const changeDm = (e) => {
    console.log(e.target.innerHTML)

    props.changeChannel([e.target.id, e.target.innerHTML]);
  };



  // + button to add / create channels TODO: a better name?
  const browseChannels = (e) => {
    setChannelModalIsOpen(true);
  };

  const browseUserDms = (e) => {
      setDmModalIsOpen(true)
  }

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
    e.preventDefault()
    if (options.includes(addChannelInput)) {
      postAddChannel(addChannelInput)
    } else {
      postCreateChannel(addChannelInput)
    }
    setAddChannelInput('')
    closeChannelModal();
  };

  const addChannelInputHandler = e => {
    setAddChannelInput(e.target.value || e.target.innerHTML)
  }


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

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-more">
          <NavbarHeader/>
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
                    <h1 className="addChannel-form-title">Search or Create Channel</h1>
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
                    if (channel.name.startsWith('-')) return
                    return (
                      <div
                        key={channel.id}
                        className="navbar-channel"
                        id={channel.id}
                        onClick={changeChannel}
                      >
                        {`${channel.name.slice(0, 1)} ${channel.name.slice(1)}`}
                      </div>
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
              <button onClick={browseUserDms}className="navbar-dm-browser">
                <i className="fas fa-plus"></i>
              </button>
              <Modal
                isOpen={dmModalIsOpen}
                onRequestClose={closeDmModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                  <DmBrowse closeDmModal={closeDmModal}/>
              </Modal>
            </div>
            <div className="navbar-dms">
            {showDms
                ? navChannels.map((channel) => {
                    if (channel.name.startsWith('#')) return
                    return (
                      <div
                        key={channel.id}
                        className="navbar-channel"
                        id={channel.id}
                        onClick={changeDm}
                      >
                        {`${channel.name.split(' ').slice(1).map(id => {
                            if (id === currentUserId) return
                            return users[id].fullName
                        }).join('')}`}
                      </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
