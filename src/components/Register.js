import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component{
    //ini harus dibuat dengan ARROW FUNCTION, karena this di dalamnya akan mengacu pada object
    //kalau pakai function() biasa, this nya akan mengacu di tempat function ini terpanggil
    onButtonClick = () =>{
        const username = this.username.value
        const email = this.email.value
        const pass = this.password.value

        //Taruh data di JSON dengan menggunakan AXIOS
        //Untuk POST data mengunakan axios.post
        //untuk mengambil data, menggunakan axios.get
        axios.post('http://localhost:2019/users',{
            user : username,
            email: email,
            password: pass
        }).then((res)=>{
            console.log(res)
            console.log('Data berhasil diinput')
        }).catch((err)=>{
            console.log(err)
            console.log('Gagal post data')
        })
        //.then itu kalau berhaasil, .catch itu kalau gagal
    }

    render(){
        return(
           <div>
               {/* col-sm-3 akan bisa dijalankan ketika atasnya ada class ROW */}
                <div className = 'mt-5 row'>
                    <div className = "col-sm-3 mx-auto card">
                        <div className = "card-body">

                            <div className = 'card-title border-bottom border-secondary'>
                                <h1>Register</h1>
                            </div>

                            <div className='card-title'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                ref={(username) => {this.username = username}}></input>
                            </form>

                            <div className='card-title'>
                                <h4>Email</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                ref={(email) => {this.email = email}}></input>
                            </form>

                            <div className='card-title'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type="password"
                                ref={(password) => {this.password = password}}></input>
                            </form>
                            
                            <button className='btn btn-success mt-3' onClick={this.onButtonClick}>Register</button>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default Register