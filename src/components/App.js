import React, {Component} from 'react'

// import react-router-dom
// npm install --save react-router-dom
import {Route, BrowserRouter} from 'react-router-dom'
import cookies from 'universal-cookie'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Cart from './Cart'

import {keepLogin} from '../actions'
import {connect} from 'react-redux'

//localhost:3000/register

const cookie = new cookies()

class App extends Component{

    componentDidMount(){
        const objCookie = cookie.get('userName') //undefined

        if(objCookie !== undefined){ // ketika objCookie ada isinya, maka akan di login ulang secara otomatis
            //Login ulang
            this.props.keepLogin(objCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <div className="container">
                        {/* keyword EXACT itu akan literally melihat route nya menjadi "/register"
                        kalau tidak memakai EXACT, maka route nya akan membaca bahwa route tersebut mengandung "/" dan apakah mengandung "/register", makanya di tampilkan home dan register 
                        kenapa home yang di exact? karena route akan melihat bahwa component HOME saja yang harus exact dan tidak memasukkan "/" ke route yang lainnya*/}
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/manageproduct" component={ManageProduct}/>
                        <Route path="/detailproduct/:id" component={DetailProduct}/>
                        <Route path="/cart" component={Cart}/>
                    </div>
                    
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)
