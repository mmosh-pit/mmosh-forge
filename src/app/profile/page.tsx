"use client";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { IDL, Sop } from '../../anchor/sop';
import { PublicKey } from '@solana/web3.js';
import { web3Consts } from '../../anchor/web3Consts';
import { Connectivity as AdConn } from "../../anchor/admin";
import { Connectivity as UserConn } from "../../anchor/user";
import {useDropzone} from 'react-dropzone';
import { useRouter, useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import bs58 from "bs58";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair} from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import axios from 'axios';
import { ForgeContext } from '../context/ForgeContext';

export default function Profile() {
   const query = useSearchParams()
   const forgeContext = React.useContext(ForgeContext);
   const navigate = useRouter()
   const [solBalance, setSolBalance] = useState(0)
   const [tokBalance, setTokBalance] = useState(0)
   const connection = useConnection();
   const wallet:any= useAnchorWallet();
   const [msgClass, setMsgClass] = useState("");
   const [showMsg, setShowMsg] = useState(false);
   const [msgText, setMsgText] = useState("");
   const [isSubmit, setIsSubmit] = useState(false);
   const [imageFile, setImageFile] = useState<any>([]);
   const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      maxFiles:1,
      onDrop: acceptedFiles => {
        setImageFile(acceptedFiles.map(file => Object.assign(imageFile, {
         preview: URL.createObjectURL(file),
         file: file
        })));
      }
    });
   const [userId, setUserId] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [userName, setUserName] = useState("");
   const [gender, setGender] = useState("he/him");
   const [desc, setDesc] = useState("");
   const [descriptor, setDescriptor] = useState("");
   const [nouns, setNouns] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [gensis,setGensis] = useState("")
   const [subToken,setSubToken] = useState("")

  useEffect(()=>{
     if(wallet?.publicKey) {
         const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
         anchor.setProvider(env);
         getProfileInfo()
         fileFormData()
      }
  },[wallet?.publicKey])

