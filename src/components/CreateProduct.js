import React, { Component } from 'react';
import PageManufacturer from './PageManufacturer';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";

class CreateProduct extends Component {
  eventOnClick = (event) => {
    let productId,nameProduct, material, description, quantity, color
    productId = this.productId.value.toString()
    nameProduct = this.nameProduct.value.toString()
    material = this.material.value.toString()
    description = this.description.value.toString()
    quantity= this.quantity.value.toString()
    color = this.color.value.toString()
    this.props.createNewProduct(productId, nameProduct, material, description,quantity,color);
  }



  render() {
   

    return (
     <body>
      
        
      <div class="container-fluid">
         
        <div class="row">
          <div class="pl-0 pr-0"><PageManufacturer listManufacturers={this.props.listManufacturers} 
          listDistributors={this.props.listDistributors} listRetailers={this.props.listRetailers} list={this.props.list}></PageManufacturer></div>
          
          <div class="col-md-7 pl-5 pr-0 pt-4">
        <form>
        <div class="form-group">
            <label for="productId">Product Id</label>
            <input type="text" class="form-control" id="productId"  placeholder="Enter product Id"
            ref={(input) => { this.productId = input }} required/>
        </div>
        <div class="form-group">
            <label for="nameProduct">Product Name</label>
            <input type="text" class="form-control" id="nameProduct" placeholder="Enter Product Name"
            ref={(input) => { this.nameProduct = input }} required/>
        </div>
        <div class="form-group">
            <label for="material">Material</label>
            <input type="text" class="form-control" id="material" placeholder="Enter material"
            ref={(input) => { this.material = input }} required/>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" placeholder="Enter description of product"
            ref={(input) => { this.description = input }} required/>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="text" class="form-control" id="quantity" placeholder="Enter how many products"
            ref={(input) => { this.quantity = input }} required/>
        </div>
        <div class="form-group">
            <label for="color">Weight</label>
            <input type="text" class="form-control" id="color" placeholder="Enter weight of product"
            ref={(input) => { this.color = input }} required/>
        </div>
        
        <Link onClick={() => this.eventOnClick()} style={{textDecoration:"none",color:"black"}}>
        <button type="submit" class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}> 
          Create Product
          </button>
        </Link>
        
        </form>

   
        </div>
        </div>
        
      </div>
      </body>
    );
  }
}

export default CreateProduct;
