const hre = require("hardhat");

async function main(){
    const rec = await hre.ethers.getContractFactory("rec");
    const contract = await rec.deploy();
    await contract.waitForDeployment();
    console.log("Transaction address: ", contract.target);
}

async function runmain(){
    try{
        await main();
        process.exit(0);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

runmain();