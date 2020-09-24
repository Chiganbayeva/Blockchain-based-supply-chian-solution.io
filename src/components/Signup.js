import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Redirect ,Switch ,Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'



class Signup extends Component {

onSubmit=(event) => {
  let email = this.Email.value.toString()
  let name = this.firstName.value.toString()
  let type = this.typeUser.value.toString()
 
 this.props.createUser(email,name,type)
 
 
}


  render() {
    return (


<body>
<div class="container">


<div class="row justify-content-center">

<div class="col-xl-12 col-lg-12 col-md-9">

  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0 ">
   
      <div class="row">
       
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Welcome to Supply Chain application</h1>
            </div>

            <form >  
            

              <div class="form-group">
                    <label for="Email">Email address</label>
                    <input type="email" class="form-control" id="Email"  placeholder="Enter email ..."
                    ref={(input) => {this.Email = input}} required/>
              </div>
              <div class="form-group">
                    <label for="firstName">Name of company</label>
                    <input type="text" class="form-control" id="firstName"  placeholder="Enter name ..."
                   ref={(input) => {this.firstName = input}} required/>
              </div>
      
              <div className="form-group">
                    <label for= "typeUser">Please select your position</label>
                   <select id = "typeUser" name="typeUser" className="form-control" ref={(option) => { this.typeUser = option }} >
                       <option value="Manufacturer">Manufacturer</option>
                       <option value="Distributor">Distributor</option>
                       <option value="Retailer">Retailer</option>
                   </select>
              </div>
                
              <div class="form-group">
                <div class="custom-control custom-checkbox small">
                  <input type="checkbox" class="custom-control-input" id="customCheck"/>
                  <label class="custom-control-label" for="customCheck">Remember Me</label>
                </div>
              </div>
             
              <Link onClick={() => this.onSubmit()} style={{textDecoration:"none",color:"black"}}>
            <button class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>
              Submit
              </button>  
              </Link >
            </form>
            <br/>
             
                <Link to="/Authorized" style={{textDecoration:"none",color:"black"}}>
                <button class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}> Login 
                </button></Link>
              
                                
          </div>
        </div>


        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Track for users</h1>
            </div>
             
                <Link to="/Track" style={{textDecoration:"none",color:"black"}}>
                <button class="btn btn-primary" style={{backgroundColor:"rgb(255, 140, 26)",borderColor:"rgb(255, 140, 26)"}}>Track
                </button></Link>

          </div>
        </div>

      </div>
    </div>
  </div>

</div>

</div>

</div>
   
</body>

    );
};
}
export default withRouter(Signup)