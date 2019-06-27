import React,{Component} from 'react'
import axios from 'axios'

class ManageProduct extends Component{
    // state ini berguna untuk menampilkan product yang terdapat di db.json.
    // kenapa pakai state? karena state akan re-render ulang secara otomatis ketika data di dalamnya di update
    state = { 
        product:[]
    }

    //componentDidMount merupakan function bawaan dari react
    // dimana tujuannya adalah renderList akan berjalan terlebih dahulu supaya di pagenya muncul kontennya terlebih dahulu
    // lalu ketika axios.get itu berjalan, dia akan memasukkan data ke dalam page yang sudah di render duluan
    // supaya ketika user membuka page, page tidak kosong dan sudah merender konten pagenya dulu, baru memunculkan data dari server
    componentDidMount(){
        axios.get('http://localhost:2019/product').then((res)=>{
            this.setState({product: res.data})
        })
    }

    renderList = () =>{
        var hasil = this.state.product.map((val) =>{
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.desc}</td>
                    <td>{val.price}</td>
                    <td>
                        <img className="w-25" src={val.src} alt="Product"/>
                    </td>
                    <td className="w-25">
                        <button className='btn btn-warning mx-3'>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
        return hasil;
    }

    getProduct = () => {
        axios.get("http://localhost:2019/product").then((res)=>{
            this.setState({product:res.data})
        })
    }

    //untuk melakukan post product, itu tidak membutuhkan reducer lagi
    //karena axios.post langsung memasukkan data ke db.json
    //tinggal setelah itu kita merendernya
    addProduct = () => {
        var name = this.name.value
        var desc = this.desc.value
        var price = this.price.value
        var pict = this.pict.value

        axios.post('http://localhost:2019/product',{
            name: name,
            desc:desc,
            price:price,
            src:pict
        }).then((res)=>{
            this.getProduct()
        })

    }


    render(){
        return(
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageProduct