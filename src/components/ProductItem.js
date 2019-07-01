import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {addCart} from '../actions/index'
import {connect} from 'react-redux'

class ProductItem extends Component{
    state = {
        unit: 0,
        addedItems : [],
        cartTotal : 0,
        totalUnits: 0
    }

    handleAddToCart = (id,unit) =>{
        unit = parseInt(this.state.unit)
        this.props.addCart(id,unit)

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
                            <input className='form-control' placeholder='Qty' onChange={this.handleChange} value={this.state.units}/>    
                        </form>
                        {/* ini cara untuk menambahkan :id pada <Link> */}
                        <Link to={'/detailproduct/' + id}>
                            <button className='btn btn-outline-primary btn-block my-2'>Details</button>
                        </Link>
                        <button className='btn btn-primary' onClick={()=>this.handleAddToCart(id)}>Add To Cart</button>
                    </div>
            </div>
        )
    }
}

export default connect(null,{addCart})(ProductItem)