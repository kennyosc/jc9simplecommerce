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
            for(var i = 0; i<res.data.length; i++){
                if((res.data[i].username !== username && res.data[i].password !== password) || res.data.length === 0){
                    console.log("Username/ Password anda salah")
                } else if (res.data[i].username == username && res.data[i].password == password){
                    console.log('You have been logged in')
                }
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