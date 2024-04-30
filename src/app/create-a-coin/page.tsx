"use client";
import { web3Consts } from "@/anchor/web3Consts";
import * as anchor from "@coral-xyz/anchor";
import { InsertPhoto } from "@mui/icons-material";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Connectivity as UserConn } from "../../anchor/user";
import { Connectivity as CurveConn } from "../../anchor/curve/bonding";
import { useDropzone } from "react-dropzone";
import { Bars } from "react-loader-spinner";
import { pinImageToShadowDrive } from "../lib/pinImageToShadowDrive";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { Connection, Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import Config from "./../../anchor/web3Config.json";
import { v4 as uuidv4 } from "uuid";
import { ExponentialCurve, ExponentialCurveConfig } from "@/anchor/curve/curves";
import { percent } from "@strata-foundation/spl-utils";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateCoin() {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const connection = useConnection();
    const wallet: any = useAnchorWallet();

    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");
    const [solBalance, setSolBalance] = useState(0);
    const [tokBalance, setTokBalance] = useState(0);
    
    const [imageFile, setImageFile] = useState<any>([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
          "image/*": [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
          setImageFile(
            acceptedFiles.map((file) =>
              Object.assign(imageFile, {
                preview: URL.createObjectURL(file),
                file: file,
              }),
            ),
          );
        },
    });

    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [desc, setDesc] = useState("")
    const [supply, setSupply] = useState("")
    const [mintingStatus, setMintingStatus] = useState("Minting...")

    const [isSubmit, setIsSubmit] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    if (wallet?.publicKey) {
      const env = new anchor.AnchorProvider(connection.connection, wallet, {
        preflightCommitment: "processed",
      });
      anchor.setProvider(env);
      getProfileInfo();
    }
  }, [wallet?.publicKey]);

  const getProfileInfo = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    let userConn: UserConn = new UserConn(env, web3Consts.programID);

    const profileInfo = await userConn.getUserInfo();
    setSolBalance(profileInfo.solBalance);
    setTokBalance(profileInfo.oposTokenBalance);

    setImageFile([
        {
          preview: profileInfo.profiles[0].userinfo.image,
          file: null,
        },
    ]);

    setIsLoading(false);

   };

   const createNewCoins = async () => {
      if (!validateFields()) {
         return;
      }
      setIsSubmit(true)


      const env = new anchor.AnchorProvider(connection.connection, wallet, {
        preflightCommitment: "processed",
      });
      anchor.setProvider(env);
      let curveConn: CurveConn = new CurveConn(env, web3Consts.programID);

      // first time need to execute
      // const initres = await curveConn.initializeSolStorage({
      //   mintKeypair: new anchor.web3.Keypair()
      // })

      // console.log("initres ",initres)
  

      const body = {
        name: name,
        symbol: symbol,
        description: desc,
        image: "",
      };

      try {
        setMintingStatus("Vaidating Symbol...")
        const symbolResult = await axios.get(`/api/get-token?symbol=${symbol}`);
        if(symbolResult.data) {
          createMessage("Symbol already exist. please choose different symbol and try again", "danger-container");
          setMintingStatus("Minting...")
          setIsSubmit(false)
          return;
        }
        
        if (imageFile[0].file != null) {
          setMintingStatus("Uploading Image...")
          const imageUri = await pinImageToShadowDrive(imageFile[0].file);
          body.image = imageUri;
          if (imageUri === "") {
            setMintingStatus("Minting...")
            setIsSubmit(false);
            createMessage(
              "We’re sorry, there was an error while trying to uploading image. please try again later.",
              "danger-container",
            );
            return;
          }
        } else {
          body.image = imageFile[0].preview;
        }
        setMintingStatus("Uploading Metadata...")
        const shdwHash: any = await pinFileToShadowDrive(body);
        if (shdwHash === "") {
          setMintingStatus("Minting...")
          setIsSubmit(false);
          createMessage(
            "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
            "danger-container",
          );
          return;
        }
        const intialPrice = 1000000000000;
        const basePrice = calculatePrice(intialPrice);
        const coinValue = Number(supply) / basePrice * intialPrice;

       
        const curveConfig = new ExponentialCurve(
          {
            c: new anchor.BN(coinValue), // c = 1
            b: new anchor.BN(0),
            // @ts-ignore
            pow: 1,
            // @ts-ignore
            frac: 1,
          },
          0,
          0
        );
        
        setMintingStatus("Creating Curve Config...")
        let curve = await curveConn.initializeCurve({
          config: new ExponentialCurveConfig(curveConfig),
        });

   
        
        setMintingStatus("Creating Token...")
        await delay(15000)
        const targetMint = await curveConn.createTargetMint(
          name,
          symbol,
          shdwHash,
        );
        console.log("target mint ", targetMint)
        // setIsSubmit(false);
        // return 
   

        setMintingStatus("Creating Bonding Curve...")
      
        const res = await curveConn.createTokenBonding({
          name,
          symbol,
          url: shdwHash,
          curve:curve,
          baseMint: web3Consts.oposToken,
          generalAuthority: wallet?.publicKey,
          reserveAuthority: wallet?.publicKey,
          buyBaseRoyaltyPercentage: 0,
          buyTargetRoyaltyPercentage: 0,
          sellBaseRoyaltyPercentage: 0,
          sellTargetRoyaltyPercentage: 0,
          targetMint:new anchor.web3.PublicKey(targetMint)
        });

        console.log("createTokenBonding",res)
    

        setMintingStatus("Swapping Token...")
        await delay(15000)
        const buyres = await curveConn.buy({
          tokenBonding: res.tokenBonding,
          desiredTargetAmount: new anchor.BN(Number(supply) * web3Consts.LAMPORTS_PER_OPOS),
          slippage: 0.5
        });
  
        if (buyres) {
            setMintingStatus("Saving Token...")
            await storeToken(name,symbol,body.image, res.targetMint.toBase58(),res.tokenBonding.toBase58());
            createMessage(
              <p>Congrats! You coin is  minted and tradable in <a href="javascript:void(0)" onClick={()=>{navigate.push("/swap")}}>Swap</a></p>,
              "success-container",
            );
            setName("");
            setSymbol("")
            setSupply("")
            setDesc("");
            getProfileInfo();
        } else {
          createMessage(
              "We’re sorry, there was an error while trying to mint. Check your wallet and try again.",
              "danger-container",
            );
        }
        setMintingStatus("Minting...")
        setIsSubmit(false);

      } catch (error) {
        console.log("error on creeating coin",error)
        setMintingStatus("Minting...")
        setIsSubmit(false);
      }


   }

  const validateFields = () => {
    if (solBalance == 0) {
      createMessage(
        <p>
          Hey! We checked your wallet and you don’t have enough SOL for the gas
          fees. Get some Solana and try again!
        </p>,
        "warning-container",
      );
      return false;
    }

    if (tokBalance < 1000) {
      createMessage(
        <p>
          Hey! We checked your wallet and you don’t have enough MMOSH to Mint and Swap.{" "}
          <a href="https://jup.ag/swap/SOL-MMOSH" target="_blank">
            Get some MMOSH here
          </a>{" "}
          and try again!
        </p>,
        "warning-container",
      );
      return false;
    }


    if (name.length == 0) {
      createMessage("Name is required", "danger-container");
      return false;
    }

    if (symbol.length == 0) {
      createMessage("Symbol is required", "danger-container");
      return false;
    }


    if (supply === "") {
      createMessage("Supply is required", "danger-container");
      return false;
    }

    if (supply !== "") {
      if(parseInt(supply) < 1000 ) {
          createMessage("Minimum atleast 1000 $MMOSH need to spend", "danger-container");
          return false; 
      }
    }

    return true;
  };

  const pinFileToShadowDrive = async (jsonData: any) => {
    try {
      const privateKey: any = process.env.NEXT_PUBLIC_SHDW_PRIVATE;
      let private_buffer = bs58.decode(privateKey);
      let private_arrray = new Uint8Array(
        private_buffer.buffer,
        private_buffer.byteOffset,
        private_buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT,
      );
      const keypair = Keypair.fromSecretKey(private_arrray);
      const drive = await new ShdwDrive(
        new Connection(Config.mainRpcURL),
        new NodeWallet(keypair),
      ).init();

      const accounts = await drive.getStorageAccounts();
      const acc = accounts[0].publicKey;
      const getStorageAccount = await drive.getStorageAccount(acc);

      const blobData = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });
      const fileName = uuidv4() + ".json";
      const file = new File([blobData], fileName, { type: "application/json" });

      const upload = await drive.uploadFile(acc, file);
      console.log(upload);
      return upload.finalized_locations[0];
    } catch (error) {
      console.log("error", error);
      return "";
    }
  };


  const createMessage = (message: any, type: any) => {
    window.scrollTo(0, 0);
    setMsgText(message);
    setMsgClass(type);
    setShowMsg(true);
    if(type == "success-container") {
      setTimeout(() => {
        setShowMsg(false);
      }, 20000);
    } else {
      setTimeout(() => {
        setShowMsg(false);
      }, 4000);
    }

  };


  const calculatePrice = (coinValue: any) => {
      const curveConfig = new ExponentialCurve(
        {
          c: new anchor.BN(coinValue), // c = 1
          b: new anchor.BN(0),
          // @ts-ignore
          pow: 1,
          // @ts-ignore
          frac: 1,
        },
        0,
        0
      );

      return curveConfig.buyTargetAmount(Number(supply), percent(0), percent(0));
  }

  const storeToken  = async(nameStr:any, symbolStr:any, imageuri:any, tokenaddress:any, bondingaddress:any) =>  {
    await axios.post("/api/save-token", {
      name: nameStr,
      symbol: symbolStr,
      image: imageuri,
      tokenaddress: tokenaddress,
      bondingaddress: bondingaddress
    });
  }

  return (
    <div className="invitation-page create-coin-page">
    {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
      )}

       <div className="create-coin-page-header">
        <h2>Create your own Coin!</h2> 
        <p className="heading">With your own Coin, you can build community to launch and scale your own projects. Get started now!</p>
       </div>

       <div className="container">
           <div className="row justify-content-md-center">
              <div className="col-xl-7">
                 <div className="create-coin-container">
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="create-coin-left">
                                {imageFile.length == 0 && 
                                   <img src="/images/upload.png" alt="coins" />
                                }

                                {imageFile.length > 0 && 
                                   <img src={imageFile[0].preview} alt="coins" />
                                }
                                <div {...getRootProps({ className: "dropzone create-coin-uploader" })}>
                                    <input {...getInputProps()} />
                                    <div className="create-coin-uploader-icon">
                                        <InsertPhoto />
                                    </div>
                                    {imageFile.length > 0 && 
                                       <div className="create-coin-uploader-text">Replace image</div>
                                    }

                                    {imageFile.length == 0 && 
                                       <div className="create-coin-uploader-text">Add image</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="create-coin-right">
                                    <div className="profile-container-element">
                                            <label>Name your coin</label>
                                            <Form.Control
                                            type="text"
                                            placeholder="Enter coin name"
                                            maxLength={32}
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                            />
                                            <span>Up to 32 characters, can have spaces.</span>
                                    </div>

                                    <div className="profile-container-element">
                                            <label>Symbol</label>
                                            <Form.Control
                                            type="text"
                                            placeholder="Enter symbol"
                                            maxLength={10}
                                            onChange={(event) => setSymbol(event.target.value)}
                                            value={symbol}
                                            />
                                            <span>10 characters</span>
                                    </div>

                                    <div className="profile-container-element">
                                        <label>Description</label>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            maxLength={160}
                                            placeholder="Tell us about yourself in up to 160 characters."
                                            onChange={(event) => setDesc(event.target.value)}
                                            value={desc}
                                        />
                                    </div>

                            </div>
                        </div>
                    </div>
   

                </div>
              </div>

           </div>
       </div>


       
       <div className="profile-container-action">
            <Bars
                height="80"
                width="80"
                color="rgba(255, 0, 199, 1)"
                ariaLabel="bars-loading"
                wrapperStyle={{}} 
                wrapperClass="bars-loading"
                visible={isLoading}
            />
            {!isLoading &&
             <>
               {isSubmit &&
                    <Button variant="primary" size="lg">
                        {mintingStatus}
                    </Button>
               }
               {!isSubmit &&
                    <Button variant="primary" size="lg" onClick={createNewCoins}>
                        Mint and Swap
                    </Button>
                }
                <p>Minimum 1,000 initial purchase</p>
                <div className="price-details">
                    {symbol == "" &&
                        <div className="exchange-coin-box">
                          <p>Exchange</p> 
                           <Form.Control
                            type="number"
                            placeholder="0"
                            onChange={(event) => setSupply(event.target.value)}
                            value={supply}
                            />
                          <p>$MMOSH for {supply=="" ? 0 : supply} $Coins </p>
                        </div>
                    }
                    {symbol != "" &&
                      <div className="exchange-coin-box">
                        <p>Exchange</p> 
                          <Form.Control
                          type="number"
                          placeholder=""
                          onChange={(event) => setSupply(event.target.value)}
                          value={supply}
                          />
                        <p>$MMOSH for {supply=="" ? 0 : supply} ${symbol.toUpperCase()} </p>
                      </div>
                    }
                    <p>Enter the amount of your initial swap. You will<br/> swap {supply=="" ? 0 : supply} MMOSH for {supply=="" ? 0 : supply} {symbol == "" ? "Coins" : symbol.toUpperCase()} and you<br/> will be charged small amount of SOL in<br/> transaction fees </p>
                </div>
                <div className="coins-balance-details">
                    <div className="coins-balance-details-heading">
                        Current Balance
                    </div>
                    <p><label>{tokBalance}</label><span>MMOSH</span></p>
                    <p><label>{solBalance}</label><span>SOL</span></p>
                </div>
             </>
            }

       </div>

    </div>
  );
}
