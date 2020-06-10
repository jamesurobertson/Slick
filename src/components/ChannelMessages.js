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

//   TODO: Scrol to bottom when you click on a channel
  useEffect(scrollToBottom, [channelMessages, messages, channelId]);

  return (
    <div className="channel-primary-view">
      <div className="channel-messages-container">
        {channelMessages.map((message) => {
          // TODO: pass displayname down to Message component
          const {
            content,
            messageableType,
            id,
            messageableId,
            displayName,
            createdAt,
          } = message;
          if (
            messageableType === "channel" &&
            messageableId === parseInt(channelId[0])
          ) {
            return (
              <div className="channel-message" key={id}>
                <Message
                  message={content}
                  displayName={displayName}
                  createdAt={new Date(createdAt).toLocaleTimeString("en-US", {
                    timeStyle: 'short'
                  })}
                />
              </div>
            );
          } else {
            return "";
          }
        })}
        <div className='channel-scrollTo' ref={messagesEndRef} ></div>
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
