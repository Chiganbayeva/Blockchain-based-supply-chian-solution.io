import './App.css';
import Identicon from 'identicon.js'
import React, { Component } from 'react'




class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
        <a className="navbar-brand col-sm-2 col-md-2 mr-0" target="_blank"  href="http://localhost:3000"

        >
         Supply chain 
        </a>

        <ul className="navbar-nav px-3">
          <li>
            <small >
              <small style={{color:"white",fontSize:"20px"}}
              id="account">{this.props.account}
              
              </small>
            </small>

            { this.props.account
              ? <img
                className="ms-2"
                src={`data:image/png;base64,${new Identicon(this.props.account, 32).toString()}`}
                height='32'
                width='32'
              />
              : <span></span>
            }

          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
