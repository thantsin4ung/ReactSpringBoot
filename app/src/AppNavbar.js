import React,{Component} from "react";
import {Link} from "react-router-dom";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import { faFacebookSquare, faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons"
/* import { library } from '@fortawesome/fontawesome-svg-core'
* import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
*  */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class AppNavbar extends Component{

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/"><h3 style={{fontStyle: "italic"}}>Home</h3></NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar/>
            <Nav className="ml-auto" navbar>
                <NavItem><FontAwesomeIcon color="#cfd8dc" size="2x" icon={faFacebookSquare} /></NavItem>
                <NavItem>
                    <NavLink href="https://www.facebook.com/phoe.thar.777158" >Thant Sin Aung</NavLink>
                </NavItem>
                <NavItem><FontAwesomeIcon size="2x" color="#cfd8dc" icon={faGooglePlusSquare} /></NavItem>
                <NavItem>
                    <NavLink href="">thantzinblogger@gmail.com</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    }

}
