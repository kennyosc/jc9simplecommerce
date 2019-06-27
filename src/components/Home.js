import React,{Component} from 'react'
import axios from 'axios'



class Home extends Component{

    state = {
        product: []
    }

    getProduct = () => {
        axios.get("http://localhost:2019/product").then((res)=>{
            this.setState({product:res.data})
        })
    }

    componentDidMount(){
        this.getProduct()
    }

    renderList = () =>{
        return this.state.product.map((val)=>{
            return 
        })
}
    }

    render(){
        return(
            <div>
                <h1>Home Page</h1>
            </div>
        )
}

export default Home