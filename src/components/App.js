import React from "react";
import { connect } from "react-redux";
import { Switch, NavLink, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../Routes";
import Home from "./Home";
import Signup from "./Signup";
import ChannelMessages from "./ChannelMessages";

function App(props) {
    console.log(props.currentUserId)
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Home}
          currentUserId={props.currentUserId}
        />
        <AuthRoute
          path="/register"
          component={Signup}
          currentUserId={props.currentUserId}
        />
        {/* <AuthRoute
        path="/login"
        component={Login}
        currentUserId={props.currentUserId}
      /> */}
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.currentUserId,
  };
};

export default connect(mapStateToProps)(App);

//   <Signup/>
