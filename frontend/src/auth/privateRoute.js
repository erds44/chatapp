import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import {message} from "antd";

const PrivateRoute = ({component: Component, ...props}) => {
    return <Route {...props} render={() => {
        const login = props.logInStore.isSignedIn;
        if (login){
            return <Component />
        } else {
            return <Redirect to={{
                pathname: '/'
            }}/>
        }
    }}/>
}

const mapStateToProps = (state) => {
    return { logInStore: state.login }
};

export default connect(mapStateToProps, {})(PrivateRoute);
