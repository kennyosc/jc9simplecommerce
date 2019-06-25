import React,{Component} from 'react'

//npm install --save reactstrap
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'
    
import {Link} from 'react-router-dom'


class Header extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render(){
        return(
            <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">SimpleCommerce</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="my-2">
                <Link to="/components/">All Products</Link>
              </NavItem>
              <NavItem>
                  {/* karena Button in digunakan untuk ke link, makanya di wrap dengan <Link></Link> */}
                <Link to="/register">
                    <Button color="outline-success" className="mx-3">Register</Button>
                </Link>
              </NavItem>
              <NavItem>
                  <Link to='/login'>
                    <Button color="outline-primary">Login</Button>
                  </Link>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
    }
}

export default Header