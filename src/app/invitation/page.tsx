"use client";
import { Button, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { web3Consts } from '../../anchor/web3Consts';
import { Connectivity as UserConn } from "../../anchor/user";
import axios from 'axios';
import { Connectivity as AdConn } from "../../anchor/admin";
import { v4 as uuidv4 } from 'uuid';
import bs58 from "bs58";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair} from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ForgeContext } from "../context/ForgeContext";

export default function Invitation() {
  const forgeContext = React.useContext(ForgeContext);
  const [solBalance, setSolBalance] = useState(0);
  const [tokBalance, setTokBalance] = useState(0);
  const [actBalance, setActBalance] = useState(0);
  const [quota, setQuota] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [name,setName] = useState("")
  const [buttonText,setButtonText] = useState("Mint")
  const [msgClass, setMsgClass] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [isGensis, setIsGensis] = useState(false);
  const connection = useConnection();
  const wallet:any = useAnchorWallet();
  const [inputValue, setInputValue] = useState(0);
  const [currentGeneration,setCurrentGeneration] = useState<any>("0");

  useEffect(()=>{
     if(wallet?.publicKey) {
         setIsGensis(wallet.publicKey.toBase58() == web3Consts.rootProfile.toBase58())
         const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
         anchor.setProvider(env);
         setName(forgeContext.userData.name);
         getProfileInfo()
      }
  },[wallet?.publicKey])

  useEffect(()=>{
    setInputValue(quota-actBalance);
  },[quota, actBalance])

  const getProfileInfo = async () => {
    const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
    let userConn:UserConn = new UserConn(env, web3Consts.programID);

    const profileInfo = await userConn.getUserInfo(forgeContext.userData.profile);
    setProfileName(profileInfo.profiles[0].name)
    setSolBalance(profileInfo.solBalance);
    setTokBalance(profileInfo.oposTokenBalance);
    setActBalance(profileInfo.activationTokenBalance)
    setCurrentGeneration(profileInfo.generation)
    const totalMints = forgeContext.userData.mints ? parseInt(forgeContext.userData.mints) : 0;
    const totalChilds = totalMints - profileInfo.activationTokenBalance;
    if(totalChilds < 3 ) {
      setQuota(10)
    } else if(totalChilds >= 3 && totalChilds < 7) {
      setQuota(25)
    } else if(totalChilds >= 7 && totalChilds < 15) {
      setQuota(50)
    } else if(totalChilds >= 15 && totalChilds < 35) {
      setQuota(250)
    } else if(totalChilds >= 35 && totalChilds < 75) {
      setQuota(500)
    } else {
      setQuota(1000)
    }

  }



  const capitalizeString = (str:any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const createSubscriptionInvitation = async() => {
    const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
    anchor.setProvider(env);
    let userConn:UserConn = new UserConn(env, web3Consts.programID);
    let totalMints = forgeContext.userData.mints ? parseInt(forgeContext.userData.mints) : 0;

    let isSuccess = false;
    if(totalMints === 0) {
      const body = {
        name: name != "" ? "Invitation from "+ name : "Invitation",
        symbol:  "INVITE",
        description: "Cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.",
        image: "https://shdw-drive.genesysgo.net/FuBjTTmQuqM7pGR2gFsaiBxDmdj8ExP5fzNwnZyE2PgC/invite.png",
        external_url: process.env.REACT_APP_MAIN_URL,
        minter:name
      };
      const shdwHash:any = await pinFileToShadowDrive(body);

      if(shdwHash === "") {
        createMessage("We’re sorry, there was an error while trying to prepare meta url. please try again later.","danger-container")
        return
      }

      const symbol = "INVITE"
      const uri = shdwHash
      const res:any = await userConn.initSubscriptionBadge({ name:"Invitation", symbol, uri, amount:inputValue,profile: forgeContext.userData.profile })
      console.log("res ", res);
      if(res.Ok) {
        isSuccess = true
      } 
    } else {
      const res = await userConn.initSubscriptionBadge({ name:"Invitation", amount:inputValue,profile: forgeContext.userData.profile })
      const res1 = await userConn.mintSubscriptionToken({amount: inputValue,subscriptionToken: res.Ok.info.subscriptionToken});
      if(res1.Ok) {
        isSuccess = true
      } 
    }
    if(isSuccess) {
      totalMints = totalMints + parseInt(inputValue.toString());
      let params:any = {
        username: forgeContext.userData.username,
        bio: forgeContext.userData.bio,
        pronouns: forgeContext.userData.pronouns,
        name: forgeContext.userData.name,
        image: forgeContext.userData.image,
        descriptor: forgeContext.userData.descriptor,
        nouns: forgeContext.userData.nouns,
        profile:forgeContext.userData.profile,
        mints:totalMints.toString()
      }
      updateUserData(params)
      let userData = forgeContext.userData;
      userData.mints = totalMints.toString();
      forgeContext.setUserData(userData);
      createMessage("Congrats! You have minted your Invitation(s) successfully.","success-container")
    } else {
      createMessage("We’re sorry, there was an error while trying to mint your Invitation Badge(s). Check your wallet and try again.","danger-container")
    }

    setButtonText("Mint")
    getProfileInfo();
  }

  const createGensisInvitation = async() => {
      const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
      anchor.setProvider(env);
      let userConn:AdConn = new AdConn(env, web3Consts.programID);
      let totalMints = forgeContext.userData.mints ? parseInt(forgeContext.userData.mints) : 0;

      let isSuccess = false;
      if(totalMints === 0) {
        const body = {
          name: name != "" ? "Invitation from "+ name : "Invitation",
          symbol:  "INVITE",
          description: "Cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.",
          image: "https://shdw-drive.genesysgo.net/FuBjTTmQuqM7pGR2gFsaiBxDmdj8ExP5fzNwnZyE2PgC/invite.png",
          external_url: process.env.REACT_APP_MAIN_URL,
          minter:name
        };
        const shdwHash:any = await pinFileToShadowDrive(body);

        if(shdwHash === "") {
          createMessage("We’re sorry, there was an error while trying to prepare meta url. please try again later.","danger-container")
          return
        }

        const symbol = "INVITE"
        const uri = shdwHash
        const res:any = await userConn.initActivationToken({ name:"Invitation", symbol, uri, amount:inputValue })
        console.log("res ", res);
        if(res.Ok) {
          isSuccess = true
        } 
      } else {
        const res1 = await userConn.mintActivationToken(inputValue, wallet.publicKey);
        if(res1.Ok) {
          isSuccess = true
        } 
      }
      if(isSuccess) {
        totalMints = totalMints + inputValue;
        let params:any = {
          username: forgeContext.userData.username,
          bio: forgeContext.userData.bio,
          pronouns: forgeContext.userData.pronouns,
          name: forgeContext.userData.name,
          image: forgeContext.userData.image,
          descriptor: forgeContext.userData.descriptor,
          nouns: forgeContext.userData.nouns,
          profile:web3Consts.genesisProfile.toBase58(),
          mints:totalMints.toString()
        }
        updateUserData(params)
        let userData = forgeContext.userData;
        userData.mints = totalMints.toString();
        forgeContext.setUserData(userData);
        createMessage("Congrats! You have minted your Invitation(s) successfully.","success-container")
      } else {
        createMessage("We’re sorry, there was an error while trying to mint your Invitation Badge(s). Check your wallet and try again.","danger-container")
      }

      setButtonText("Mint")
      getProfileInfo();
      
       
    
  }

  const updateUserData = async(params:any) => {
    await axios.put('/api/update-wallet-data', {field: "profile", value: params, wallet: wallet.publicKey});
  }

  const calcNonDecimalValue = (value: number, decimals: number) => {
    return Math.trunc(value * (Math.pow(10, decimals)))
   }

  const transferAction = async () => {
    const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
    anchor.setProvider(env);
    let userConn:AdConn = new AdConn(env, web3Consts.programID);
    // let userConn:UserConn = new UserConn(env, web3Consts.programID);
    const symbol = "INVITE"
    const uri = '';
    const res:any = await userConn.initActivationToken({ name:"Invitation from "+name, symbol, uri, amount:inputValue })
    // const res:any = await userConn.initSubscriptionBadge({ name:"Invitation from "+name, symbol, uri, amount:inputValue,profile: forgeContext.userData.profile})
    
    // transfer activation token
    await userConn.baseSpl.transfer_token({ mint: new anchor.web3.PublicKey(res.Ok.info.activationToken), sender: wallet.publicKey, receiver: new anchor.web3.PublicKey("EMmc2SSJJC7NJRMjrpsBYJnA6t8PFCmo1GAo2AQgmKEm"), init_if_needed: true }, userConn.ixCallBack)
    const tx = await new anchor.web3.Transaction().add(...userConn.txis)
    userConn.txis = []
    const res2 = await userConn.provider.sendAndConfirm(tx)
    console.log("res2 ", res2);

    // transfer mmosh token
    await userConn.baseSpl.transfer_token({ mint: web3Consts.oposToken, sender: wallet.publicKey, receiver: new anchor.web3.PublicKey("EMmc2SSJJC7NJRMjrpsBYJnA6t8PFCmo1GAo2AQgmKEm"), init_if_needed: true, amount:calcNonDecimalValue(20000,6)}, userConn.ixCallBack)
    const tx1 = await new anchor.web3.Transaction().add(...userConn.txis)
    userConn.txis = []
    const res3 = await userConn.provider.sendAndConfirm(tx1)
    console.log("res3 ", res3);
  }

  const mintInvitationAction = () => {
    if(solBalance == 0) {
      createMessage("Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!","warning-container");
      return;
    }

    if(tokBalance == 0) {
      createMessage("Hey! We checked your wallet and you don’t have enough MMOSH to mint. Get some MMOSH here and try again!","warning-container");
      return
    } 
    if(quota<=actBalance) {
       createMessage("Hey! We checked your quote reached maximum count, try again later!","warning-container");
       return
    }

    if(inputValue > (quota - actBalance)) {
      createMessage("Hey! We checked your quote reached maximum count, try again later!","warning-container");
      return
    }
    setButtonText("Minting...")
    if(wallet.publicKey.toBase58() == "85YaBFhbwuqPiRVNrXdMJwdt1qjdxbtypGcFBc6Tp7qA") {
       createGensisInvitation();
    } else {
      createSubscriptionInvitation()
    }
    
  }

  const createMessage = (message: any, type:any) => {
      setMsgText(message);
      setMsgClass(type);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 4000);
  }

  const onAmountChange = (event:any) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  }


