import axios from 'axios'



export const onLoginUsers = (user,pass) =>{
    axios.get("http://localhost:2019/users", {
            params:{
                username: user,
                password : pass
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.length > 0){
                return{
                    type: 'LOGIN_SUCCESS',
                    payload:{
                        id: res.data[0].id,
                        username : res.data[0].username
                    }
                }
            } else{
                console.log('Username / Password incorrect')
            }
        })
}