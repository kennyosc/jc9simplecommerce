import React,{Component} from 'react'
import axios from 'axios'

class DetailProduct extends Component{
    //kapan gw bisa tau untuk axios.get dan pakai state atau  transfer state dari parent component?
    // easy put: local state itu buat nge-render dari axios .get yang sudah kita tulis
    // tapi untuk ngambil updatan data, itu harus axios.get

    // put it simple, just use axios.get, state is only for rendering

    state={
        details:''
    }

    componentDidMount(){
        var pro_id = this.props.match.params.id

        axios.get('http://localhost:2019/product/' + pro_id
        ).then((res)=>{
            console.log(res)
            this.setState({details : res.data})
        })
    }
    render(){
        let {name,id,src,desc,price}= this.state.details
        return(
            <div>
                <div className="card mb-3 w-75 mx-auto">
                    <img className="card-img-top mx-auto" src={src} alt="Card image cap" style={{width:'400px'}}/>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <h5 className="card-title text-center text-muted">Rp{price},-</h5>
                    <div className='p-3'>
                        <p className="card-text text-justify">{desc} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="card-text"><small className="text-muted">{Date().valueOf()}</small></p>
                        <button className='btn btn-primary btn-block'>Add to cart</button>
                    </div>
                </div>
                </div>
            </div>
        )}
}

export default DetailProduct