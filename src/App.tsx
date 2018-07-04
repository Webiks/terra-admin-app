import * as React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute';
import { SetAuth } from './actions/login.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './components/Navbar/Navbar';
import LoginService from './components/Login/LoginService';
import WorldsHomePage from './components/Worlds/WorldsHomePage';

class App extends React.Component {
    props: { SetAuth: (bool: boolean) => {} };

    componentDidMount() {
        LoginService.checkAuth()
            .then(() => this.props.SetAuth(true))
            .catch(() => this.props.SetAuth(false));
    }

    public render() {
        return (
            <div>
                <Navbar/>
                <div className="App">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <PrivateRoute exact={true} path="/" component={WorldsHomePage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps: any = (dispatch: any) => bindActionCreators({ SetAuth }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(App) as any);
