import React from 'react';
import {connect} from 'react-redux'


const Profile = (props) => {


    return (
        <div className='profile__container'>
            <div className='profile__header'>
                <h1>Profile</h1>
            </div>
            <div className='profile__main'>
                <img className='profile__profileImage' alt='profile' src=''/>
                <div className='profile__userInfo'>
                    <h1 className='profile__fullName'>Bakari Holmes</h1>
                    <h2 className='profile__title'>Principal Technical Mentor</h2>
                </div>
                <div className='profile__buttons'>
                    <button className='profile__message-button'>
                    <i className="profile__message-button-icon far fa-comment-dots"/>                    </button>
                    <h3 className='profile__button-title'>Message</h3>
                </div>
            </div>
            <div className='profile__footer'>
                <div className='profile__footer-displayName'>
                    <h1>Display Name</h1>
                    <h2>Bakari Holmes</h2>
                </div>
            </div>

        </div>

    )
}


export default connect()(Profile)
