import React, { Component } from 'react'
import PageRetailer from './PageRetailer'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Table } from "react-bootstrap";




class CreateProductRetailer extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
   
      listRetailers:this.props.listRetailers,
      tthArray: ["Email", "Address","Name","Type"]
    
    }
  }


  render() {
 
  

    return (

      <div class="container-fluid">
       
       <div class="row">
          <div class="pl-0 pr-0"><PageRetailer listAcceptRetailer={this.props.listAcceptRetailer} list={this.props.list} 
          listDistributors={this.props.listDistributors} listRetailers={this.props.listRetailers}  
          listManufacturers={this.props.listManufacturers}></PageRetailer></div>
              
      <div class="col-md-4 pl-5 pr-0">
       
       <h1>You are not authorised to create product.
         Log in as Manufacturer
       </h1>
         
    </div>
    </div>
    </div>
    );
    
  
  }
}


export default withRouter(CreateProductRetailer);