const pinFileToShadowDrive = async (jsonData:any) => {
  try {
    const privateKey:any = process.env.NEXT_PUBLIC_SHDW_PRIVATE;
    let private_buffer = bs58.decode(privateKey);
    let private_arrray = new Uint8Array(private_buffer.buffer, private_buffer.byteOffset, private_buffer.byteLength / 
    Uint8Array.BYTES_PER_ELEMENT);
    const keypair = Keypair.fromSecretKey(private_arrray);
    const drive = await new ShdwDrive(
      new Connection("https://api.metaplex.solana.com"),
      new NodeWallet(keypair)
    ).init();

    const accounts = await drive.getStorageAccounts();
    const acc = accounts[0].publicKey;
    const getStorageAccount = await drive.getStorageAccount(
        acc
    );

    const blobData = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    const fileName = uuidv4()+'.json';
    const file = new File([blobData], fileName, { type: 'application/json' });

    const upload = await drive.uploadFile(acc, file);
    console.log(upload);
    return upload.finalized_locations[0]
  } catch (error) {
    console.log("error", error)
    return ""
  }
}


  return (
    <div className="invitation-page">
      {showMsg &&
         <div className={"message-container " + msgClass}>
              {msgText}
         </div>
      }
      {name === "" &&
         <h2>Welcome to the Forge</h2>
      }

      {name !== "" &&
        <h2>Welcome to the Forge, {capitalizeString(name)}!</h2>
      }
  

        <div className="invitation-page-inner">
            <div className="invitation-page-inner-image">
              <img src="/images/invite.png" />
            </div>
            <div className="invitation-page-inner-content">
              { name != "" && 
                 <h3>Invitation from {capitalizeString(name)}</h3>
              }

              { name == "" && 
                 <h3>Invitation</h3>
              }

              { name != "" && 
                <p>{capitalizeString(name)} cordially invites you to join him on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.</p>
              }

              { name == "" && 
                  <p>Cordially invites you to join him on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.</p>
              }
        

              <div className="invitation-content-container">
                <div className="invitation-content-left">
                    <p>
                      <label>Minted:</label>
                      <span>{actBalance}</span>
                    </p>
                    <p>
                      <label>Quota:</label>
                      <span>{quota}</span>
                    </p>
                    <p>
                      <label>Unit Cost:</label>
                      <span>1 $MMOSH</span>
                    </p>
                </div>
                <div className="invitation-content-right">
                  <div className="invitation-content-qty">
                     <label>Amount: </label>
                     <Form.Control type="number" placeholder="0" value={inputValue} onChange={onAmountChange} />
                  </div>
                  {inputValue > 0 &&
                    <p>Price: {inputValue} $MMOSH</p>
                  }

                  {inputValue == 0 &&
                    <p>Price: 0 $MMOSH</p>
                  }
       
                  <p className="small">Plus a small SOL transaction fee</p>
                  <p>Current Balance: {tokBalance} MMOSH</p>
                  <p>Current Balance: {solBalance} SOL</p>
                </div>
              </div>
              <div className="invitation-action-container">
                {parseInt(currentGeneration) < 4 &&
                  <Button variant="primary" size='sm' onClick={mintInvitationAction}>{buttonText}</Button>
                }
                 <Button variant="primary" size='sm' onClick={transferAction}>Tranfer</Button>
              </div>
             
            </div>
        </div>
      

    </div>
  );
}
