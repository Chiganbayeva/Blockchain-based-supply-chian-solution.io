import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './App.css'
import PageDistributor from "./PageDistributor";


class AcceptShipmentDistributor extends Component {


 eventOnClick = async () => {
    let productId, output
    productId = this.productId.value.toString()
    output = await this.props.acceptShipFromManufacturerToDistributor(productId);
    console.log(output);
  }
  render() {
    return (
        <body>
      
        
        <div class="container-fluid">
         
          <div class="row">
            <div class="pl-0 pr-0"><PageDistributor  listAcceptDistributor={this.props.listAcceptDistributor} list={this.props.list}  
            listDistributors={this.props.listDistributors} listRetailers={this.props.listRetailers}  listManufacturers={this.props.listManufacturers}></PageDistributor></div>
            
              <div class="col-md-3 pl-5 pr-0 pt-4">
                    <form>
                      <h3>Accept Shipment</h3>
                      <div className="form-group">
                        <label>Product Id</label>
                        <input className="form-control" placeholder="Enter product Id"
                          id="productId" ref={(input) => { this.productId = input }} />
              </div>
                    
                      
                    <Link onClick={() => this.eventOnClick()} style={{textDecoration:"none",color:"black"}}>
                    <button type="submit" class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>Accept shipment
                    </button>
                    </Link>
                    
                    </form>
                    <br></br>
            </div>
          </div>
          
        </div>
        </body>
    );
  }
}
export default withRouter(AcceptShipmentDistributor);