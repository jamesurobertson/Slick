import React, { useState } from "react";
import Modal from "react-modal";
import NavbarDropDown from './NavbarDropDown'
import DmBrowser from "./DmBrowser";

const NavbarHeader = (props) => {
  const [dropDownModalIsOpen, setDropDownModalIsOpen] = useState(false);
  const [dmModalIsOpen, setDmModalIsOpen] = useState(false);

  Modal.setAppElement("#root");

  function openDropDownModal(e) {

    console.log(e.target)
    setDropDownModalIsOpen(true);
  }

  function closeDropDownModal(e) {
    e.preventDefault();
    setDropDownModalIsOpen(false);
  }

  function openDmModal(e) {
    console.log(e.target)
    setDmModalIsOpen(true);
  }

  function closeDmModal(e) {
    e.preventDefault();
    setDmModalIsOpen(false);
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

  const customStyles2 = {
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
    <>
      <div className="navbar-more-container">
        <div className="navbarHeader-info" onClick={openDropDownModal}>
          <div className="navbarHeader__workspaceName">Slick</div>
          <div className="navbarHeader__userName">James Robertson</div>
        </div>
        <div className='navbarHeader__composeMessage'>
          <button
            onClick={openDmModal}
            className="navbarHeader__composeMessage"
          ></button>


        </div>
      </div>
      <Modal
        isOpen={dropDownModalIsOpen}
        onRequestClose={closeDropDownModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <NavbarDropDown closeDropDown={() => setDropDownModalIsOpen(false)}/>
      </Modal>
      <Modal
        isOpen={dmModalIsOpen}
        onRequestClose={closeDmModal}
        style={customStyles2}
        contentLabel="Example Modal"
      >
          <DmBrowser closeDmModal={() => setDmModalIsOpen(false)}/>
      </Modal>

    </>
  );
};

export default NavbarHeader;
