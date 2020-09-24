pragma solidity ^0.5.16;
 pragma experimental ABIEncoderV2;
import "./StringUtils.sol";


contract SupplyChain {
    
    struct User{
        uint userId;
        string email;
        address currentAddress;
        string name;
        string typeUser;
    
    }
    
    mapping (uint => User) usersData;
    uint indexUser = 0;
 
    
   
    
       
    function addUser(string memory _email, string memory _name, string memory _typeUser) public {
      
        require(checkAddressIsRegistered(msg.sender) == false);
        User memory addUser = User({userId: indexUser, email: _email,currentAddress:msg.sender, name: _name, typeUser: _typeUser});
        usersData[indexUser]=addUser;
        indexUser++;
        
    }
    
  function howManyUsers() public view returns (uint){
        return indexUser;
    }
    

      
function getUserByIndex(uint _userId) public view returns (string memory,address, string memory, string memory) {

    return (usersData[_userId].email,usersData[_userId].currentAddress, usersData[_userId].name, usersData[_userId].typeUser) ;
 
}


function getNameByAddress(address _address) public view returns (string memory) {
for (uint256 j=0; j<indexUser; j++){
        if ((usersData[j].currentAddress) == (_address))   
            {
            
                return ( usersData[j].name) ;
            }
           
        }
    
 
}

uint currentIndexOfUser;

function checkAddressIsRegistered(address _address) public returns (bool) {

    for (uint256 j=0; j<indexUser; j++){
        if ((usersData[j].currentAddress) == (_address))   
            {
                currentIndexOfUser = j;
                return true;
            }
           
        }
}

function logIn(string memory _email) public returns (bool , string memory,string memory,string memory) {
 
  
    for (uint256 j=0; j<indexUser; j++){

        if (StringUtils.equal(usersData[j].email, _email))   
        {
          
            return (true,usersData[j].email, usersData[j].typeUser,usersData[j].name);
          
        }
        
            
        }
    
}



 struct Product{
        uint256 productId;
        address owner;
        string productName;
        string material;
        string description;
        uint quantity;
        string weight;

       
    }
    
    mapping (uint => Product) allProducts;
    uint indexProduct = 0;


    function addProduct(uint _productId,string memory _productName, string memory _material, string memory _description,  uint _quantity, string memory _weight) public  {
        require((checkAddressIsRegistered(msg.sender) == true),"Adress is not registered");
        require ((StringUtils.equal(usersData[currentIndexOfUser].typeUser, "Manufacturer")), "This account is not manufacturer");
        require(!(checkProductIdExist(_productId)), "product id already exists");
        Product memory addProduct = Product({productId: _productId,owner: msg.sender, productName: _productName,  material: _material,
            description: _description, quantity: _quantity, weight: _weight
        });
        allProducts[indexProduct]=addProduct;
        strTrack memory addProductforTracking = strTrack({status: "",manufacturerAddress:msg.sender, timestampOfCreatingProduct: now, 
        timestampWhenProductWasShipped:0, distributorAddress: 0x0000000000000000000000000000000000000000,timestampWhenDistributorAccepted:0,
            timestampWhenDistributorShippedToRetailer:0, retailerAddress: 0x0000000000000000000000000000000000000000, timestampRetailerAccepted:0
        });
        mapTrack[_productId]=addProductforTracking;
        mapTrack[_productId].status = "Product Created";
        indexProduct++;
       
    }
    
      function howManyProducts() public view returns (uint){
        return indexProduct;
        
    }
    
    
function getProductByIndex(uint _index) public view returns ( uint,address, string memory, string memory,string memory,uint, string memory) {
 
    return (allProducts[_index].productId,allProducts[_index].owner,allProducts[_index].productName, allProducts[_index].material,
    allProducts[_index].description,allProducts[_index].quantity,allProducts[_index].weight) ;
 
}



 struct strToDistributor{
        uint productId;
        uint256 consNumber;
        string distributorEmail;
        string productName;
        string distributorName;
        string transporterName;
        uint vehRegNumber;
     

    }
    
    mapping (uint => strToDistributor) mapToDistributor;
    uint indexToDistributor = 0;
    uint index = 0;
 
    function addShipmentToDistributor(uint _productId,uint _consNumber,string memory _distributorEmail, string memory _productName,  string memory _distributorName,string memory _transporterName, uint _vehRegNumber) public  {
        require((checkAddressIsRegistered(msg.sender) == true),"Address is not registered");
        require ((StringUtils.equal(usersData[currentIndexOfUser].typeUser, "Manufacturer")), "This account is not manufacturer");
       // require((checkProductIdExist(_productId)), "product id does not exist");
        require((checkEmailExist(_distributorEmail)), "Distributor did not register in our system");
        strToDistributor memory addShipmentToDistributor = strToDistributor({productId: _productId,consNumber: _consNumber , distributorEmail: _distributorEmail,productName: _productName, 
            distributorName: _distributorName, transporterName: _transporterName, vehRegNumber: _vehRegNumber
        });
        mapToDistributor[indexToDistributor]=addShipmentToDistributor;
        mapTrack[_productId].timestampWhenProductWasShipped = now;
        mapTrack[_productId].status = "Shipped to Distributor";
        mapTrack[_productId].distributorAddress = currentAddress;
        changeOwnerOfProduct(_productId, currentAddress);
        indexToDistributor++;
        index+=2;

        
       
    }
    

    
   
    
    function getShipmentToDistributorByIndex(uint _index) public view returns ( uint,uint,string memory, string memory, string memory,string memory,uint) {
 
    return (mapToDistributor[_index].productId,mapToDistributor[_index].consNumber,mapToDistributor[_index].distributorEmail, mapToDistributor[_index].productName, 
    mapToDistributor[_index].distributorName, mapToDistributor[_index].transporterName, mapToDistributor[_index].vehRegNumber) ;
 
}


function checkProductIdExist(uint _productId) public returns (bool) {

    for (uint256 j=0; j<indexProduct; j++){
        if ((allProducts[j].productId) == (_productId))   
            {
                
                return true;
            }
           
        }
}


address currentAddress;
function checkEmailExist(string memory _Email) public returns (bool) {

    for (uint256 j=0; j<indexUser; j++){
        if (StringUtils.equal(usersData[j].email, _Email))   
            {
                currentAddress = usersData[j].currentAddress;
                return true;
            }
           
        }
}


function changeOwnerOfProduct(uint _productId, address _address) public returns (bool) { 

    for (uint256 j=0; j<indexProduct; j++){
        if ((allProducts[j].productId) == (_productId))   
            {
                allProducts[j].owner = _address;
                return true;
            }
           
        }
}

 struct strTrack{
        string status;
        address manufacturerAddress;
        uint timestampOfCreatingProduct;
        uint timestampWhenProductWasShipped;
        address distributorAddress;
        uint timestampWhenDistributorAccepted;
        uint timestampWhenDistributorShippedToRetailer;
        address retailerAddress;
        uint timestampRetailerAccepted;

    }
  mapping (uint => strTrack) public mapTrack;
  
 
   string var1;
   uint var2;
   uint var3;
   uint var4;
   uint var5;
   uint var6;
address addressManufacturer;
address addressDistributor;
address addressRetailer;
   
  function trackByProductId(uint _productIdentity) public  returns (string memory, string memory,address, uint, uint,string memory, address, uint, uint,string memory ,address,uint) {
    addressManufacturer = mapTrack[_productIdentity].manufacturerAddress;
    addressDistributor = mapTrack[_productIdentity].distributorAddress;
    addressRetailer = mapTrack[_productIdentity].retailerAddress;
    
     var1 = mapTrack[_productIdentity].status;
     var2 = mapTrack[_productIdentity].timestampOfCreatingProduct;
     var3 = mapTrack[_productIdentity].timestampWhenProductWasShipped;
     var4 = mapTrack[_productIdentity].timestampWhenDistributorAccepted;
     var5 = mapTrack[_productIdentity].timestampWhenDistributorShippedToRetailer;
     var6 = mapTrack[_productIdentity].timestampRetailerAccepted;
    return (var1,getNameByAddress(addressManufacturer),addressManufacturer,var2, var3,getNameByAddress(addressDistributor),addressDistributor, var4,var5, 
    getNameByAddress(addressRetailer),addressRetailer, var6);
 
}





//Distributor part

function acceptShippmentDistributor(uint _productIdentity) public returns(bool) {
    
   for (uint256 j=0; j<indexProduct; j++){
        if ((allProducts[j].productId) == (_productIdentity))   
            {
                if ((allProducts[j].owner) == (msg.sender)){
                    mapTrack[_productIdentity].status = "Accepted by Distributor";
                    mapTrack[_productIdentity].timestampWhenDistributorAccepted = now;
                    return true;
                }
                
            }
           
        }
 
}

function listToAccept(uint _productIdentity) public returns(string memory) {
    
    
    if (StringUtils.equal(mapTrack[_productIdentity].status, "Shipped to Distributor" ))   
            {
                
           // if(mapTrack[_productIdentity].distributorAddress == msg.sender){
                return mapTrack[_productIdentity].status;
           // }
            }
            
     else if(StringUtils.equal(mapTrack[_productIdentity].status, "Shipped to Retailer" ))
    {
       // if(mapTrack[_productIdentity].retailerAddress== msg.sender){
        return mapTrack[_productIdentity].status;
      //  }
    }


}

struct strToRetailer{
        uint productId;
        uint256 consNumber;
        string retailerEmail;
        string productName;
        string retailerName;
        string transporterName;
        uint vehRegNumber;
     

    }
    
    mapping (uint => strToRetailer) mapToRetailer;
    uint indexToRetailer = 0;

function addShipmentToRetailer(uint _productId,uint _consNumber,string memory _retailerEmail, string memory _productName,  string memory _retailerName,string memory _transporterName, uint _vehRegNumber) public  {
        require((checkAddressIsRegistered(msg.sender) == true),"Address is not registered");
        require ((StringUtils.equal(usersData[currentIndexOfUser].typeUser, "Distributor")), "This account is not distributor");
      //  require((checkProductIdExist(_productId)), "product id does not exist");
        require((checkEmailExist(_retailerEmail)), "Retailer did not register in our system");
        strToRetailer memory addShipmentToRetailer = strToRetailer({productId: _productId,consNumber: _consNumber , retailerEmail: _retailerEmail,productName: _productName, 
            retailerName: _retailerName, transporterName: _transporterName, vehRegNumber: _vehRegNumber
        });
        mapToRetailer[indexToRetailer]=addShipmentToRetailer;
        mapTrack[_productId].timestampWhenDistributorShippedToRetailer = now;
        mapTrack[_productId].status = "Shipped to Retailer";
        mapTrack[_productId].retailerAddress = currentAddress;
        changeOwnerOfProduct(_productId, currentAddress);
        indexToRetailer++;
 
        
       
    }
    
    
    //Retailer part

function acceptShippmentRetailer(uint _productIdentity) public returns(bool) {
    
   for (uint256 j=0; j<indexProduct; j++){
        if ((allProducts[j].productId) == (_productIdentity))   
            {
                if ((allProducts[j].owner) == (msg.sender)){
                    mapTrack[_productIdentity].status = "Accepted by Retailer";
                    mapTrack[_productIdentity].timestampRetailerAccepted = now;
                    return true;
                }
                
            }
           
        }
 
}


       
}