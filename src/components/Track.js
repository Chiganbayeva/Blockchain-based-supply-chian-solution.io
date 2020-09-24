import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css'
import TrackingData from "./TrackingData";

class Track extends Component {
  constructor() {
    super();
    this.state = {
      showComponent: false,
    };
  }

  eventOnClick = async () => {
    let batchId
    batchId = this.batchId.value
    console.log(batchId);
    await this.props.track(batchId);
    this.setState({
      showComponent: true,
    })
  }
  render() {
    return (
      

<body>
      
        
      <div class="container-fluid">
       
        <div class="row">
        
          <div class="col-md-4 pl-4 pr-0 pb-3 pt-5">
              <div class="row">
              <div class="col-md-8 pl-5 pr-0 pb-5">
                <form>
                <div class="form-group">
                    <label for="batchId">Product Id</label>
                    <input type="text" class="form-control" id="productId"  placeholder="Enter product Id"
                    ref={(input) => { this.batchId = input }} required/>
                </div>
                
                
                <Link onClick={() => this.eventOnClick()} style={{textDecoration:"none",color:"black"}}>
                <button type="submit" class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>Track</button>
                </Link>
                
                </form>
                </div>
              
                <div class="col-md-5 pl pr-0 pb-5">
                {this.state.showComponent && <TrackingData  staProd = {this.props.staProd}  tthArray={this.props.tthArray} ttdArray={this.props.ttdArray} statusm={this.props.statusm} typPe={this.props.typPe} adrManuf={this.props.adrManuf} dtProduct={this.props.dtProduct} dtPrdShip={this.props.dtPrdShip} nameD={this.props.nameD} addrssDis={this.props.addrssDis} accpDis={this.props.accpDis} dtDsShip={this.props.dtDsShip} tpRet={this.props.tpRet} adrRet={this.props.adrRet} dtAcpRe={this.props.dtAcpRe} />}
                </div>
              </div>

         </div>
        </div>
        
      </div>
      </body>
    );
  }
}


export default Track;