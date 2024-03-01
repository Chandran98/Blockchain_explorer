const { ethers } = require("ethers");
const { Web3 } = require("web3");
const express = require("express");
const Moralis = require("moralis").default;
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/address", async (req, res) => {
  try {
    const { address } = req.body;
    console.log(req.body);
    console.log("fdsfa");
    const provider = new ethers.providers.JsonRpcProvider(
      "http://54.242.245.176/"
    );
    console.log(provider);
    const transaction = await provider.getTransaction(address);

    console.log(`dafdsfa ${transaction}`);
    // "0x8c12addbfcdf9f2b97c3fca5fee2d79a0af9e25fef5040f709a08790fab820f7"
    const timestamp = (await provider.getBlock(143747)).timestamp;
    console.log(`dafdsfa ${transaction.timestamp}`);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/block", async (req, res) => {
  try {
    const { address } = req.body;
    console.log(req.body);
    const provider = new ethers.JsonRpcProvider("http://54.242.245.176/");

    const transaction = await provider.getTransaction(address);
    // "0x8c12addbfcdf9f2b97c3fca5fee2d79a0af9e25fef5040f709a08790fab820f7"
    const timestamp = (await provider.getBlock(143747)).timestamp;
    console.log(timestamp);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/time", (req, res) => {
  async function getTransactionTimestamp(transactionHash, providerUrl) {
    const provider = new ethers.JsonRpcProvider(providerUrl); // Provider URL e.g., Infura or your local node
    const transactionReceipt = await provider.getTransactionReceipt(
      transactionHash
    );

    if (transactionReceipt) {
      const block = await provider.getBlock(transactionReceipt.blockHash);
      const timestamp = block.timestamp;
      return timestamp;
    } else {
      throw new Error("Transaction receipt not found.");
    }
  }

  // Example usage:
  const transactionHash = "0xTransactionHash"; // Replace with your transaction hash
  const providerUrl = "https://mainnet.infura.io/v3/YourInfuraProjectID"; // Replace with your provider URL

  getTransactionTimestamp(
    "0x8032f40520d6dc2311cd27aebaf4bdf45c4d4a0299260fde9cbf4f36520e92fb",
    "http://54.242.245.176/"
  )
    .then((timestamp) => {
      console.log("Timestamp:", new Date(timestamp * 1000).toISOString());
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
