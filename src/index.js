import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/index.css'
import './stylesheets/navbar.css'
import './stylesheets/channel.css'
import './stylesheets/messageInput.css'
import './stylesheets/signup.css'
import './stylesheets/profileCard.css'
import './stylesheets/message.css'
import './stylesheets/searchBar.css'
import './stylesheets/userCard.css'
import './stylesheets/peopleBrowser.css'
import './stylesheets/channelBrowser.css'
import './stylesheets/navbarHeader.css'
import './stylesheets/profile.css'
import './stylesheets/editProfile.css'
import 'emoji-mart/css/emoji-mart.css'
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store/storeConfig";




const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
