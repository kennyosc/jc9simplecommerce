import {combineReducers} from 'redux'

const initAuth = {
    id: '',
    username: '',
    // allCart digabungin ke user supaya didalam 1 user itu terdapat cart yang dia beli berserta dengan totalpricenya
    allCart: [],
    totalPrice: 0,
    totalUnit: 0
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
        
        case 'LOGOUT_SUCCESS':
            return{
                ...data,
                id:'',
                username:''
            }
        break;
        
        case 'ADD_CART':
            return{
                ...data,
                allCart: [...data.allCart, action.payload.allCart],
                totalPrice: data.totalPrice + action.payload.totalPrice,
                totalUnit: data.allCart.quantity + action.payload.allCart.quantity
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