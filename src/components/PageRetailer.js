import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { withRouter } from 'react-router-dom'

class PageRetailer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  ClickProducts  = async() => {

    let tthArray = ["Product Id", "Manufacturer address", "Product Name", "Material", "Description", "Quantity", "Size"]
    this.state.outputList1 = tthArray.map((prop, key) => {
     return <th key={key}>{prop}</th>
   })
    
  this.state.outputList = this.props.list.map((item,index) =>{
    
   return (
   <tr key={index}>
     {item.map((item,index) =>{
       return <td key={index} style={{border: "solid", borderColor: "black"}}>{item}</td>
     })}
     
         
     </tr>
     );

 })     

}

ClickAcceptRetailer = async () =>
{
  
  let tthArray = ["Product Id", "Manufacturer address", "Product Name", "Material", "Description", "Quantity", "Size"]
  this.state.outputList1 = tthArray.map((prop, key) => {
   return <th key={key}>{prop}</th>
 })
  
this.state.outputList = this.props.listAcceptRetailer.map((prop, key) => {
   return (
     <tr key={key}>
       {prop.map((prop, key) => {
         return <td key={key}>{prop}</td>;
       })}
     </tr>
   );
 })
}

ClickDistributors()
{
 
  let tthArray = ["Email", "Address","Name","Type"]
   this.state.outputList1 = tthArray.map((prop, key) => {
    return <th key={key}>{prop}</th>
  })
   
 this.state.outputList = this.props.listDistributors.map((prop, key) => {
    return (
      <tr key={key}>
        {prop.map((prop, key) => {
          return <td key={key}>{prop}</td>;
        })}
      </tr>
    );
  }) 
}

ClickRetailers(){
  let tthArray = ["Email", "Address","Name","Type"]
   this.state.outputList1 = tthArray.map((prop, key) => {
    return <th key={key}>{prop}</th>
  })
   
 this.state.outputList = this.props.listRetailers.map((prop, key) => {
    return (
      <tr key={key}>
        {prop.map((prop, key) => {
          return <td key={key}>{prop}</td>;
        })}
      </tr>
    );
  })
}

ClickManufacturers()
{
  let tthArray = ["Email", "Address","Name","Type"]
  this.state.outputList1 = tthArray.map((prop, key) => {
   return <th key={key}>{prop}</th>
 })
  
this.state.outputList = this.props.listManufacturers.map((prop, key) => {
   return (
     <tr key={key}>
       {prop.map((prop, key) => {
         return <td key={key}>{prop}</td>;
       })}
     </tr>
   );
 })
}

  render() {
    return (
        <div class="container-fluid">
        <div class="row"> 
      
        <nav class="sidebar">
           
              <ul class="nav flex-column">
              <li class="nav-item">
                <Link className="nav-link"  to={"/CreateProductRetailer"}>
                <span><b>Create Product</b></span>
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link"  to={"/PageRetailer"} onClick={() => this.ClickProducts()}>
                <span><b>List Products</b></span>
                </Link>
              </li>
                <li class="nav-item">
                  <Link className="nav-link"  to={"/AcceptShipmentRetailer"}>
                  <span><b>Accept Shipment from Distributor</b></span>
                  </Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to={"/PageRetailer"} onClick={() => this.ClickAcceptRetailer()}>
                <span><b>List Accept Shipment</b></span>
                </Link>
              </li>
                <li class="nav-item">
                  <Link className="nav-link"  to={"/Track"}>
                  <span><b>Track</b></span>
                  </Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to={"/PageRetailer"} onClick={() => this.ClickManufacturers()}>
                <span><b>List Manufacturers</b></span>
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={"/PageRetailer"} onClick={() => this.ClickRetailers()}>
                <span><b>List Retailers</b></span>
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={"/PageRetailer"}  onClick={() => this.ClickDistributors()}>
                <span><b>List Distributors</b></span>
                </Link>
              </li>
              <Link to={"/"}><button class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>Back
                </button></Link>
               
              </ul>
            
          </nav>

          <div class="col-sm pt-4">
              <Table striped hover>
                    <thead>
                      <tr>
                      
                         {this.state.outputList1}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.outputList}
                    </tbody>
                  </Table>
                 
              </div>
         
        </div>
      </div>
    );
  }
}
export default withRouter(PageRetailer);
