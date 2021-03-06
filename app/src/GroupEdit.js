import React, {Component} from 'react';
import AppNavbar from "./AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import { Cookies, withCookies } from 'react-cookie';

class GroupEdit extends Component {

    static propTypes = {
        cookies: instanceof(Cookies).isRequired
    };

    emptyItem = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        if (this.props.match.params.id !== 'new') {
        try {
            console.log('True');
            const group = await (await fetch(`/api/v1/group/${this.props.match.params.id}`, {credentials: 'include'})).json();
            this.setState({item: group});
            console.log(group.name+'Group Name');
            } catch (error) {
                this.props.history.push('/');
            }
        }
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {item, csrfToken} = this.state;
        await fetch('/api/v1/group',
            {
                method: (item.id) ? 'PUT' : 'POST',
                headers: {
                    'X-XSRF-TOKEN': this.state.csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include'
            });
        this.props.history.push('/groups');
    };

    render = () => {
        const item = this.state;
        const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <p>{this.props.match.params.id}</p>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={item.address || ''}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" value={item.city || ''}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="stateOrProvince">StateOrProvince</Label>
                            <Input type="text" name="stateOrProvince" id="stateOrProvince"
                                   value={item.stateOrProvince || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="country">Country</Label>
                            <Input type="text" name="country" id="stateOrProvince" value={item.country || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="country">PostalCode</Label>
                            <Input type="text" name="postalCode" id="stateOrProvince" value={item.postalCode || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    };

}

export default withCookies(withRouter(GroupEdit));
