
const StringUtils = artifacts.require("StringUtils");
const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function(deployer) {

  await deployer.deploy(StringUtils);
  const stringUtils = await StringUtils.deployed()

  await deployer.link(StringUtils,SupplyChain);
  await deployer.deploy(SupplyChain);
  const supplyChain = await SupplyChain.deployed()
  

};
