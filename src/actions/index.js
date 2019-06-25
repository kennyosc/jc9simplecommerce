import axios from 'axios'



export const onLoginUsers = (user,pass) =>{

    return (dispatch) =>{ // dispatch ini yang akan mengantarkan kepada reducers, ini akan mengecek dengan middleware redux-thunk apakah return sebuah object atau sebuah function
        axios.get("http://localhost:2019/users", { // axios memiliki jalan kerja, bahwa dia akan return undefined jika tidak menggunakan redux-thunk.
            params:{
                username: user,
                password : pass
            }
        }).then((res)=>{ // .then((res)) dalam axios dijalankan setelah dia MENUNGGU (ada durasi waktu respon) dari server API yang bersangkutan
            console.log(res)
            if(res.data.length > 0){
                dispatch( //dimana dispatch akan return object  type dan payload KEPADA REDUCERS. ketika di reducers, akan diproses seperti biasa
                    {
                        type: 'LOGIN_SUCCESS',
                        payload:{
                            id: res.data[0].id,
                            username : res.data[0].username
                        }
                    }
                )
            } else{
                console.log('Username / Password incorrect')
            }
        })
    }
}