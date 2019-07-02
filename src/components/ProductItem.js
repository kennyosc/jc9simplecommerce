import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class ProductItem extends Component{
    state = {
        unit: 0,
        cart: [],
        addedItems : [],
        cartTotal : 0,
        totalUnits: 0
    }

    componentDidMount(){
        axios.get('http://localhost:2019/cart').then((res)=>{
            this.setState({cart : res.data})
        })
    }

    handleAddToCart = (name,id,price,src,desc,unit) =>{
        unit = parseInt(this.state.unit)
        var userId = this.props.user.id
        // this.props.addCart(id,unit)
        
        console.log(this.state.cart)
        let sameProductId = this.state.cart.find(el => el.productId == id )
        console.log(sameProductId)

        //kalau productId == id input, maka nambah quantity
        if(sameProductId){
            axios.patch(`http://localhost:2019/cart/${sameProductId.id}`, {
               quantity: unit + sameProductId.quantity
            })
        }else {
            axios.post('http://localhost:2019/cart',{
                userId: userId,
                productId : id,
                productName : name,
                productDesc : desc,
                productPrice : parseInt(price),
                productSrc : src,
                quantity: unit
            }).then((res)=>{
                console.log(res)
                console.log('Input data berhasil')
            })
        }

      }

    handleChange = (event) =>{
        this.setState({unit:event.target.value})
    }

    render(){
        const {name,src,price,id,desc} = this.props.barang
        
        return(
            <div  className = 'card col-3 mt-5 mx-3'>
                    <img src={src} className='card-img-top' alt='Product'/>
                    <div className='card-body align-bottom'>
                        <h5 className='card-title'>{name}</h5>
                        <p className='card-text'>Rp{price},-</p>
                        <form>
                            <input className='form-control' placeholder='Qty' onChange={this.handleChange}/>    
                        </form>
                        {/* ini cara untuk menambahkan :id pada <Link> */}
                        <Link to={'/detailproduct/' + id}>
                            <button className='btn btn-outline-primary btn-block my-2'>Details</button>
                        </Link>
                        <button className='btn btn-primary' onClick={()=>this.handleAddToCart(name,id,price,src,desc)}>Add To Cart</button>
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

export default connect(mapStateToProps)(ProductItem)