import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { Emoji } from "emoji-mart";

const ChannelMessages = (props) => {
  const { messages, channelId } = props;
  const [reactions, setReactions] = useState([])
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

  const addReaction = (e, messageId) => {
      const emojiObj = {id: e.id, skin: localStorage.getItem('emoji-mart.skin')}
      setReactions([...reactions, emojiObj])

  }

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
            userId,
            displayName,
            createdAt,
            profileImageUrl,
            fullName
          } = message;
          if (
            messageableType === "channel" &&
            messageableId === parseInt(channelId[0])
          ) {
            return (
              <div key={id}>
                <div className="channel-message" id={id}>
                  <Message
                  addReaction={addReaction}
                    message={content}
                    displayName={displayName || fullName}
                    messageId={id}
                    userId={userId}
                    profileImageUrl={profileImageUrl}
                    createdAt={new Date(createdAt).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                    })}
                  />
                </div>
                <div className="emoji-container">{
                    reactions.map(reaction => <Emoji emoji={reaction} size={22}/>)
                }
                </div>
              </div>
            );
          } else {
            return "";
          }
        })}
        <div className="channel-scrollTo" ref={messagesEndRef}></div>
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
