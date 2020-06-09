import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import MessageInput from "./MessageInput";
import Message from "./Message";

const ChannelMessages = (props) => {
  const { messages, channelId } = props;

  const [channelMessages, setChannelMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };
  useEffect(() => {
    setChannelMessages(Object.values(messages));
  }, [messages]);

  useEffect(scrollToBottom, [channelMessages, messages]);


  return (
    <div className="channel-primary-view">
      <div className="channel-messages-container">
        {channelMessages.map((message) => {
          const { content, messageableType, id, messageableId } = message;
          if (
            messageableType === "channel" &&
            messageableId === parseInt(channelId)
          ) {
            return (
              <div className="channel-message" key={id}>
                <Message message={content} />
              </div>
            );
          } else { return ''}
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    channelId: state.session.activeChannel,
  };
};

export default connect(mapStateToProps)(ChannelMessages);
