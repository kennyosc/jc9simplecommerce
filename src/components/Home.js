import React,{Component} from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'



class Home extends Component{

    state = {
        product: [],
        searchProduct: []
    }

    getProduct = () => {
        axios.get("http://localhost:2019/product").then((res)=>{
            this.setState({product:res.data, searchProduct: res.data})
        })
    }

    componentDidMount(){
        this.getProduct()
    }

    onBtnSearch = () =>{
        const name = this.name.value.toLowerCase()
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)

        var arrSearch = this.state.searchProduct.filter((val)=>{
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    val.name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)){ // Name and Max
                return (
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price <= max
                )
            } else if (isNaN(max)){ // serach Name and min
                return(
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price >= min
                )
            } else{ //search all . semua string itu mengandung string kosong
                return(
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price >= min
                    &&
                    val.price <= max
                )
            }
        })
        console.log(arrSearch)
        console.log(name)
        console.log(min)
        console.log(max)
        this.setState({product: arrSearch})
    }

    renderList = () =>{
            return (
                <ProductItem showProduct = {this.state.product}/>
            )
    }

    render(){
        return (
            <div className='container'>
                <div className="row">
                                <div className="col">
                                    <div className="mt-5">
                                        <div className="mx-auto card">
                                            <div className="card-body">
                                                <div className="border-bottom border-secondary card-title">
                                                    <h1>Search</h1>
                                                </div>
                                                <div className="card-title mt-1">
                                                    <h4>Name</h4>
                                                </div>
                                                <form className="input-group"><input placeholder='Name'ref={input => this.name = input} className="form-control" type="text"/></form>
                                                <div className="card-title mt-1">
                                                    <h4>Price</h4>
                                                </div>
                                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className="row col-10">
                                {this.renderList()}
                            </div>
                        </div>
            </div>
            
        )
    }

}

    

export default Home