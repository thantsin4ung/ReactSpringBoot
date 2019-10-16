import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import './App.css'
import {Container, Button} from "reactstrap";
import {Link} from "react-router-dom";
import { withCookies } from "react-cookie"

class Home extends Component{

    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookie} = props;
        this.state.csrfToken = cookie.get('XSRF.TOKEN');

    }

    async componentDidMount(){
        const response = await fetch('/api/v1/user', {credentials: 'include'});
        const body = await response.text();
        if( body === '') {
            this.setState(({isAuthenticated: false}));
        } else {
            this.setState(({isAuthenticated: true, JSON.parse(body)}));
        }
    }

    login(){
        let port = window.location.port ? ':'+ window.location.port : '';
        if(port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout(){
        fetch('/api/v1/logout', {method: 'POST', credentials: 'include',
        headers:{'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
        .then(response => {
            window.location.href
        })
    }

    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button color="link"><Link to="/groups">Manage Group Tour</Link></Button>
                </Container>
            </div>
        )
    }

}

export default withCookies(Home);

