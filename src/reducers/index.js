import {combineReducers} from 'redux'

const initAuth = {
    id: '',
    username: ''
}

const AuthReducer = (data = initAuth, action) =>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return{
                ...data, //OBJECT pada dasarnya akan mengganti keseluruhan object sebelumnya, jika di assign value baru
                // ... data akan mengambil semua property dari data sebelumnya dan dimasukkan ke dalam object baru
                // sehingga properti data yang lama tidak hilang
                id: action.payload.id,
                username: action.payload.username
            };
        break;

        case 'KEEP_LOGIN':
            return{
                ...data,
                id:action.payload.id,
                username: action.payload.username
            }
        break;
        
        case 'LOGOUT_SUCCESS':
            return{
                ...data,
                id:'',
                username:''
            }
        break;    
        default:
            return data
    }
}


export default combineReducers(
    {
        auth: AuthReducer
    }
)