import React, { Component } from 'react'
import PageManufacturer from './PageManufacturer';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom'
import './App.css'



class ShipToDistributor extends Component {

  eventOnClick = (event) => {
    let productId, consignmentNumber, emailDistributor, nameProduct, nameDistributor, nameTransporter, vehRegNumber
    productId = this.productId.value.toString()
    consignmentNumber = this.consignmentNumber.value.toString()
    emailDistributor = this.emailDistributor.value.toString()
    nameProduct = this.nameProduct.value.toString()
    nameDistributor= this.nameDistributor.value.toString()
    nameTransporter = this.nameTransporter.value.toString()
    vehRegNumber = this.vehRegNumber.value.toString()
    this.props.shipProductToDistributor(productId, consignmentNumber, emailDistributor, nameProduct, nameDistributor, nameTransporter, vehRegNumber);
  }
  render() {
    return (

      
      <body>
      
        
      <div class="container-fluid">
       
        <div class="row">
          <div class="pl-0 pr-0"><PageManufacturer listRetailers={this.props.listRetailers}  listManufacturers={this.props.listManufacturers} 
          listDistributors={this.props.listDistributors}  list={this.props.list}></PageManufacturer></div>
          
          <div class="col-md-8 pl-5 pr-0 pt-4">
        <form>
        <div class="form-group">
            <label for="productId">Product Id</label>
            <input type="text" class="form-control" id="productId"  placeholder="Enter product Id"
            ref={(input) => { this.productId = input }} required/>
        </div>
        <div class="form-group">
            <label for="consignmentNumber">Consignment Number</label>
            <input type="text" class="form-control" id="consignmentNumber" placeholder="Enter Consignment Number"
            ref={(input) => { this.consignmentNumber = input }} required/>
        </div>
        <div class="form-group">
            <label for="emailDistributor">Distributor Email</label>
            <input type="text" class="form-control" id="emailDistributor" placeholder="Enter Distributor Email"
            ref={(input) => { this.emailDistributor = input }} required/>
        </div>
        <div class="form-group">
            <label for="nameProduct">Product Name</label>
            <input type="text" class="form-control" id="nameProduct" placeholder="Enter Product Name"
            ref={(input) => { this.nameProduct = input }} required/>
        </div>
        
        <div class="form-group">
            <label for="nameDistributor">Distributor Name</label>
            <input type="text" class="form-control" id="nameDistributor" placeholder="Enter name of distributor"
            ref={(input) => { this.nameDistributor = input }} required/>
        </div>
        <div class="form-group">
            <label for="nameTransporter">Name of Transporter</label>
            <input type="text" class="form-control" id="nameTransporter" placeholder="Enter transporter name"
            ref={(input) => { this.nameTransporter = input }} required/>
        </div>
        <div class="form-group">
            <label for="vehRegNumber">Vehicle registration number</label>
            <input type="text" class="form-control" id="vehRegNumber" placeholder="Enter vehicle registration number"
            ref={(input) => { this.vehRegNumber = input }} required/>
        </div>
  
        <Link onClick={() => this.eventOnClick()} style={{textDecoration:"none",color:"black"}}>
        <button  class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>Create Shipment</button>  
        </Link>
        
        </form>
        </div>


        </div>
        
      </div>
      </body>
            
    );
  }
}

export default ShipToDistributor;