const fileFormData = async () => {
   const fullname:any = forgeContext.userData.name.split(" ")
   setUserName(forgeContext.userData.username)
   setDesc(forgeContext.userData.bio)
   setGender(forgeContext.userData.pronouns)
   setFirstName(fullname[0])
   setLastName(fullname[1])
   setImageFile([{
      preview: forgeContext.userData.image,
      file: null
   }])
   setUserId(forgeContext.userData._id);
   setIsLoading(false);
 };

 const updateUserData = async(params:any) => {
   await axios.put('/api/update-wallet-data', {field: "profile", value: params, wallet: wallet.publicKey});
 }

  const createMessage = (message: any, type:any) => {
      window.scrollTo(0, 0)
      setMsgText(message);
      setMsgClass(type);
      setShowMsg(true);
      setTimeout(() => {
      setShowMsg(false);
      }, 4000);
   }

   const validateFields = () => {
      if (subToken == "") {
         createMessage("Invalid activation token","danger-container");
         return false
      }

      if (gensis == "") {
         createMessage("Invalid gensis token","danger-container");
         return false
      }

      if(solBalance == 0) {
         createMessage("Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!","warning-container");
         return false;
       }
   
       if(tokBalance < 20000) {
         createMessage("Hey! We checked your wallet and you don’t have enough MMOSH to mint. Get some MMOSH here and try again!","warning-container");
         return false;
       } 
      if(imageFile.length == 0) {
         createMessage("image file is required","danger-container");
         return false
      }
      if(firstName.length == 0) {
         createMessage("First name is required","danger-container");
         return false
      }
      if(lastName.length == 0) {
         createMessage("Last name is required","danger-container");
         return false
      }
      if(userName.length == 0) {
         createMessage("Username is required","danger-container");
         return false
      }

      return true
   }

   
   

  const createNewProfile = async () => {
    if(!validateFields()) {
      return;
    }
    setIsSubmit(true);
    const genesisProfile = web3Consts.genesisProfile;
    const activationToken = new anchor.web3.PublicKey(subToken);
    const commonLut = web3Consts.commonLut;
    const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
      
   let imageUri = imageFile[0].preview
   if(imageFile[0].file != null) {
      const imageUri = await pinImageToDrive(imageFile[0].file);
      if(imageUri === "") {
        setIsSubmit(false);
        createMessage("We’re sorry, there was an error while trying to uploading image. please try again later.","danger-container")
        return;
      }
   }

   const body = {
      name: firstName + " " + lastName,
      symbol: userName,
      description: desc,
      image: imageUri,
      enternal_url : process.env.REACT_APP_MAIN_URL + "/" + userName,
      family: "MMOSH Pit",
      collection: "Moral Panic",   
      attributes: [
        {
          trait_type: "Primitive",
          value: "Profile"
        },
        {
         trait_type: "MMOSH",
         value: "Moral Panic"
       }
      ]
    };

    const shadowHash:any = await pinFileToShadowDrive(body);
    if(shadowHash === "") {
      setIsSubmit(false);
      createMessage("We’re sorry, there was an error while trying to prepare meta url. please try again later.","danger-container")
      return;
    }
    console.log("tes4")
    try {
      let userConn:UserConn = new UserConn(env, web3Consts.programID);
      const res = await userConn.mintProfileByActivationToken({
         name: forgeContext.userData.name,
         symbol: forgeContext.userData.username.substring(0,5).toUpperCase(),
         uriHash:shadowHash,
         activationToken,
         genesisProfile,
         commonLut,
      })

       if(res.Ok) {
         let params:any = {
            username: userName,
            bio: desc,
            pronouns: gender,
            name: firstName + " " + lastName,
            image: imageUri,
            descriptor: descriptor,
            nouns: descriptor
         }
         const profileResult = await updateUserData(params);
         params.wallet = wallet.publickey;
         params._id = forgeContext.userData._id;
         forgeContext.setUserData(params);
         navigate.push("/invitation")
       } else {
         createMessage("We’re sorry, there was an error while trying to mint your profile. Check your wallet and try again.","danger-container")
       }
       setIsSubmit(false);
    } catch (error) {
       createMessage(error,"danger-container");
       setIsSubmit(false);
    }

 }

 const pinImageToDrive = async (file:any) => {
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
 
     const upload = await drive.uploadFile(acc, file);
     console.log(upload);
     return upload.finalized_locations[0]
   } catch (error) {
     console.log("error", error)
     return ""
   }
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
 


  const calcNonDecimalValue = (value: number, decimals: number) => {
   return Math.trunc(value * (Math.pow(10, decimals)))
  }

  const getProfileInfo = async () => {
      const env = new anchor.AnchorProvider(connection.connection,wallet,{"preflightCommitment":"processed"})
      let userConn:UserConn = new UserConn(env, web3Consts.programID);

      const profileInfo = await userConn.getUserInfo();
      console.log("profileInfo from profile", profileInfo);
      setSolBalance(profileInfo.solBalance);
      setTokBalance(profileInfo.oposTokenBalance);
      if(profileInfo.activationTokens.length>0) {
         setGensis(profileInfo.activationTokens[0].genesis)
         setSubToken(profileInfo.activationTokens[0].activation)
      }
  }

  const closeImageAction = () => {
      setImageFile([]);
  }



  return (
    <div className="profile-page container">
      {showMsg &&
         <div className={"message-container " + msgClass}>
              {msgText}
         </div>
      }
      <h2>Welcome to the Forge, {forgeContext.userData.name}!</h2>
      <h3>About You</h3>
      <div className="profile-container">
         <div className="profile-container-item">
            <div className="profile-container-element">
              <label>Avatar*</label>
              {imageFile.length == 0 &&
                  <div {...getRootProps({className: 'dropzone'})}>
                     <input {...getInputProps()} />
                     <img src="/images/upload.png" />
                  </div>
               }
              {imageFile.length > 0 &&
                <div className='preview-container'>
                  <Button variant="link" onClick={closeImageAction} className='image-close-btn'>Close</Button>
                  <img src={imageFile[0].preview} />
                </div>
              }
            </div>
         </div>
         <div className="profile-container-item">
            <div className="profile-container-element">
               <label>First Name or Alias*</label>
               <Form.Control type="text" placeholder="Enter First Name or Alias" maxLength={50} onChange={(event)=>setFirstName(event.target.value)} value={firstName} />
               <span>Up to 50 characters, can have spaces.</span>
            </div>
            <div className="profile-container-element">
               <label>Last Name</label>
               <Form.Control type="text" placeholder="Enter Last Name" maxLength={15} onChange={(event)=>setLastName(event.target.value)} value={lastName}  />
               <span>15 characters</span>
            </div>
            <div className="profile-container-element">
               <label>Username*</label>
               <Form.Control type="text" placeholder="Enter Username" maxLength={15} onChange={(event)=>setUserName(event.target.value)} value={userName} disabled />
               <span>15 characters</span>
            </div>
            <div className="profile-container-element">
               <label>Pronouns*</label>
               <Form.Select onChange={(event)=>setGender(event.target.value)} value={gender}>
                 <option value="they/them">They/them</option>
                 <option value="he/him">He/him</option>
                 <option value="she/her">She/her</option>
               </Form.Select>
               <span>15 characters</span>
            </div>
         </div>
         <div className="profile-container-item">
            <div className="profile-container-element">
              <label>Description</label>
              <Form.Control as="textarea" rows={13} placeholder='Tell us about yourself in up to 160 characters.' onChange={(event)=>setDesc(event.target.value)} value={desc}/>
            </div>
            <div className="profile-container-element">
               <label>Superhero Identity</label>
                <div className='profile-container-element-group'>
                    <div className='profile-container-element-group-item'>
                    <div className='profile-container-element-group-item-left'>
                       <Form.Control type="text" placeholder="Descriptor" onChange={(event)=>setDescriptor(event.target.value)} value={descriptor} />
                       <span>Example: Amazing</span>
                    </div>
                    </div>
                    <div className='profile-container-element-group-item'>
                    <div className='profile-container-element-group-item-right'>
                       <Form.Control type="text" placeholder="Noun"  onChange={(event)=>setNouns(event.target.value)} value={nouns}/>
                       <span>Example: Elf</span>
                    </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
      {!isLoading &&
         <div className='profile-container-action'>
            {isSubmit &&
            <Button variant="primary" size='lg'>
               Minting Your Profile...
            </Button>
            }
            {!isSubmit &&
                  <Button variant="primary" size='lg' onClick={createNewProfile}>
                  Mint Your Profile
                  </Button>
            }
            <div className='price-details'>
              <p>Price: 20000 MMOSH</p>
              <label>plus a small amount of SOL for gas fees</label>
            </div>
            <div className='balance-details'>
              <p>Current Balance: {tokBalance} MMOSH</p>
              <p>Current Balance: {solBalance} SOL</p>
            </div>
         </div>
      }

      {isLoading &&
         <div className='profile-container-action'>
            <Button variant="primary" size='lg'>
               Loading Profile...
            </Button>
         </div>
      }

    </div>
  );
}
