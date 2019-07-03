import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Cart extends Component{

    state={
        allProduct:[],
        selectedId : 0,
        renderCheckout: false
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
               quantity: parseInt(this.quantity.value)
            }
        ).then((res)=>{
            console.log(res)
            this.setState({selectedId:0})
            this.getProduct()
        }).catch(err =>{
            console.log('Gagal')
        })
    }

    renderCart = () =>{
            var findId = this.state.allProduct.filter((val)=>val.userId == this.props.user.id)
            console.log(findId)

            var hasil = findId.map((val)=>{
            if(this.props.user.username !== ''){
                if(val.id !== this.state.selectedId){
                    return(
                        <tr>
                            <td className='text-center' style={{width:'100px'}}>{val.id}</td>
                            <td style={{width:'200px'}}>{val.productName}</td>
                            <td style={{width:'200px'}}>{val.productDesc}</td>
                            <td style={{width:'200px'}} className='text-center'>Rp {val.productPrice.toLocaleString('IN')},-</td>
                            <td className='text-center'>{val.quantity}</td>
                            <td  className='text-center'>
                                <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                            </td>
                            <td className='text-center' style={{width:'100px'}}>
                                <button className='btn btn-danger btn-sm' onClick={()=>this.deleteCart(val.id)}>Delete</button>
                                <button className='btn btn-warning btn-sm'  onClick={()=>{this.setState({selectedId:val.id})}}>Edit</button>
                            </td>
                        </tr>)
                } else{
                    return (
                        <tr>
                            <td style={{width:'100px'}}>{val.productName}</td>
                            <td style={{width:'200px'}}>{val.productDesc}</td>
                            <td className='text-center'>{val.productPrice.toLocaleString('IN')}</td>
                            <td>
                                <input type='text' defaultValue={val.quantity} ref={(quantity)=>{this.quantity = quantity}}/>
                            </td>
                            <td  className='text-center'>
                                <img className="w-25 img-fluid" src={val.productSrc} alt="Product"/>
                            </td>
                            <td className='text-center'>Rp {(val.quantity * val.productPrice).toLocaleString('IN')},-</td>
                            <td className='text-center'></td>
                            
                            <td className="w-25">
                                <button className='btn btn-success mx-3 text-center' onClick={this.editProduct}>Save</button>
                                <button className='btn btn-danger text-center' onClick={()=>{this.setState({selectedId: 0})}}>Cancel</button>
                            </td>
                        </tr>
                    )
                }
                
            } else if(this.props.user.username === ''){
                return <Redirect to='/login'/>
            }
            
        })
        return hasil
    }


    showTotalQuantity = () =>{
        var totalQuantity = 0
        var cart = this.state.allProduct

        for(var i = 0; i< cart.length; i++){
            
            if(this.state.allProduct[i].userId == this.props.user.id){
                totalQuantity += cart[i].quantity
            }
        }
        return totalQuantity;
    }

    showTotalPrice = () =>{
        var totalPrice = 0
        var cart = this.state.allProduct

        for(var i = 0; i< cart.length; i++){
            if(this.state.allProduct[i].userId == this.props.user.id){
                totalPrice += (cart[i].productPrice * cart[i].quantity)

            }
        }
        return totalPrice.toLocaleString('IN');
    }

    handleCheckout = () =>{
        var checkoutArr = this.state.allProduct.filter((val) => val.userId == this.props.user.id)
        console.log(this.state.allProduct)
        console.log(checkoutArr)

        for(var i = 0; i<checkoutArr.length; i++){
            axios.delete(' http://localhost:2019/cart/' + checkoutArr[i].id).then(res=>{
                this.getProduct()
            })
        }

        alert('Thank you for your payment!')
    }

    // renderOrderTotal=()=>{
    //     return(
    //         <div class="row">
    //             <div class="col-12">
    //                 <div class="card">
    //                 <div class="card-body">
    //                     <h5 class="card-title">TOTAL</h5>
    //                     <p class="card-text">Quantity: {this.showTotalQuantity()}</p>
    //                     <p class="card-text">Total price: Rp{this.showTotalPrice()},-</p>
    //                     <button className="btn btn-primary" onClick={this.handleCheckout}>Checkout</button>
    //                 </div>
    //                 </div>
    //             </div>
    //         </div>
    //     ) 
    // }

renderCheckout=()=>{
    var findId = this.state.allProduct.filter((val)=>val.userId == this.props.user.id)
    console.log(findId)

    var hasil = findId.map((val)=>{
    return(
        <tr>
            <td className='text-center' style={{width:'100px'}}>{val.id}</td>
            <td style={{width:'100px'}}>{val.productName}</td>
            <td style={{width:'100px'}} className='text-center'>{val.quantity}</td>
            <td style={{width:'100px'}} className='text-center'>Rp {val.productPrice.toLocaleString('IN')},-</td>
            <td style={{width:'100px'}} className='text-center'>Rp {(val.quantity * val.productPrice).toLocaleString('IN')},-</td>
        </tr>
        )
    })
    return hasil
}

    render(){
        if(this.state.renderCheckout === false){
            return(
                <div className="container">
                        {this.props.user.username !== '' ? (
                            <div>
                                <h1 className="display-4 text-center">My Cart</h1>
                                    <table className="table table-hover mb-5">
                                        <thead>
                                            <tr className='text-center'>
                                                <th scope="col">ID</th>
                                                <th scope="col">NAME</th>
                                                <th scope="col">DESC</th>
                                                <th scope="col">PRICE</th>
                                                <th scope="col">QTY</th>
                                                <th scope="col">PICTURE</th>
                                                <th scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        {this.renderCart()}
                                    </tbody>
                                </table>
                                <div>
                                    <button style={{marginLeft:'500px'}} className='btn btn-primary mb-5' onClick={()=>{this.setState({renderCheckout:true})}}>Checkout</button>
                                </div>
                            </div>
                        ) : <Redirect to='/login'/>}
                    
                </div>
            )
        } else if(this.state.renderCheckout === true){
            return(
                <div className="container">
                        {this.props.user.username !== '' ? (
                            <div>
                                <h1 className="display-4 text-center">My Cart</h1>
                                    <table className="table table-hover mb-5">
                                        <thead>
                                            <tr className='text-center'>
                                                <th scope="col">ID</th>
                                                <th scope="col">NAME</th>
                                                <th scope="col">DESC</th>
                                                <th scope="col">PRICE</th>
                                                <th scope="col">QTY</th>
                                                <th scope="col">PICTURE</th>
                                                <th scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        {this.renderCart()}
                                    </tbody>
                                </table>
                            
                                <h1 className="display-4 text-center">Total</h1>
                                    <table className="table table-hover mb-5">
                                        <thead>
                                            <tr className='text-center'>
                                                <th scope="col">ID</th>
                                                <th scope="col">NAME</th>
                                                <th scope="col">QTY</th>
                                                <th scope="col">PRICE</th>
                                                <th scope="col">TOTAL</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        {this.renderCheckout()}
                                        <tr className='text-center'>
                                            <td colSpan="4"><b>TOTAL</b></td>
                                            <td>Rp {this.showTotalPrice()},-</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <button style={{marginLeft:'340px',width:'400px',color:'white'}} className='btn btn-primary mb-1' onClick={()=>{this.setState({renderCheckout: false})}}>Cancel</button>
                                    <button className='btn btn-success btn-block mb-5' onClick={this.handleCheckout}>Confirm Payment</button>
                                </div>
                            </div>
                        ) : <Redirect to='/login'/>}
                    
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.auth
    }
}

export default connect(mapStateToProps)(Cart)