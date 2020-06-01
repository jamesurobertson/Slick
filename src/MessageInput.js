import React from 'react';

class MessageInput extends React.Component {
    constructor(props) {
        super()
        this.state = {
            text: ''
        }
    }

    postMessage = (e) => {
        e.preventDefault()

    }

    render() {
        return(
            <>
            <input type='text'/>
            <button onClick={postMessage} value={this.state.text}>Send Message</button>
            </>
        )
    }
}

export default MessageInput
