import React, { Component } from 'react';

import axios from 'axios';
// import callAPI from './callAPI/config';
// import Swal from 'sweetalert2';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _product: [],
            id: '',
            name: "",
            image: "",
            id_type: "",
            description: "",
            unit: "",
            promotion_price: "",
            new: "",
            unit_price: "",
        }


        this.onChange = this.onChange.bind(this);
        this.postProduct = this.postProduct.bind(this);
        this.update=this.update.bind(this);
        this.updateData=this.updateData.bind(this);
        this.delete=this.delete.bind(this);
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
    }

    clear = () => {
        this.setState({ name: "" })
        this.setState({ id_type: "" })
        this.setState({ image: "" })
        this.setState({ description: "" })
        this.setState({ unit: "" })
        this.setState({ promotion_price: "" })
        this.setState({ new: "" })
        this.setState({ unit_price: "" })

    }

    createForm = () => {
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('unit_price', this.state.unit_price);
        formData.append('promotion_price', this.state.promotion_price);
        formData.append('unit', this.state.unit);
        formData.append('description', this.state.description);
        formData.append('type', this.state.type_product);
        formData.append('image', this.state.image);
        return formData;
    }
    postProduct = (event) => {
        event.preventDefault();
        //const formData = this.createForm();             
        const FormData = {
            name: this.state.name,
            id_type: this.state.id_type,
            image: this.state.image,
            description: this.state.description,
            unit: this.state.unit,
            promotion_price: this.state.promotion_price,
            new: this.state.new,
            unit_price: this.state.unit_price
        }
        console.log(FormData);

        axios.post('http://localhost:8000/api/product/', FormData)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err));

        this.clear();
        this.getData();
    }
    componentDidMount() {
        this.getData();
    }


    formValidate = () => {
        if (document.getElementById('name').value === "") {
            alert('Nhap ten san pham');
            return false;
        }
    }
    getData = () => {
        axios.get('http://localhost:8000/api/product')
            .then(res => {
                this.setState({
                    _product: res.data
                });
                console.log(this.state._product);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // update = (id) => {

    //     console.log("hihih");
    //     console.log(this.state.id);
    //     var dataFrom = this.createFrom();
    //     callAPI(`product/${id}`, "PUT", dataFrom).then((response) => {
    //         alert("Update drink successly !");
    //         this.clear()
    //         this.getData()
    //         window.location.reload()
    //     });

    // }

    // updateData = (id) => {
    //     this.clear();
    //     var product = this.state._product;
    //     product.filter(drink => {
    //         if (drink.id === id) {
    //             this.setState({
    //                 name: drink.name,
    //                 image: drink.image,
    //                 id_type: drink.id_type,
    //                 description: drink.description,
    //                 unit: drink.unit,
    //                 promotion_price: drink.promotion_price,
    //                 new: drink.new,
    //                 unit_price: drink.unit_price
    //             })
    //         }
    //     })
    // }

    // delete = (id) => {
    //     if (window.confirm('Bạn Co Thuc Su Muon Xoa')) {
    //         callAPI(`product/${id}`, "DELETE", null).then((response) => {
    //             this.clear();
    //             this.getData();
    //             alert("Xoá thành công!");
    //         });
    //     } else {
    //         return;
    //     }
    // }


    readURL = (event) => {
        setTimeout(() => {
            var reader = new FileReader();
            $('#img').removeAttr('hidden');
            reader.onload = function (e) {
                $('#img')
                    .attr('src', e.target.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
            , 1000
        );
        this.setState({
            image: event.target.files[0]
        });
    }

    update (id) { 
        const Form = {
                name: this.state.name,
                id_type: this.state.id_type,
                image: this.state.image,
                description: this.state.description,
                unit:this.state.unit,
                promotion_price:this.state.promotion_price,
                new:this.state.new,
                unit_price:this.state.unit_price
        }
        // callAPI(`product/${id}`, "PUT", Form).then((response) => {
        //     alert("Update drink successly !");
        //     this.clear()
        //     this.getData()
        //     window.location.reload()
        // });
        axios.patch(`http://localhost:8000/api/product/${id}`, Form)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err));
    }

    updateData (id) {
        this.clear();
        var _product = this.state._product;
        _product.filter(drink => {
            if (drink.id === id) {
                this.setState({
                    name:drink.name,
                    id_type:drink.id_type,
                    image:drink.image,
                    description:drink.description,
                    unit:drink.unit,
                    promotion_price:drink.promotion_price,
                    new:drink.new,
                    unit_price:drink.unit_price

                })
            }
        })
    }


    // Function Delete
    delete = (id) => {
        if (window.confirm('Bạn Co Thuc Su Muon Xoa')) {
            axios.delete(`http://localhost:8000/api/product/${id}`, null)
            .then(res => console.log(res.data))
            .catch((err) => console.log(err));
        } else {
            return;
        }
    }

    render() {
        // console.log(this.state.img.toString());
        const { _product } = this.state;
        return (
            <div >

                <div className="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="panel-heading">
                                    <h3 className="panel-title">Add Products</h3>
                                </div>
                            </div>
                            <div className="modal-body" id="mediumBody">
                                <div className="row">

                                    <section className="panel panel-default">

                                        <div className="panel-body">
                                            <form enctype="multipart/form-data" onSubmit={(event) => this.postProduct(event)} className="form-horizontal" method="post" role="form">

                                                <div className="form-group">
                                                    <label htmlFor="name" className="col-sm-3 control-label">Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name="name" id="name" placeholder="Nhập tên sản phẩm" value={this.state.name} onChange={this.onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Chon</label>
                                                    <div className="col-sm-5">
                                                        <label className="control-label small" htmlFor="id_type">Name Type </label>
                                                        <div class="form-outline form-white">
                                                            <select class="form-control" onChange={this.onChange} >
                                                                {this.state._product.length > 0 &&
                                                                    this.state._product.map(e => {
                                                                        return <option name="id_type" value={e.id}>{e.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label className="control-label small" htmlFor="unit_price">Unit_Price</label>
                                                        <input type="text" className="form-control" name="unit_price" placeholder="Nhập unit price" value={this.state.unit_price} onChange={this.onChange} />
                                                    </div>

                                                </div> {/* form-group // */}
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Nhập</label>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="unit">Unit </label>
                                                        <input type="text" className="form-control" name="unit" placeholder="Nhập unit" value={this.state.unit} onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="new">New</label>
                                                        <input type="text" className="form-control" name="new" placeholder="Nhập id new" value={this.state.new} onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label htmlFor="promotion_price" className="col-sm-3 control-label" >Promotion_Price</label>
                                                        <input type="text" className="form-control" name="promotion_price" placeholder="Nhập gia khuyen mai sản phẩm" value={this.state.promotion_price} onChange={this.onChange} />
                                                    </div>
                                                </div> {/* form-group // */}
                                                <div className="form-group">
                                                    <label htmlFor="description" className="col-sm-3 control-label">Description</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name="description" placeholder="Nhập mo ta sản phẩm" value={this.state.description} onChange={this.onChange} />
                                                    </div>

                                                </div> {/* form-group // */}


                                                <div className="form-group">
                                                    <label htmlFor="image" className="col-sm-3 control-label">Tải hình ảnh</label>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="image">Image (jpg/png):</label> <input type="file" name="image" onChange={this.onChange} />
                                                    </div>
                                                    <div class="col-sm-3">
                                                        <img style={{ width: "8rem", height: "8rem" }} src="" hidden id="img" />
                                                    </div>
                                                </div> {/* form-group // */}
                                                <hr />
                                                <div className="form-group">
                                                    <div className="col-sm-offset-3 col-sm-9">
                                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                                    </div>
                                                </div> {/* form-group // */}
                                            </form>
                                        </div>{/* panel-body // */}
                                    </section>{/* panel// */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editProduct" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="panel-heading">
                                    <h3 className="panel-title">Edit Products</h3>
                                </div>
                            </div>
                            <div className="modal-body" id="mediumBody">
                                <div className="row">

                                    <section className="panel panel-default">

                                        <div className="panel-body">
                                            <form enctype="multipart/form-data" onSubmit={() => this.update(this.state.id)} className="form-horizontal" role="form">
                                                         
                                                <div className="form-group">
                                                    <label htmlFor="name" className="col-sm-3 control-label">Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name="name" id="name" placeholder="Nhập tên sản phẩm" value={this.state.name} onChange={this.onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Chon</label>
                                                    <div className="col-sm-5">
                                                        <label className="control-label small" htmlFor="id_type">Name Type </label>
                                                        <div class="form-outline form-white">
                                                            <select class="form-control" onChange={this.onChange} >
                                                                {this.state._product.length > 0 &&
                                                                    this.state._product.map(e => {
                                                                        return <option name="id_type" value={e.id}>{e.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label className="control-label small" htmlFor="unit_price">Unit_Price</label>
                                                        <input type="text" className="form-control" name="unit_price" placeholder="Nhập unit price" value={this.state.unit_price} onChange={this.onChange} />
                                                    </div>

                                                </div> {/* form-group // */}
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Nhập</label>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="unit">Unit </label>
                                                        <input type="text" className="form-control" name="unit" placeholder="Nhập unit" value={this.state.unit} onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="new">New</label>
                                                        <input type="text" className="form-control" name="new" placeholder="Nhập id new" value={this.state.new} onChange={this.onChange} />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label htmlFor="promotion_price" className="col-sm-3 control-label" >Promotion_Price</label>
                                                        <input type="text" className="form-control" name="promotion_price" placeholder="Nhập gia khuyen mai sản phẩm" value={this.state.promotion_price} onChange={this.onChange} />
                                                    </div>
                                                </div> {/* form-group // */}
                                                <div className="form-group">
                                                    <label htmlFor="description" className="col-sm-3 control-label">Description</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name="description" placeholder="Nhập mo ta sản phẩm" value={this.state.description} onChange={this.onChange} />
                                                    </div>

                                                </div> {/* form-group // */}


                                                <div className="form-group">
                                                    <label htmlFor="image" className="col-sm-3 control-label">Tải hình ảnh</label>
                                                    <div className="col-sm-3">
                                                        <label className="control-label small" htmlFor="image">Image (jpg/png):</label> <input type="file" name="image" onChange={() => this.readURL} />
                                                    </div>

                                                </div> {/* form-group // */}
                                                <hr />
                                                <div className="form-group">
                                                    <div className="col-sm-offset-3 col-sm-9">
                                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                                    </div>
                                                </div> {/* form-group // */}
                                            </form>
                                        </div>{/* panel-body // */}
                                    </section>{/* panel// */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <center className="text-center"> <h1>Show Form</h1> </center>
                <a class="btn btn-success text-light" data-toggle="modal" id="addProduct" data-target="#addProduct"
                    title="Create a project"> <i class="fas fa-plus-circle"></i>
                </a>
                {/* <span scope="col"><a href="admin_add" className="btn btn-primary">add</a></span>                 */}
                <table className="table table-striped table-dark" id="dataTable">
                    <thead >

                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Promotion price</th>
                            <th scope="col">Unit</th>
                            <th scope="col">new</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    <tfoot>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Promotion price</th>
                            <th scope="col">Unit</th>
                            <th scope="col">new</th>
                            <th scope="col">Action</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                            _product.map(a => (
                                <tr>
                                    <th scope="col">{a.id}</th>
                                    <td><img src={"source/image/product/" + a.image} height="200px" width="500px" /></td>
                                    <td>{a.name}</td>
                                    <td>{a.id_type}</td>
                                    <td>{a.description}</td>
                                    <td>{a.unit_price}</td>
                                    <td>{a.promotion_price}</td>
                                    <td>{a.unit}</td>
                                    <td>{a.new}</td>
                                    <td>
                                        <form >
                                            <a className="btn btn-warning" data-toggle="modal" id="editProduct" data-target="#editProduct" onClick={() => this.updateData(a.id)}>Editer</a>
                                        </form>
                                        <form >
                                            <button className="btn btn-danger"  onClick={()=>this.delete(a.id)}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Index;
