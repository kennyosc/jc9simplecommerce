import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ProductItem extends Component{
    render(){
        const {name,src,price,id,desc} = this.props.barang
        return(
            <div  className = 'card col-3 mt-5 mx-3'>
                    <img src={src} className='card-img-top' alt='Product'/>
                    <div className='card-body align-bottom'>
                        <h5 className='card-title'>{name}</h5>
                        <p className='card-text'>Rp{price},-</p>
                        <form>
                            <input className='form-control' placeholder='Qty' ref={(unit)=>{this.unit = unit}}/>    
                        </form>
                        {/* ini cara untuk menambahkan :id pada <Link> */}
                        <Link to={'/detailproduct/' + id}>
                            <button className='btn btn-outline-primary btn-block my-2'>Details</button>
                        </Link>
                        <button className='btn btn-primary' onClick={()=>{
                            this.props.addFunc({name,src,price,id,desc, units:1})
                        }}>Add To Cart</button>
                    </div>
            </div>
        )
    }
}

export default ProductItem