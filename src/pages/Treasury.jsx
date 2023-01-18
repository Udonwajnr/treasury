import React, {useState,useEffect} from 'react';
import { ethers,utils } from 'ethers';
import abi from "../contracts/Treasury.json"

const Treasury = () => {
    
    const contractAddress = '0x02987D707d5443B3e59C64727dc3e3A0DE3B6237';
    const contractABI = abi.abi;
    const [isWalletConnected,setIsWalletConnected] = useState(false)
    const [walletAddress,setWalletAddress] = useState('');
    const [customerBalance,setCustomerBalance] = useState();
    const [inputValue,setInputValue] = useState({withdraw:'', deposit:''});

    const handleInput=(event)=>{
        setInputValue(prevFormData =>({...prevFormData, [event.target.name]:event.target.value}))
    };

    const connectWallet= async ()=>{
        try{
            if(window.ethereum){
                const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
                const account = accounts[0];
                setWalletAddress(account);
                setIsWalletConnected(true)
            }
        }
        catch(error){
            console.log("MetaMask has not been installed")
        }
    }

    const userBalance =async ()=>{
        try{
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const treasuryContract = new ethers.Contract(contractAddress,contractABI,signer);

                let balance = await treasuryContract.userBalance();
                setCustomerBalance(utils.formatEther(balance));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const depositFunds = async (event)=>{
        event.preventDefault()
        try{
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const treasuryContract = new ethers.Contract(contractAddress,contractABI,signer);
                
                const txn = await treasuryContract.deposit({value:ethers.utils.parseEther(inputValue.deposit)});
                console.log("Depositing Money"); 
                
                await txn.wait();
                console.log("Deposited Money done",txn.hash);
            }   
            else{
                console.log("Ethereum object not found")
            }
        }
        catch(error){
            console.log(error)            
        }
    }


   const withdrawFunds =async (event)=>{
        event.preventDefault();
        try{
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const treasuryContract = new ethers.Contract(contractAddress,contractABI,signer);
                
                let myAddress = await signer.getAddress();
                console.log("provider signer...", myAddress)
                const txn = await treasuryContract.withdraw(myAddress, ethers.utils.parseEther(inputValue.withdraw));
                console.log("Money WIthdrawing done")
                await txn.wait();
                console.log("Money withdrew.... done");                
            }
            else{
                console.log("ethereum object not found");
            }

        }catch(error){
            console.log(error)
            
        }
    }

    useEffect(()=>{
        connectWallet();
        withdrawFunds();
        depositFunds()
        userBalance();
    },[])
 return (
    <main className='text-blue '>
        <div className='w-10/12 m-auto p-5 mt-5 shadow-2xl border'>
            <div className='text-lg md:text-sm'>
                <h2>User balance in Treasury:{isWalletConnected? customerBalance:0.00} eth</h2>
            </div>
            <div className='text-lg md:text-sm'>
                <p className='break-normal'>User Address <span className='break-words'>
                    {walletAddress}
                    </span>
                    </p>
            </div>
            <div className='mt-8'>
                <form action="">
                    <div className='flex flex-col'>
                        <label htmlFor="" className='text-lg'>Deposit</label>
                        <input type="text" onChange={handleInput} value={inputValue.deposit} name='deposit'  placeholder='0.0' className='focus:outline-none h-10'/>
                        <button onClick={depositFunds} className='bg-[#fcb900] text-lg'>Deposit</button>
                    </div>
                </form>

                <form action="">
                    <div className='flex flex-col mt-3'>
                        <label htmlFor="" className='text-lg'>Withdraw</label>
                        <input type="text" onChange={handleInput} value={inputValue.withdraw} name="withdraw" placeholder='0.0' className='focus:outline-none h-10'/>
                        <button onClick={withdrawFunds} className=' bg-[#fcb900] text-lg'>Withdraw</button>
                    </div>
                </form>
            </div>

            <div className='mt-10 '>
                {
                    isWalletConnected?
                    <button className='bg-[#fcb900] p-5 rounded-lg' onClick={connectWallet}>Connected</button>
                        :
                    <button className='bg-[#fcb900] p-5 rounded-lg' onClick={connectWallet}>Connect Wallet</button>

                }
            </div>
        </div>
        {/* table for the user that deposited and redrew */}
    </main>
  )
}

export default Treasury