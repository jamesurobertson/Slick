import React  from "react";
import { connect } from "react-redux";
// import socketIoClient from 'socket.io-client'
import { Switch, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../Routes";
import Home from "./Home";
import Login from './Login'
import Signup from "./Signup";

// const ENDPOINT='http://localhost:8080'

function App(props) {

    // const [socket, setSocket] = useState(null)
    // const [socketConnected, setSocketConnected] = useState(false);

    // useEffect(() => {
    //     setSocket(socketIoClient(ENDPOINT));
    // }, [])

    // useEffect(() => {
    //     if (!socket) return

    //     socket.on('connect', () => {
    //         setSocketConnected(socket.connected);
    //       });
    //       socket.on('disconnect', () => {
    //         setSocketConnected(socket.connected);
    //       });

    //       socket.on("getDate", data => {
    //       });

    // }, [socket])


  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute
          path="/login"
          component={Login}
          currentUserId={props.currentUserId}
        />
        <AuthRoute
          path="/register"
          component={Signup}
          currentUserId={props.currentUserId}
        />
        <ProtectedRoute
          path="/"
          component={Home}
          currentUserId={props.currentUserId}
        />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUserId,
  };
};

export default connect(mapStateToProps)(App);

//   <Signup/>
