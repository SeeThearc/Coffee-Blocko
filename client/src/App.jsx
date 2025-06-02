import { ethers} from "ethers";
import abi from "./contract/rec.json"
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./context/Context";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

export default function App(){
  const con = useContext(DataContext);
  const contract = con.state.contract;
  console.log(con.state);
  
  return(
    <div className="app-container">
      <div className="header">
        <h1>☕ Café Blocko</h1>
        <p>Premium Coffee • Crypto Payments • Community Messages</p>
      </div>
      
      <div className="wallet-section">
        <button className="connect-btn" onClick={con.connectWallet}>
          Connect Wallet
        </button>
        <div className={`wallet-status ${contract ? 'wallet-connected' : 'wallet-disconnected'}`}>
          {!contract ? 
            "🔒 Please Connect Your Wallet to Continue" : 
            `✅ Connected: ${con.acc?.slice(0, 6)}...${con.acc?.slice(-4)}`
          }
        </div>
      </div>

      <div className="main-content">
        <Buy />
        <Memos />
      </div>
    </div>
  )
}