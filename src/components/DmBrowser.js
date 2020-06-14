import React from 'react'
import {connect} from 'react-redux'
import UserCard from './UserCard'

const DmBrowser = props => {

    const {users, closeDmModal} = props


    if (!users) return null
    return (
        <div className='dmbrowser-container'>
            <div className='dmbrowswer-header'>
                Direct Messages
            </div>
            <div className='dmbrowser-main'>
                {
                    Object.values(users).map(user => {
                        return (
                            <div key={`useCard-user-${user.id}`}>
                                <UserCard closeDmModal={closeDmModal} user={user}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(DmBrowser)
