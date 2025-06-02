import { createContext, useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/rec.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [acc, setAcc] = useState("Not connected");
  const [memos, setMemos] = useState([]);

  const connectWallet = async () => {
    try {
      const contractABI = abi.abi;
      const contractAddress = "0x1271342eB62e38D320F10fCD7cB6939A0D18EdDa"; 
      
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        setAcc(account[0]);
        setState({ provider, signer, contract });

        await loadMemos(contract);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMemos = async (contract) => {
    try {
      const memoData = await contract.getMemos();
      setMemos(memoData);
    } catch (error) {
      console.error("Error loading memos:", error);
    }
  };

  const refreshMemos = async () => {
    if (state.contract) {
      await loadMemos(state.contract);
    }
  };

  return (
    <DataContext.Provider value={{ 
      state, 
      acc, 
      connectWallet, 
      memos, 
      setMemos, 
      refreshMemos,
      loadMemos 
    }}>
      {children}
    </DataContext.Provider>
  );
};