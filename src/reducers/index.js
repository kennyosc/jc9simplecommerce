import {combineReducers} from 'redux'

const initAuth = {
    id: '',
    username: '',
    // allCart digabungin ke user supaya didalam 1 user itu terdapat cart yang dia beli berserta dengan totalpricenya
    allCart: [],
    totalPrice: 0,
    totalUnit: 0
}

const AuthReducer = (state = initAuth, action) =>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return{
                ...state, //OBJECT pada dasarnya akan mengganti keseluruhan object sebelumnya, jika di assign value baru
                // ... state akan mengambil semua property dari state sebelumnya dan dimasukkan ke dalam object baru
                // sehingga properti state yang lama tidak hilang
                id: action.payload.id,
                username: action.payload.username
            };
        break;
        
        case 'LOGOUT_SUCCESS':
            return{
                ...state,
                id:'',
                username:''
            }
        break;
        
        // case 'ADD_CART':
        //     // kalau ada product sebelumnya itu gimana?
        //     var existingProduct = state.allCart.find((val)=> val.id == action.payload.allCart.id)
        //     if(existingProduct){
                
        //         for(var i =0; i< state.allCart.length; i++){
        //             if(state.allCart[i].id == action.payload.id){
        //                 state.allCart[i].quantity += action.payload.allCart.quantity
        //             }
        //         }

        //         return{
        //             ...state,
        //             totalPrice: state.totalPrice + action.payload.totalPrice,
        //             totalUnit: state.allCart.quantity + action.payload.allCart.quantity
        //         }
        //     }
        //     // kalau tidak ada gimana?
        //     else{
        //         return{
        //             ...state,
        //             allCart: [...state.allCart, action.payload.allCart],
        //             totalPrice: state.totalPrice + action.payload.totalPrice,
        //             totalUnit: state.allCart.quantity + action.payload.allCart.quantity
        //         }
        //     }
            
        // break;

        // case 'DELETE':
        //     let itemToRemove = state.allCart.find((val)=> val.id == action.id)
        //     let remainingItems = state.allCart.filter((val)=> val.id !== action.id)

        //     let newTotalPrice = state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
        //     let newTotalUnit = state.totalUnit - itemToRemove.quantity
        //     console.log(itemToRemove)
            
        //     return{
        //         ...state,
        //         allCart: remainingItems,
        //         totalPrice: newTotalPrice,
        //         totalUnit : newTotalUnit
        //     }

        // break;

        default:
            return state
    }
}

export default combineReducers(
    {
        auth: AuthReducer
    }
)