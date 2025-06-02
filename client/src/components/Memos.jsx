import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Context";

const Memos = () => {
    const con = useContext(DataContext);
    const contract = con.state.contract;
    const memos = con.memos;
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const initializeMemos = async () => {
            if (contract) {
                setLoading(true);
                await con.loadMemos(contract);
                setLoading(false);
            }
        };
        
        initializeMemos();
    }, [contract]);
    
    const formatTimestamp = (timestamp) => {
        const timestampNum = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
        const date = new Date(timestampNum * 1000);
        
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    
    return (
        <div className="memos-section">
            <h2>Coffee Community</h2>
            <div className="memos-container">
                {loading ? (
                    <div className="no-memos loading">
                        Loading coffee messages...
                    </div>
                ) : memos.length === 0 ? (
                    <div className="no-memos">
                        No coffee orders yet. Be the first to buy! ☕
                    </div>
                ) : (
                    memos.map((memo, index) => {
                        return (
                            <div key={memo.timestamp || index} className="memo-card">
                                <div className="memo-header">
                                    <div className="memo-name">☕ {memo.name}</div>
                                    <div className="memo-time">{formatTimestamp(memo.timestamp)}</div>
                                </div>
                                <div className="memo-message">"{memo.message}"</div>
                                <div className="memo-address">
                                    From: {memo.from?.slice(0, 6)}...{memo.from?.slice(-4)}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
export default Memos;
