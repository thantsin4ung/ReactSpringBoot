import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import GroupList from "./GroupList";
import GroupEdit from "./GroupEdit";

class App extends Component {

    /*state = {
        isLoading: true,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch('/api/v1/groups');
        const body = await response.json();
        this.setState({groups: body, isLoading: false});

    }

    render() {
        const {groups, isLoading} = this.state;
        if (isLoading) {
          return <p>Loading..</p>
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                  <h2>Group List</h2>
                  {groups.map(group =>
                    <div key={group.id}>{group.name}</div>
                  )}

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }*/

    render() {
        return(
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/groups' exact={true} component={GroupList}/>
                    <Route path='/groups/:id' component={GroupEdit}/>
                </Switch>
            </Router>
        )
    }

}

export default App;
