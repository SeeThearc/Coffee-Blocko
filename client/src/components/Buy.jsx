import { useContext, useState } from "react";
import { DataContext } from "../context/Context";
import { ethers } from "ethers";

const Buy = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const con = useContext(DataContext);
    const contract = con.state.contract;
    
    const buyItem = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            console.log(name, message, contract);
            const amount = { value: ethers.parseEther("0.001") };
            const transaction = await contract.buy(name, message, amount);
            
            console.log("Transaction submitted, waiting for confirmation...");
            await transaction.wait();
            console.log("Transaction confirmed!");
            
            setName("");
            setMessage("");
            
            await con.refreshMemos();
            
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="order-section">
            <h2>Place Your Order</h2>
            <div className="coffee-price">
                ☕ Premium Coffee - 0.001 ETH
            </div>
            <form className="order-form" onSubmit={buyItem}>
                <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                        required 
                        type="text" 
                        id="name" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Leave a Message</label>
                    <input 
                        required 
                        type="text" 
                        id="message" 
                        placeholder="Share your coffee thoughts..." 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button 
                    type="submit" 
                    className="pay-btn" 
                    disabled={!contract || isLoading}
                >
                    {isLoading ? "Processing Payment..." : 
                     !contract ? "Connect Wallet First" : 
                     "☕ Buy Coffee & Share"}
                </button>
            </form>
        </div>
    )
}
export default Buy;