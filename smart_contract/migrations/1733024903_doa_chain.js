const DoaChain = artifacts.require("DoaChain");

module.exports = function(_deployer) {
  _deployer.deploy(DoaChain);
};
