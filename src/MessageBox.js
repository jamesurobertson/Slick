import React from "react";

class MessageBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      messages: [{
          user: 'James',
          userMessage: 'Hello, world!'
      }],
      text: ''
    };
  }


  handleSubmit = (e) => {
    e.preventDefault()
    console.log('hello')
    const message = {
        user: 'James',
        userMessage: this.state.text,
    }

    this.setState({
        messages: [...this.state.messages, message],
        text: '',
    })
  }

  textHandler = (e) => {
    //   stateChange({text: e.value})
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <div className="channel-container">
        <div className="messages-container">{
            this.state.messages.map((message, index) => {
                const {user, userMessage} = message
                return (
                <div className='user-message' key={index}>
                    <span>{user}: </span>
                    <span>{userMessage}</span>
                </div>
                )
            })
        }</div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.textHandler} name='message' value={this.state.text}/>
            <button type='submit'>Send Message</button>
        </form>
      </div>
    );
  }
}

export default MessageBox;
