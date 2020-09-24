import React, { Component } from 'react'
import PageDistributor from './PageDistributor';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom'
import './App.css'
import { Container, Row, Col, Table } from "react-bootstrap";

class ShipToRetailer extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  eventOnClick = (event) => {
    let productId, consignmentNumber, emailRetailer, nameProduct, nameRetailer, nameTransporter, vehRegNumber
    productId = this.productId.value.toString()
    consignmentNumber = this.consignmentNumber.value.toString()
    emailRetailer = this.emailRetailer.value.toString()
    nameProduct = this.nameProduct.value.toString()
    nameRetailer= this.nameRetailer.value.toString()
    nameTransporter = this.nameTransporter.value.toString()
    vehRegNumber = this.vehRegNumber.value.toString()
    this.props.shipProductToRetailer(productId, consignmentNumber, emailRetailer, nameProduct, nameRetailer, nameTransporter, vehRegNumber);
  }
  render() {
    return (

      
      <body>
      
        
      <div class="container-fluid">
       
        <div class="row">
          <div class="pl-0 pr-0"><PageDistributor listAcceptDistributor={this.props.listAcceptDistributor} list={this.props.list}  
          listDistributors={this.props.listDistributors} listRetailers={this.props.listRetailers}  
          listManufacturers={this.props.listManufacturers}></PageDistributor></div>
          
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
            <label for="emailRetailer">Retailer Email</label>
            <input type="text" class="form-control" id="emailRetailer" placeholder="Enter Retailer Email"
            ref={(input) => { this.emailRetailer = input }} required/>
        </div>
        <div class="form-group">
            <label for="nameProduct">Product Name</label>
            <input type="text" class="form-control" id="nameProduct" placeholder="Enter Product Name"
            ref={(input) => { this.nameProduct = input }} required/>
        </div>
        
        <div class="form-group">
            <label for="nameRetailer">Retailer name</label>
            <input type="text" class="form-control" id="nameRetailer" placeholder="Enter name of retailer"
            ref={(input) => { this.nameRetailer = input }} required/>
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
        <button type="submit" class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}> 
          Create Shipment to Retailer
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

export default ShipToRetailer;
