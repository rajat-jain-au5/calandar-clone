import React, { Fragment } from 'react';
// import logo from './logo.svg';
import {connect} from 'react-redux'
import Calandar from './Component/Calandar' 
import Register from './Component/Register'
import './App.css';
import { loadUser } from "./actionCreators/authActios";


import store from "./Reducers";
import { BrowserRouter, Route, Link,Redirect} from 'react-router-dom';
class App extends React.Component {
  componentDidMount = () => {
    store.dispatch(loadUser());
  };
  render() {
   
      return (
        <BrowserRouter>
          <Fragment>
            <Route path="/calendar" exact component={Calandar} />
            <Route path="/" exact component={Register} />
            {localStorage.getItem("token") ? (
              <Redirect to="/calendar" />
            ) : (
              <Redirect to="/" />
            )}
            <Link to="/">
              <Redirect to="/calendar" />
            </Link>
            <Link to="/calendar">
              <Redirect to="/calendar" />
            </Link>
          </Fragment>
        </BrowserRouter>
      );
  }
}


const mapStateToProps=(state)=>{
  return state
}
export default connect(mapStateToProps) (App);


