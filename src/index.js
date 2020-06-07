import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store/storeConfig";
import { changeFullName, changeDisplayNAme, changeTitle, changeEmail, changeProfilePic } from "./actions";



const store = configureStore();
const userId = localStorage.getItem("SLICK_CURRENT_USER_ID");

const getUserInfo = async (userId) => {
  if (!userId) return;
  try {
      const res = await fetch(`http://localhost:8080/user/${userId}`, {
          headers: {
              "Content-Type": "application/json",
            },
        });

    if (!res.ok) throw res;
    const {fullName, displayName, title, email, profileImageUrl} = await res.json()

    store.dispatch(changeFullName(fullName))
    store.dispatch(changeDisplayNAme(displayName))
    store.dispatch(changeTitle(title))
    store.dispatch(changeEmail(email))
    store.dispatch(changeProfilePic(profileImageUrl))
  } catch (e) {
    console.error(e);
  }
};

getUserInfo(userId)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
