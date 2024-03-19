"use client";
import { web3Consts } from "@/anchor/web3Consts";
import * as anchor from "@coral-xyz/anchor";
import { InsertPhoto } from "@mui/icons-material";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Connectivity as UserConn } from "../../anchor/user";
import { useDropzone } from "react-dropzone";
import { Bars } from "react-loader-spinner";
import { pinImageToShadowDrive } from "../lib/pinImageToShadowDrive";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { Connection, Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import Config from "./../../anchor/web3Config.json";
import { v4 as uuidv4 } from "uuid";

export default function CreateCoin() {
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

    const [isSubmit, setIsSubmit] = useState(false);

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
      let userConn: UserConn = new UserConn(env, web3Consts.programID);
  

      const body = {
        name: name,
        symbol: symbol,
        description: desc,
        image: "",
      };

      if (imageFile[0].file != null) {
        const imageUri = await pinImageToShadowDrive(imageFile[0].file);
        body.image = imageUri;
        if (imageUri === "") {
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

      const shdwHash: any = await pinFileToShadowDrive(body);
      if (shdwHash === "") {
        setIsSubmit(false);
        createMessage(
          "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
          "danger-container",
        );
        return;
      }

      const res: any = await userConn.initCoins({
        name,
        symbol,
        uri: shdwHash,
        amount: 1000
      });
      setIsSubmit(false);


      if (res.Ok) {
          createMessage(
            <p>Congrats! You coin is  minted and tradable in <a href="javascript:void(0)">Swap</a></p>,
            "success-container",
          );
          setName("");
          setSymbol("")
          setDesc("");
          getProfileInfo();
      } else {
        createMessage(
            "We’re sorry, there was an error while trying to mint. Check your wallet and try again.",
            "danger-container",
          );
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
    setMsgText(message);
    setMsgClass(type);
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 4000);
   };

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
                        Minting...
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
                        <p>Exchange {tokBalance} $MMOSH for {tokBalance} $Coins </p>
                    }
                    {symbol != "" &&
                        <p>Exchange {tokBalance} $MMOSH for {tokBalance} ${symbol} </p>
                    }

                    <label>
                        Plus a small amount of SOL for transaction fees
                    </label>
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
