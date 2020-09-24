import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'



class Authorized extends Component {

  onLogin = async () => {
   
    let inputEmail = this.emailCheck.value.toString()
    let ListOfResults = await this.props.CheckLogIn(inputEmail);
    if (!ListOfResults == "") {
    let email = ListOfResults[1];
    let type = ListOfResults[0];
    console.log("Dina email: " + email + " " + type)
    if (type == "Manufacturer") {
      this.props.history.push("/PageManufacturer");
    } else if (type=="Distributor"){
      this.props.history.push("/PageDistributor");
     }
     else if (type=="Retailer"){
      this.props.history.push("/PageRetailer");
     }
    }
    

  }

  render() {
    return (


<div class="container">



<div class="row justify-content-center">

<div class="col-xl-6 col-lg-12 col-md-9">

  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0 ">
   
      <div class="row">
       
        <div class="col-lg-12">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Welcome to Supply Chain application</h1>
            </div>

                <form >
              <div class="form-group">
                <input type="email"
                  class="form-control form-control-user"
                  id="emailCheck" aria-describedby="emailHelp"
                  ref={(input) => { this.emailCheck = input }}
                  placeholder="Enter email address" />
              </div>
              
                <Link onClick={() => this.onLogin()} style={{textDecoration:"none",color:"black"}}>
                <button class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>
                  Login
                  </button>                  
                  </Link >
            </form>                
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

</div>









</div>
    







    );
  }
}


export default withRouter(Authorized);
