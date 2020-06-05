import React, { useState } from "react";
import { connect } from "react-redux";

const Message = (props) => {
    return (
        <div className='message'>
            <div className='message-profile-pic-container'>
                <img src={props.profileImage}/>
            </div>
            <div>
                <div className='message-info'>
                    <div className='message-sender'>
                        {props.user}
                    </div>
                    <div className='message-content'>
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    )
}


mapStateToProps = state => {
    return {
        profileImage: state.profileImage
    }
}

export default connect(mapStateToProps)(Message)
