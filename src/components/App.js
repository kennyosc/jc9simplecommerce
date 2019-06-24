import React, {Component} from 'react'
// import react-router-dom
// 
import {Route, BrowserRouter} from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'

//localhost:3000/register

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/manageproduct" component={ManageProduct}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
