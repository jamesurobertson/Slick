import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeChannel, postAddChannel } from "../actions/index";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const Navbar = (props) => {
  const [showChannels, setShowChannels] = useState(false);
  const [showDms, setShowDms] = useState(false);
  const [navChannels, setNavChannels] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [addChannelInput, setAddChannelInput] = useState("");

  Modal.setAppElement("#root");

  const loading = open && options.length === 0;
  const { channels, postAddChannel } = props;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const res = await fetch("http://localhost:8080/channel", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      });

      const channels = await res.json();
      console.log(channels);
      if (active) {
        setOptions(channels.map((channel) => channel));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const expandChannels = (e) => {
    setShowChannels(!showChannels);
  };

  const expandDms = (e) => {
    setShowDms(!showDms);
  };

  const changeChannel = (e) => {
    props.changeChannel([e.target.id, e.target.innerHTML]);
  };

  useEffect(() => {
    setNavChannels(Object.values(channels));
  }, [channels]);

  const browseChannels = (e) => {
    console.log(`browsing channels!`);
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addChannel = (e) => {
      postAddChannel(addChannelInput)
      closeModal()
  };

  const addChannelHandler = e => {
      setAddChannelInput(e.target.innerHTML)
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
    },
  };

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
              <button
                className="navbar-channel-browser"
                onClick={browseChannels}
              >
                <i className="fas fa-plus"></i>
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                  <div style={{ width: 300 }}>
                    <Autocomplete
                      onChange={addChannelHandler}
                      id="channel-browser"
                      style={{ width: 300 }}
                      open={open}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={(option) => option.name}
                      options={options}
                      loading={loading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search for Channels"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                  <button onClick={addChannel} type="submit">Add</button>
              </Modal>
            </div>
            <div className="navbar-channels">
              {showChannels
                ? navChannels.map((channel) => {
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
              <button className="navbar-dm-browser">
                <i className="fas fa-plus"></i>
              </button>
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
    postAddChannel: (channelName) => dispatch(postAddChannel(channelName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
