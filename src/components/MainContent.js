import React from "react";
import { connect } from "react-redux";
import Channel from './Channel'
import Profile from './Profile'

const MainContent = () => {
    return (
        <div className='main-content'>
            <Channel/>
            {false ? <Profile/> : ''}
        </div>
    )
}


export default connect()(MainContent)
