import React from "react";
import {connect} from "react-redux";


const ProfileCard = (props) => {


    const messageUser = (e) => {
        console.log('message user!')
    }
  return (
    <div className="procard-container">
      <img className="procard__procardImage" alt="Profile Card" src="http://localhost:8080/aws/get_file/img-1591895220578-403534187" />
      <div className="procard__userInfo">
        <div className="procard__fullName">Bakari Holmes</div>
        <div className="procard__title">Principal Technical Mentor</div>
      </div>
      <div className="procard__buttons">
        <button onClick={messageUser}className="procard__message-button">
            Message
        </button>
      </div>
    </div>
  );
};

export default connect()(ProfileCard);
