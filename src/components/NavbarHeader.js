import React, { useState } from "react";
import Modal from "react-modal";
import NavbarDropDown from './NavbarDropDown'

const NavbarHeader = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "96px",
      left: "11px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "300px",
      backgroundColor: 'whitesmoke',
      padding: '0',
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      zIndex: "20",
    },
  };

  const composeMessage = (e) => {
    e.preventDefault();
    console.log(`compose message!`);
  };


  return (
    <>
      <div onClick={openModal} className="navbar-more-container">
        <div className="navbarHeader-info">
          <div className="navbarHeader__workspaceName">Slick</div>
          <div className="navbarHeader__userName">James Robertson</div>
        </div>
        <div>
          <button
            onClick={composeMessage}
            className="navbarHeader__composeMessage"
          ></button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <NavbarDropDown/>
      </Modal>
    </>
  );
};

export default NavbarHeader;
