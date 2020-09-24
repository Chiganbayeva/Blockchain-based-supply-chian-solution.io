import React, { Component } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import CreateProductDistributor from './CreateProductDistributor'
import './App.css'
import Signup from './Signup'
import SupplyChain from '../abis/SupplyChain.json'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import PageManufacturer from './PageManufacturer'
import PageDistributor from './PageDistributor'
import PageRetailer from "./PageRetailer"
import Authorized from './Authorized'
import CreateProduct from "./CreateProduct"
import ShipToDistributor from "./ShipToDistributor"
import ShipToRetailer from "./ShipToRetailer"
import Track from "./Track"
import AcceptShipmentDistributor from "./AcceptShipmentDistributor"
import AcceptShipmentRetailer from "./AcceptShipmentRetailer"
import CreateProductRetailer from "./CreateProductRetailer"






class App extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })


    const networkId = await web3.eth.net.getId()
    const supplyChainData = SupplyChain.networks[networkId]
    if (supplyChainData) {
      const supplyChain = new web3.eth.Contract(SupplyChain.abi, supplyChainData.address)
      this.setState({ supplyChain })
      let list = await this.allProducts();
      console.log(list);
      this.setState({ list })
      await this.allDistributors();
      await this.listToAccept();
    } else {
      window.alert('SupplyChain contract did not deploy yet.')
    }

    this.setState({ loading: false })
  }





  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }





  createUser(email, name, type) {
    this.setState({ loading: true })
    this.state.supplyChain.methods.addUser(email, name, type).send({ from: this.state.account },
      error => {
        console.log(error);
        if (error.code == "-32603") {
          window.alert("Address is already registered");

        }

      })

  }


  createNewProduct(productId, nameProduct, material, description, quantity, size) {
    console.log('App' + productId, nameProduct, material, description, quantity, size);
    this.state.supplyChain.methods.addProduct(productId, nameProduct, material, description, quantity, size).send({ from: this.state.account },
      error => {
        console.log(error);
      })
  }

  shipProductToDistributor(productId, consignmentNumber, emailDistributor, nameProduct, nameDistributor, nameTransporter, vehRegNumber) {
    this.state.supplyChain.methods.addShipmentToDistributor(productId, consignmentNumber, emailDistributor, nameProduct, nameDistributor, nameTransporter, vehRegNumber).send({ from: this.state.account }).once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  async CheckLogIn(inputEmail) {

    let type = '';
    let email = '';
    let trueOrFalse = "";
    let obj = await this.state.supplyChain.methods.logIn(inputEmail).call()

    let arrayObj = Object.values(obj);
    arrayObj.forEach(function (item, index) {
      if (index == 0) {
        trueOrFalse = item
      }
      else if (index == 1) {
        email = item;
      }
      else if (index == 2) {
        type = item;
      }

    })
    if (trueOrFalse == false) {
      window.alert("User does not exist")
    }
    else { return [type, email] }
  }




  async allProducts() {
    let numberProducts;
    numberProducts = await this.state.supplyChain.methods.howManyProducts().call().then(function (response) {
      numberProducts = parseInt(response)
  
      return numberProducts;
    })

    let list = [];

    for (let i = 0; i < numberProducts; i++) {
      await this.state.supplyChain.methods.getProductByIndex(i).call().then(function (response) {
        var obj = response;
        var arrayObj = Object.values(obj);
        let q, w, e, r, t, y, u;
        arrayObj.forEach(function (item, index) {
          if (index == 0) {
            q = item.toNumber();

          }
          else if (index == 1) {
            w = item;
          }
          else if (index == 2) {
            e = item;
          }
          else if (index == 3) {
            r = item;
          }
          else if (index == 4) {
            t = item;
          }
          else if (index == 5) {
            y = parseInt(item);

          }
          else if (index == 6) {
            u = item;
          }

        })

        list[i] = new Array(q, w, e, r, t, y, u)
      })
    }
    return list;

  }


  async allDistributors() {
    let numberDistributor;
    numberDistributor = await this.state.supplyChain.methods.howManyUsers().call().then(function (response) {
      numberDistributor = parseInt(response)
      return numberDistributor;
    })

    let listDistributors = [];
    let listRetailers = [];
    let listManufacturers = [];
    let indexD = 0;
    let indexR = 0;
    let indexM = 0

    for (let i = 0; i < numberDistributor; i++) {
      await this.state.supplyChain.methods.getUserByIndex(i).call().then(function (response) {
        var obj = response;
        var arrayObj = Object.values(obj);
        let q, w, e, r;
        arrayObj.forEach(function (item, index) {
          if (index == 0) {
            q = item;

          }
          else if (index == 1) {
            w = item;
          }
          else if (index == 2) {
            e = item;
          }
          else if (index == 3) {

            r = item;

          }


        })
        if (r == "Distributor") {
          listDistributors[indexD] = new Array(q, w, e, r);
          indexD++;
        }
        else if (r == "Retailer") {
          listRetailers[indexR] = new Array(q, w, e, r);
          indexR++;
        }
        else if (r == "Manufacturer") {
          listManufacturers[indexM] = new Array(q, w, e, r);
          indexM++;
        }

      })
    }
    this.setState({ listDistributors });
    this.setState({ listRetailers });
    this.setState({ listManufacturers });
    console.log(listManufacturers)
    console.log(listRetailers)
    console.log(listDistributors)
    return listDistributors;

  }


  async listToAccept() {
    let number;
    number = await this.state.supplyChain.methods.howManyProducts().call().then(function (response) {
      number = parseInt(response)
      return number;
    })

    let listAcceptDistributor = [];
    let listAcceptRetailer = [];
    let indexD = 0;
    let indexR = 0;
    let id, w, e, r, t, y, u;

    for (let i = 0; i < number; i++) {
      await this.state.supplyChain.methods.getProductByIndex(i).call().then(function (response) {
        var obj = response;
        var arrayObj = Object.values(obj);

        arrayObj.forEach(function (item, index) {
          if (index == 0) {
            id = item.toNumber();

          }
          else if (index == 1) {
            w = item;
          }
          else if (index == 2) {
            e = item;
          }
          else if (index == 3) {
            r = item;
          }
          else if (index == 4) {
            t = item;
          }
          else if (index == 5) {
            y = parseInt(item);

          }
          else if (index == 6) {
            u = item;
          }


        })


      })

      let status = await this.state.supplyChain.methods.listToAccept(id).call()
      console.log(status)
      if (status == "Shipped to Distributor") {
        listAcceptDistributor[indexD] = new Array(id, w, e, r, t, y, u);
        indexD++;
      }
      else if (status == "Shipped to Retailer") {
        listAcceptRetailer[indexR] = new Array(id, w, e, r, t, y, u);
        indexR++;
      }

    }
    this.setState({ listAcceptDistributor });
    this.setState({ listAcceptRetailer });
    console.log(listAcceptDistributor)
    console.log(listAcceptRetailer)

    return (listAcceptDistributor, listAcceptRetailer);

  }

  async numberProducts() {
    let numberProducts = await this.state.supplyChain.methods.howManyProducts().call().then(function (response) {
      numberProducts = parseInt(response);
      return numberProducts;
    })
    console.log(numberProducts);
  }


  async track(batchId) {
    let status = [];
    let dateproduct = new Date;
    let type = '';
    let addressMan = [];
    let dtProdShip = new Date;
    let name = '';
    let addressDis = [];
    let acpDis = new Date;
    let dtDisShip = new Date;
    let typeRet = '';
    let dateAcpR = new Date;
    let addressR = [];
    let obj = await this.state.supplyChain.methods.trackByProductId(batchId).call();
    let arrayObj = Object.values(obj);
    arrayObj.forEach(function (value, key) {
      if (key === 0) {
        status = value;
        if (status ===''){
      status ='Product does not exist';
    }
      }
      else if (key === 1) {
        type = value;
        if (type ===''){
          type ='Product does not exist';
        }
      }
      else if (key === 2) {
        addressMan = value;
        if (addressMan ==='0x0000000000000000000000000000000000000000'){
          addressMan ='None manufacterer!';
        }
      }
      else if (key === 3) {
        dateproduct = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
      }).format(new Date(value* 1000));

        if (dateproduct ==='01 January 1970, 01:00:00'){
          dateproduct ='None product date';
        }
      }
      else if (key === 4) {
        dtProdShip = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
      }).format(new Date(value* 1000));        
        if (dtProdShip ==='01 January 1970, 01:00:00'){
          dtProdShip ='None product shipment';
        }
      }
      else if (key === 5) {
        name = value;
        if (name ===''){
          name ='None distributor';
        }
      }
      else if (key === 6) {
        addressDis = value;
        if (addressDis ==='0x0000000000000000000000000000000000000000'){
          addressDis ='None distributor';
        }
      }
      else if (key === 7) {
        acpDis = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
      }).format(new Date(value* 1000));
        if (acpDis ==='01 January 1970, 01:00:00'){
          acpDis ='None distributor accept date';
        }
      }
      else if (key === 8) {
        dtDisShip = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
      }).format(new Date(value* 1000));
        if (dtDisShip ==='01 January 1970, 01:00:00'){
          dtDisShip ='None distributor shipment date';
        }
      }
      else if (key === 9) {
        typeRet = value;
        if (typeRet ===''){
          typeRet ='None retailer';
        }
      }
      else if (key === 10) {
        addressR = value;
        if (addressR ==='0x0000000000000000000000000000000000000000'){
          addressR ='None retailer';
        }
      }
      else if (key === 11) {
        dateAcpR = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
      }).format(new Date(value* 1000));
        if (dateAcpR ==='01 January 1970, 01:00:00'){
          dateAcpR ='None retailer accept date ';
        }
      }
    })
    const thArray = ["Status", "Manufacturer's name", "Address","Date/create product","Date/ship","Distributor's name","Distributor's address","Date/Distributor's accept","Date/Distributor shipment","Relaiter's name","Retailer address","Date/retailer accept"];
    const tdArray = [status, type, addressMan, dateproduct, dtProdShip, name, addressDis, acpDis, dtDisShip, typeRet, addressR, dateAcpR];
    const ttdArray = [tdArray];
    const tthArray = thArray;
    this.setState({tthArray,ttdArray, staProd: status});
    return [tdArray,thArray];
    
  }


  async acceptShipFromManufacturerToDistributor(productId) {
    let resFunct = await this.state.supplyChain.methods.acceptShippmentDistributor(productId).send({ from: this.state.account }).once('receipt', (receipt) => {
  
      let output = Object.values(resFunct);
      console.log(output);
      return [output]
    })
  }

  shipProductToRetailer(productId, consignmentNumber, emailRetailer, nameProduct, nameRetailer, nameTransporter, vehRegNumber) {
    console.log(productId, consignmentNumber, emailRetailer, nameProduct, nameRetailer, nameTransporter, vehRegNumber);
    this.state.supplyChain.methods.addShipmentToRetailer(productId, consignmentNumber, emailRetailer, nameProduct, nameRetailer, nameTransporter, vehRegNumber).send({ from: this.state.account }).once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  async acceptShipFromDistributorToRetailer(productId) {
    let resFunct = await this.state.supplyChain.methods.acceptShippmentRetailer(productId).send({ from: this.state.account }).once('receipt', (receipt) => {
      let output = Object.values(resFunct);
      console.log(output);
      return [output]
    })
  }



  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true
    }

    this.createUser = this.createUser.bind(this)
    this.CheckLogIn = this.CheckLogIn.bind(this)
    this.createNewProduct = this.createNewProduct.bind(this)
    this.numberProducts = this.numberProducts.bind(this)
    this.allProducts = this.allProducts.bind(this)
    this.shipProductToDistributor = this.shipProductToDistributor.bind(this)
    this.track = this.track.bind(this)
    this.acceptShipFromManufacturerToDistributor = this.acceptShipFromManufacturerToDistributor.bind(this);
    this.shipProductToRetailer = this.shipProductToRetailer.bind(this);
    this.acceptShipFromDistributorToRetailer = this.acceptShipFromDistributorToRetailer.bind(this);
   
  }





  render() {

    return (

      <Router>
        <div>
          <Navbar account={this.state.account} />

          <div className="container-fluid mt-5 pr-0 pl-0">

            <main >
              <div >


                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <Switch>

                  <Route path="/PageManufacturer"><PageManufacturer allDistributors={this.allDistributors} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers} list={this.state.list} allProducts={this.allProducts}></PageManufacturer></Route>
                  <Route path="/ListManufacturers"><CreateProductDistributor list={this.state.list} listManufacturers={this.state.listManufacturers}></CreateProductDistributor></Route>
                  <Route path="/ListRetailers"><CreateProductRetailer listRetailers={this.state.listRetailers} list={this.state.list}></CreateProductRetailer></Route>
                  <Route path="/ShipToDistributor"><ShipToDistributor listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers} list={this.state.list} allProducts={this.allProducts} shipProductToDistributor={this.shipProductToDistributor}></ShipToDistributor></Route>
                  <Route path="/ShipToRetailer"><ShipToRetailer listAcceptDistributor={this.state.listAcceptDistributor} list={this.state.list} listDistributors={this.state.listDistributors} listManufacturers={this.state.listManufacturers} listRetailers={this.state.listRetailers} shipProductToRetailer={this.shipProductToRetailer}></ShipToRetailer></Route>
                  <Route path="/CreateProduct"><CreateProduct listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers} list={this.state.list} createNewProduct={this.createNewProduct}></CreateProduct></Route>
                  <Route path="/CreateProductDistributor"><CreateProductDistributor listAcceptDistributor={this.state.listAcceptDistributor} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></CreateProductDistributor></Route>
                  <Route path="/CreateProductRetailer"><CreateProductRetailer listAcceptRetailer={this.state.listAcceptRetailer} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></CreateProductRetailer></Route>
                  <Route path="/Track"><Track list={this.state.list} track={this.track} tracking={this.tracking} staProd = {this.state.staProd} arrayyy = {this.state.arrayyy} tthArray = {this.state.tthArray} ttdArray ={this.state.ttdArray}></Track></Route>
                  <Route path="/PageDistributor"><PageDistributor listAcceptDistributor={this.state.listAcceptDistributor} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></PageDistributor></Route>
                  <Route path="/AcceptShipmentDistributor"><AcceptShipmentDistributor listAcceptDistributor={this.state.listAcceptDistributor} allProducts={this.allProducts} acceptShipFromManufacturerToDistributor={this.acceptShipFromManufacturerToDistributor} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></AcceptShipmentDistributor></Route>
                  <Route path="/AcceptShipmentRetailer"><AcceptShipmentRetailer listAcceptRetailer={this.state.listAcceptRetailer} acceptShipFromDistributorToRetailer={this.acceptShipFromDistributorToRetailer} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></AcceptShipmentRetailer></Route>
                  <Route path="/PageRetailer"><PageRetailer listAcceptRetailer={this.state.listAcceptRetailer} list={this.state.list} listDistributors={this.state.listDistributors} listRetailers={this.state.listRetailers} listManufacturers={this.state.listManufacturers}></PageRetailer></Route>
                  <Route path="/Authorized"><Authorized CheckLogIn={this.CheckLogIn}></Authorized></Route>
                  <Route path="/" > <Signup createUser={this.createUser} ></Signup></Route>

                </Switch>

              </div>

            </main>

          </div>
        </div>
      </Router>



    );
  }
}

export default App;
