import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Cart extends Component{

    state={
        allProduct:[],
        selectedId : 0
    }

    componentDidMount(){
        axios.get('http://localhost:2019/cart').then((res)=>{
            this.setState({allProduct:res.data})
        })
    }

    getProduct = () =>{
        axios.get('http://localhost:2019/cart').then((res)=>{
            this.setState({allProduct:res.data})
        })
    }

    deleteCart = (id) =>{
        axios.delete('http://localhost:2019/cart/' + id).then((res)=>{
            this.getProduct()
        })
    }

    editProduct = () =>{
        //.put akan mengubah keseluruhan data yang dituju
        //.patch akan mengubah data yang diubah saja dan tetap menyimpan properties yang sebelumnya
        axios.patch('http://localhost:2019/cart/'+this.state.selectedId ,
            {
               quantity: this.quantity.value
            }
        ).then((res)=>{
            console.log(res)
            this.getProduct()
        }).catch(err =>{
            console.log('Gagal')
        })
    }

    renderCart = () =>{
        var hasil = this.state.allProduct.map((val)=>{
            if(this.props.user.id == val.userId){
                if(val.id !== this.state.selectedId){
                    return(
                        <tr>
                            <td style={{width:'250px'}}>{val.productName}</td>
                            <td style={{width:'300px'}}>{val.productDesc}</td>
                            <td className='text-center'>{val.productPrice}</td>
                            <td className='text-center'>{val.quantity}</td>
                            <td  className='text-center'>
                                <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                            </td>
                            <td className='text-center'>{val.quantity * val.productPrice}</td>
                            <td className='text-center'>
                                <button className='btn btn-danger btn-sm' onClick={()=>this.deleteCart(val.id)}>Delete</button>
                                <button className='btn btn-warning btn-sm' onClick={()=>{this.setState({selectedId:val.id})}}>Edit</button>
                            </td>
                        </tr>)
                } else{
                    return (
                        <tr>
                            <td style={{width:'250px'}}>{val.productName}</td>
                            <td style={{width:'300px'}}>{val.productDesc}</td>
                            <td className='text-center'>{val.productPrice}</td>
                            <td style={{width:'250px'}}>
                                <input type='text' defaultValue={val.quantity} ref={(quantity)=>{this.quantity = quantity}}/>
                            </td>
                            <td  className='text-center'>
                                <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                            </td>
                            <td className='text-center'>{val.quantity * val.productPrice}</td>
                            <td className='text-center'></td>
                            
                            <td className="w-25">
                                <button className='btn btn-success mx-3 text-center' onClick={this.editProduct}>Save</button>
                                <button className='btn btn-danger text-center' onClick={()=>{this.setState({selectedId: 0})}}>Cancel</button>
                            </td>
                        </tr>
                    )
                }
                
            } else{
                return(
                <Redirect to='/login'/>
                )
            }
            
        })
        return hasil
    }



    showTotalQuantity = () =>{
        var totalQuantity = 0
        var cart = this.state.allProduct

        for(var i = 0; i< cart.length; i++){
            totalQuantity += cart[i].quantity
        }
        return totalQuantity;
    }

    showTotalPrice = () =>{
        var totalPrice = 0
        var cart = this.state.allProduct

        for(var i = 0; i< cart.length; i++){
            totalPrice += (cart[i].productPrice * cart[i].quantity)
        }
        return totalPrice;
    }

    renderOrderTotal=()=>{
        return(
            <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">TOTAL</h5>
                        <p class="card-text">Quantity: {this.showTotalQuantity()}</p>
                        <p class="card-text">Total price: Rp{this.showTotalPrice()},-</p>
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
                            <th scope="col">ACTIONS</th>
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
        user : state.auth
    }
}

export default connect(mapStateToProps)(Cart)