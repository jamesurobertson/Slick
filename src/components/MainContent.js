import React from "react";
import { connect } from "react-redux";
import Channel from './Channel'

const MainContent = () => {
    return (
        <div className='main-content'>
            <Channel/>
        </div>
    )
}


export default connect()(MainContent)
