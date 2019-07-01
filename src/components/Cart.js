import React,{Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component{
    renderCart = () =>{
        var cart = this.props.cart.allCart
        
        var hasil = cart.map((val)=>{
            return(
            <tr>
                <td style={{width:'250px'}}>{val.name}</td>
                <td style={{width:'300px'}}>{val.desc}</td>
                <td className='text-center'>{val.price}</td>
                <td className='text-center'>{val.quantity}</td>
                <td style={{width:'400px'}} className='text-center'>
                    <img className="w-25 img-fluid" src={val.src} alt="Product"/>
                </td>
                <td className='text-center'>{val.quantity * val.price}</td>
            </tr>)
        })
        return hasil
    }

    showTotalQuantity = () =>{
        var totalQuantity = 0
        var cart = this.props.cart.allCart

        for(var i = 0; i<this.props.cart.allCart.length; i++){
            totalQuantity += cart[i].quantity
        }
        console.log(this.props.cart.allCart.length)
        console.log(totalQuantity)
        return totalQuantity;
    }

    renderOrderTotal=()=>{
        return(
            <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">TOTAL</h5>
                        <p class="card-text">Quantity: {this.showTotalQuantity()}</p>
                        <p class="card-text">Total price: Rp{this.props.cart.totalPrice},-</p>
                        <button className="btn btn-primary">Checkout</button>
                    </div>
                    </div>
                </div>
            </div>
        ) 
    }

    render(){
        return(
            <div className="container">
                <h1 className="display-4 text-center">My Cart</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QTY</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">TOTAL PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </table>
                <div>
                    {this.renderOrderTotal()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        cart : state.auth
    }
}

export default connect(mapStateToProps)(Cart)