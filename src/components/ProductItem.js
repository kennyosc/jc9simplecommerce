import React, {Component} from 'react'

class ProductItem extends Component{

    showProductItem = () =>{
       var hasil = this.props.showProduct.map((val)=>{
            return(
                <div className = 'card col-3 mx-3 mb-3 align-items-center'>
                    <img src={val.src} className='w-75' alt='Product'/>
                    <div className='card-body'>
                        <h5 className='card-title'>{val.name}</h5>
                        <p className='card-text'>Rp{val.price},-</p>
                        <p className='card-text'>{val.desc}</p>
                        <input type='number' className='form-control' placeholder='Qty' min='1'/>
                        <button className='btn btn-outline-primary btn-block my-2'>Details</button>
                        <button className='btn btn-primary'>Add To Cart</button>
                    </div>
                </div>
            )
        })
        return hasil
    }

    render(){
        return(
            <div className="row d-flex my-5 justify-content-center">
                {this.showProductItem()}
            </div>
        )
    }
}

export default ProductItem