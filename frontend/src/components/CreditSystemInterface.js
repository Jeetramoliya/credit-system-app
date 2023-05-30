import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0x6E023de613138F88ccdA43518EE56B7eeABd5470'; // Replace with the actual contract address
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferCredits",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

function CreditSystemInterface() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    // Connect to Metamask wallet
    async function connectWallet() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const accounts = await signer.getAddress();
          setProvider(provider);
          setContract(new ethers.Contract(contractAddress, abi, signer));
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        console.error('No Ethereum provider found. Please install Metamask.');
      }
    }

    connectWallet();
  }, []);

  useEffect(() => {
    // Fetch user's credit balance
    async function fetchBalance() {
      if (contract && account) {
        try {
          const userBalance = await contract.getBalance(account);
          setBalance(userBalance.toNumber());
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }

    fetchBalance();
  }, [contract, account]);

  async function transferCredits() {
    try {
      const tx = await contract.transferCredits(recipient, amount);
      await tx.wait();
      setTransactionHash(tx.hash);
      setRecipient('');
      setAmount(0);
    } catch (error) {
      console.error('Error transferring credits:', error);
    }
  }

  async function mintCredits() {
    try {
      const tx = await contract.mint(account, amount);
      await tx.wait();
      setTransactionHash(tx.hash);
      setAmount(0);
    } catch (error) {
      console.error('Error minting credits:', error);
    }
  }

  return (
    <div>
      <h1>Credit System</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance} credits</p>
      <hr />
      <h2>Transfer Credits</h2>
      <label>
        Recipient:
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={transferCredits}>Transfer</button>
      <hr />
      <h2>Mint Credits</h2>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={mintCredits}>Mint</button>
      <hr />
      {transactionHash && (
        <div>
          <p>Transaction Hash: {transactionHash}</p>
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
}

export default CreditSystemInterface;
