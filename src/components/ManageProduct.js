import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class ManageProduct extends Component{
    // state ini berguna untuk menampilkan product yang terdapat di db.json.
    // kenapa pakai state? karena state akan re-render ulang secara otomatis ketika data di dalamnya di update
    state = { 
        product:[],
        selectedId:0
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
            if(val.id !== this.state.selectedId){
                return (
                    <tr>
                        <td className='text-center'>{val.id}</td>
                        <td style={{width:'250px'}}>{val.name}</td>
                        <td style={{width:'300px'}}>{val.desc}</td>
                        <td style={{width:'300px'}} className='text-center'>Rp {val.price.toLocaleString('IN')},-</td>
                        <td style={{width:'400px'}} className='text-center'>
                            <img className="w-25 img-fluid" src={val.src} alt="Product"/>
                        </td>
                        <td style={{width:'250px'}}>
                            {/* yang edit, itu menggunakan this.setState({}) karena tujuannya state.selectedId akan digunakan untuk merender (save and cancel button) */}
                            {/* delete tinggal memasukkkan sebuah parameter, karena dia tidak akan merender apa2 */}
                            <button className='btn btn-success mx-3 ml-3 text-center' onClick={()=>{this.setState({selectedId:val.id})}}>Edit</button>
                            <button className='btn btn-danger text-center' onClick={()=>{this.deleteProduct(val.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else{
                return (
                    <tr>
                        <td className='text-center'>{val.id}</td>
                        <td style={{width:'250px'}}>
                            <input type='text' defaultValue={val.name} ref={(name)=>{this.editName = name}}/>
                        </td>
                        <td style={{width:'250px'}}>
                            <input type='text' defaultValue={val.desc} ref={(desc)=>{this.editDesc = desc}}/>
                        </td>
                        <td style={{width:'250px'}}>
                            <input type='text' defaultValue={val.price} ref={(price)=>{this.editPrice = price}}/>
                        </td>
                        <td style={{width:'250px'}}>
                            <input type='text' defaultValue={val.src} ref={(src)=>{this.editSrc = src}}/>
                        </td>
                        <td className="w-25">
                            <button className='btn btn-success mx-3 text-center' onClick={this.editProduct}>Save</button>
                            <button className='btn btn-danger text-center' onClick={()=>{this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
            
        })
        return hasil;
    }

    getProduct = () => {
        axios.get("http://localhost:2019/product").then((res)=>{
            this.setState({product:res.data, selectedId:0})
        })
    }

    //untuk melakukan post product, itu tidak membutuhkan reducer lagi
    //karena axios.post langsung memasukkan data ke db.json
    //tinggal setelah itu kita merendernya
    addProduct = () => {
        var name = this.name.value
        var desc = this.desc.value
        var price = parseInt(this.price.value)
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

    deleteProduct = (id) =>{
        axios.delete('http://localhost:2019/product/' + id).then(()=>{
            this.getProduct()
        })
    }

    editProduct = () =>{
        //.put akan mengubah keseluruhan data yang dituju
        //.patch akan mengubah data yang diubah saja dan tetap menyimpan properties yang sebelumnya
        axios.patch('http://localhost:2019/product/'+this.state.selectedId ,
            {
                name: this.editName.value,
                desc: this.editDesc.value,
                price: parseInt(this.editPrice.value),
                src: this.editSrc.value
            }
        ).then((res)=>{
            console.log(res)
            this.getProduct()
        }).catch(err =>{
            console.log('Gagal')
        })
    }


    render(){
        if(this.props.user.username == ''){
            return(
                <div classname="text-center">
                    <h1>You have to be Logged in first</h1>
                </div>
            )
        } else{
                return(
                    <div className="container">
                        <h1 className="display-4 text-center">List Product</h1>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr className='text-center'>
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
                        {this.onBtnEdit}
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

export default connect(mapStateToProps)(ManageProduct)