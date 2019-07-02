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
    DropdownItem,
    Alert } from 'reactstrap'
    
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogoutUsers} from '../actions/index'


class Header extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          visible: true
        };
        this.onDismiss = this.onDismiss.bind(this);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      onDismiss() {
        this.setState({ visible: false });
      }

      handleLogout = () =>{

        this.props.onLogoutUsers()
      }

    render(){
      if(this.props.user.username == ''){
        return(
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">SimpleCommerce</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem className="my-2">
                    <Link to="/">All Products</Link>
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
      } else {
          return (
            <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">SimpleCommerce</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem className="my-2">
                    <Link to="/manageproduct/" className="mx-3">Hello {this.props.user.username}</Link>
                  </NavItem>
                  <NavItem className="my-2">
                    <Link to="/" className="mx-3">All Products</Link>
                  </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                {this.props.user.username}
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem>
                                <Link to='/cart'>Cart</Link>                                  
                                </DropdownItem>
                                <DropdownItem>
                                  <Link to='/manageproduct'>Add Product</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <Button className="dropdown-item btn btn-warning" onClick={this.handleLogout}>Logout</Button>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
              </Collapse>
            </Navbar>
            <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                You have successfully signedin!
            </Alert>
          </div>
                  
        )
      }
    }
}

const mapStateToProps = (state) =>{
  return{
    user : state.auth
  }
}

export default connect(mapStateToProps, {onLogoutUsers})(Header)