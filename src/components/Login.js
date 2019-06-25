import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Login extends Component{

    onButtonClick = () =>{
        var username = this.username.value;
        var password = this.password.value;

        axios.get("http://localhost:2019/users", {
            params:{
                username: username,
                password : password
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.length > 0){
                console.log(res.data[0].username + ' have been logged in')
            } else{
                console.log('Username / Password incorrect')
            }
        })
    }

    render(){
        return(
           <div>
               {/* col-sm-3 akan bisa dijalankan ketika atasnya ada class ROW */}
                <div className = 'mt-5 row'>
                    <div className = "col-sm-3 mx-auto card">
                        <div className = "card-body">

                            <div className = 'card-title border-bottom border-secondary'>
                                <h1>Login</h1>
                            </div>

                            <div className='card-title'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                ref={(username) => {this.username = username}}></input>
                            </form>

                            <div className='card-title'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type="password"
                                ref={(password) => {this.password = password}}></input>
                            </form>
                            <button className='btn btn-primary mt-3' onClick={this.onButtonClick}>Login</button>
                            <p className="mt-3">Tidak memiliki akun? <Link to="/register">Register disini</Link></p>

                        </div>
                    </div>
                </div>
           </div>
        )
    }
}


export default Login