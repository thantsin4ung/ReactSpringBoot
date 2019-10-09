import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table, Spinner} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import "./App.css"

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = { groups: [], isLoading: true };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/v1/groups')
            .then(r => r.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/v1/group/${id}`, {
            method: 'DELETE',
            headers: {'Accept': 'application/json',
                        'Content-Type': 'application/json'
            }
        }).then(
            () => {
                let updateGroups = [...this.state.groups].filter(i => i.id !== id);
                this.setState({groups: updateGroups});
            }
        )
    }

    render() {

        const {groups, isLoading} = this.state;
        if (isLoading) {
            return <div className="align-items-center">
                <Spinner size="30px">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }

        const groupsList = groups.map(group => {
            const address = `${group.address || ''},  ${group.city || ''},  ${group.stateOrProvince || ''}`;
            return <tr key={group.id}>
                <td style={{whitespace: 'noWrap'}}>{group.name}</td>
                <td>{address}</td>
                <td>{group.events.map( event => {
                    return <div key={event.id}>{new Intl.DateTimeFormat('en-US',{
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(event.date))}: {event.title}</div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return(
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to={"/groups/new"}>Add Group</Button>
                    </div>
                    <h3>My Group Tour</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Location</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>{groupsList}</tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withRouter(GroupList);
