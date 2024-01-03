const HDWalletProvider = require("@truffle/hdwallet-provider");

const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");
//updated web3 and hdwallet-provider imports added for convenience

const provider = new HDWalletProvider(
  "tip thank ring innocent term stereo stove portion travel interest together pelican",
  "https://sepolia.infura.io/v3/fb895176ee4448608469870813008ebc"
);

const web3 = new Web3(provider);
// deploy code will go here

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("attemp deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop();
};
deploy();
