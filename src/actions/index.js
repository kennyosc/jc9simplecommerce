import axios from 'axios'

//npm i --save universal-cookie -> ini untuk membuat cookie di browser, supaya ketika user sudah login, dan dia me-restart, maka dia akan tetap login
import cookies from 'universal-cookie'
//penggunakan cookies dibagi jadi 3
// 1. create cookiesnya - ketika login
// 2. read cookiesnya - ketika refresh
// 3. delete cookiesnya - ketika logout

const cookie = new cookies() // ini berupa new object

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
            const {username,id} = res.data[0]
                
                dispatch( //dimana dispatch akan return object  type dan payload KEPADA REDUCERS. ketika di reducers, akan diproses seperti biasa
                    {
                        type: 'LOGIN_SUCCESS',
                        payload:{
                            id: id,
                            username : username 
                        }
                    }
                )

                //CREATE DATA UNTUK COOKIE
                cookie.set('userName', {username,id} ,{path:'/'}) // bisa juga cookie.set('userName', res.data[0].username, {path:'/'})
            } else{
                console.log('Username / Password incorrect')
            }
        })
    }
}

//bikin function untuk automatic login by cookies
export const keepLogin = (objUser) =>{
    return{
        type:'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
    
}

export const onLogoutUsers = () =>{
    cookie.remove('userName')
    return{
        type:'LOGOUT_SUCCESS'
    }
}

export const addCart = (id,unit) =>{
    // return(dispatch)=>{
    //     axios.get('http://localhost:2019/product',{
    //         params:{
    //             id:id,
    //         }
    //     }).then((res)=>{
    //         var addedProduct = res.data.find((val)=>val.id === id)
    //         addedProduct.quantity = unit
    //         dispatch(
    //             {
    //             type:"ADD_CART",
    //             payload:{
    //             id: id,
    //             allCart : addedProduct,
    //             totalPrice : (addedProduct.price * addedProduct.quantity)
    //             }
    //         })
    
    //     })
    // }

    //post product ke cart
    
}

export const deleteCart = (id) =>{
    // return{
    //     type:'DELETE',
    //     id: id
    // }
}

