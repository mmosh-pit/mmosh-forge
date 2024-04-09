"use client";
import React, { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { ArrowBackIos, CheckBox, CheckBoxOutlineBlank, Close, KeyboardArrowDown, Search} from "@mui/icons-material";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import SwapCoinVW from "@/app/ui/swapcoins/swapcoinvw";
import axios from "axios";
import * as anchor from "@coral-xyz/anchor";
import { Connectivity as UserConn } from "../../../../anchor/user";
import { Connectivity as ProjectConn } from "../../../../anchor/project";
import { web3Consts } from "@/anchor/web3Consts";
import { calcNonDecimalValue } from "@/anchor/curve/utils";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ForgeContext } from "@/app/context/ForgeContext";
import { ShdwDrive } from "@shadow-drive/sdk";
import Config from "./../../../../anchor/web3Config.json";
import { v4 as uuidv4 } from "uuid";

let source;


export default function ProjectStepFour() {
    const navigate = useRouter();
    const connection = useConnection();
    const wallet: any = useAnchorWallet();
    const forgeContext = React.useContext(ForgeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [mintingStatus, setMintingStatus] = useState("Minting...")
    const [solBalance, setSolBalance] = useState(0);
    const [tokBalance, setTokBalance] = useState(0);

    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");


    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [topics, setTopics] = useState([])
    const [coin, setCoin] = useState({
        name:"",
        symbol: "Select",
        token: "",
        image:"/images/logo.png",
        balance: 0,
        bonding:"",
        value: 0
    });
    const [price, setPrice] = useState("");
    const [invitationTypes, setInvitationTypes] = useState(["required","optional","none"]);
    const [invitationType, setInvitationType] = useState("required");
    const [discount, setDiscount] = useState("")
    const [invitaitonPrice, setInvitationPrice] = useState("");
    const [priceDistribution, setPriceDistribution] = useState<any>({
        echosystem: 3,
        curator: 2,
        creator: 70,
        promoter: 20,
        scout: 5,
    });

    const [username, setUsername] = useState("")

    const [profile, setProfile] = useState("");

    useEffect(()=>{
        let projectDetails:any = JSON.parse(localStorage.getItem("step1"));
        setName(projectDetails.name)
        setSymbol(projectDetails.symbol)
        setDescription(projectDetails.description)
        setImageFile(projectDetails.image)

        let topicsData:any = JSON.parse(localStorage.getItem("step2"));
        setTopics(topicsData);
    
        let projectInfo:any = JSON.parse(localStorage.getItem("step3"));
        setCoin(projectInfo.coin)
        console.log("projectInfo.coin ", projectInfo.coin)
        setPrice(projectInfo.price)
        setInvitationType(projectInfo.invitationType)
        setDiscount(projectInfo.discount)
        setInvitationPrice(projectInfo.invitaitonPrice)
        setPriceDistribution(projectInfo.priceDistribution)
    
    },[])

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
        setProfile(profileInfo.profiles[0].address);

        const fullname = profileInfo.profiles[0].userinfo.name.split(" ");
        setUsername(fullname[0]);
    
        setIsLoading(false);
    
    };

    const validateFields = () => {
        if(tokBalance < 45000) {
            createMessage(
                <p>
                  Hey! We checked your wallet and you don’t have enough MMOSH to mint.{" "}
                  <a href="https://jup.ag/swap/SOL-MMOSH" target="_blank">
                    Get some MMOSH here
                  </a>{" "}
                  and try again!
                </p>,
                "warning-container",
              );
            return false
        }

        if(solBalance < 0.1) {
            createMessage(
                <p>Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!</p>,
                "danger-container",
            );
            return false
        }

        return true;
    };

    const createMessage = (message: any, type: any) => {
        window.scrollTo(0, 0);
        setMsgText(message);
        setMsgClass(type);
        setShowMsg(true);
        setMintingStatus("Mint")
        setIsSubmit(false)
        if(type == "success-container") {
          setTimeout(() => {
            setShowMsg(false);
          }, 4000);
        } else {
          setTimeout(() => {
            setShowMsg(false);
          }, 4000);
        }
    
    };
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const createStep4 = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setIsSubmit(true)
            const env = new anchor.AnchorProvider(connection.connection, wallet, {
                preflightCommitment: "processed",
            });

            const projectKeyPair = anchor.web3.Keypair.generate();

            console.log("project key ", projectKeyPair.publicKey.toBase58());

            let projectConn: ProjectConn = new ProjectConn(env, web3Consts.programID, projectKeyPair.publicKey);


            let invPrice = Number(invitaitonPrice);
            if(discount !== "") {
                invPrice = invPrice - (invPrice * (Number(discount) / 100))
            }

            const profileMintingCost = new anchor.BN(calcNonDecimalValue(Number(price), 9))
            const invitationMintingCost = new anchor.BN(calcNonDecimalValue(invPrice, 9))

                    
            setMintingStatus("Preparing Metadata...")

            const body = {
                name: name,
                symbol: symbol,
                description: description,
                image: imageFile,
                enternal_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
                family: "MMOSH",
                collection: "MMOSH Pass Collection",
                attributes: [
                  {
                    trait_type: "Primitive",
                    value: "Pass",
                  },
                  {
                    trait_type: "MMOSH",
                    value: " Genesis MMOSH",
                  },
                  {
                    trait_type: "Project",
                    value: projectKeyPair.publicKey.toBase58(),
                  },
                  {
                    trait_type: "Seniority",
                    value: "0",
                  },
                  {
                    trait_type: "Creator",
                    value: forgeContext.userData.name,
                  },
                ],
            };

            for (let index = 0; index < topics.length; index++) {
                body.attributes.push(
                    {
                        trait_type: "topics",
                        value: topics[index].value
                    }
                )
            }

            const shdwHash: any = await pinFileToShadowDrive(body);

            if (shdwHash === "") {
              createMessage(
                "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
                "danger-container",
              );
              return;
            }

            console.log("initProjectState params ", {
                oposToken: coin.token,
                profileMintingCost: price,
                invitationMintingCost: invPrice,
                mintingCostDistribution: {
                  parent: 100 * priceDistribution.curator,
                  grandParent: 100 * priceDistribution.creator,
                  greatGrandParent: 100 * priceDistribution.promoter,
                  ggreatGrandParent: 100 * priceDistribution.scout,
                  genesis: 100 * priceDistribution.echosystem,
                },
                tradingPriceDistribution: {
                    seller: 100 * priceDistribution.curator,
                    parent: 100 * priceDistribution.creator,
                    grandParent: 100 * priceDistribution.promoter,
                    greatGrandParent: 100 * priceDistribution.scout,
                    genesis: 100 * priceDistribution.echosystem,
                }
            })

            setMintingStatus("Creating Gensis Pass...")

            const res1 = await projectConn.mintGenesisPass({
                name,
                symbol,
                uri: shdwHash,
                mintKp: projectKeyPair,
                input:{
                  oposToken: new anchor.web3.PublicKey(coin.token),
                  profileMintingCost,
                  invitationMintingCost,
                  mintingCostDistribution: {
                    parent: 100 * priceDistribution.curator,
                    grandParent: 100 * priceDistribution.creator,
                    greatGrandParent: 100 * priceDistribution.promoter,
                    ggreatGrandParent: 100 * priceDistribution.scout,
                    genesis: 100 * priceDistribution.echosystem,
                  },
                  tradingPriceDistribution: {
                      seller: 100 * priceDistribution.curator,
                      parent: 100 * priceDistribution.creator,
                      grandParent: 100 * priceDistribution.promoter,
                      greatGrandParent: 100 * priceDistribution.scout,
                      genesis: 100 * priceDistribution.echosystem,
                  }
              }
            });

            const genesisProfileStr = res1.Ok.info.profile
            console.log("genesisProfileStr ", genesisProfileStr)

            setMintingStatus("Waiting for Confirmation...")

            await delay(15000)

            projectConn.setMainState();

            setMintingStatus("Preparing Badge Metadata...")

            let desc =
            "Cordially invites you to join on the "+capitalizeString(name)+". The favor of a reply is requested.";
            if (name != "") {
                desc =
                capitalizeString(name) +
                " cordially invites you to join "+ getPronouns()+" on the MMOSH. The favor of a reply is requested.";
            }

            const invitebody = {
                name: name != "" ? "Invitation from join " +  name : "Invitation",
                symbol: symbol,
                description: desc,
                image:imageFile,
                external_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
                minter: username,
                attributes: [
                    {
                        trait_type: "Project",
                        value: projectKeyPair.publicKey.toBase58(),
                    },
                    {
                      trait_type: "Seniority",
                      value: "0",
                    },
                ]
              };
        
            const shdwHashInvite: any = await pinFileToShadowDrive(invitebody);
    
            if (shdwHashInvite === "") {
                createMessage(
                    "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
                    "danger-container",
                );
                return;
            }

            setMintingStatus("Creating Badge Account...")
        
            const uri = shdwHashInvite;
            const res2: any = await projectConn.initBadge({
                name: "Invitation",
                symbol:  "INVITE",
                uri,
                profile: genesisProfileStr,
            });
            console.log("badge result ", res2)

            setMintingStatus("Waiting for Confirmation...")
            await delay(15000)

            setMintingStatus("Minting Badges...")
            
            const res3 = await projectConn.createBadge({
                amount: 100,
                subscriptionToken: res2.Ok.info.subscriptionToken,
            });
            console.log("create badge result ", res3)

            setMintingStatus("Waiting for Confirmation...")
            await delay(15000)

            setMintingStatus("Creating LUT Registration...")
            const res4:any = await projectConn.registerCommonLut();
            console.log("register lookup result ", res4)

            setMintingStatus("Buying new Project...")
            const res5 = await projectConn.sendProjectPrice(profile);
            console.log("create badge result ", res5)

            if(res5.Ok) {
              await axios.post("/api/save-project", {
                name,
                symbol,
                desc: description,
                image: imageFile,
                coinimage: coin.image,
                project: genesisProfileStr,
                tokenaddress: coin.token,
                lut: res4.Ok.info.lookupTable
              });

              localStorage.removeItem("step1")
              localStorage.removeItem("step2")
              localStorage.removeItem("step3")

              createMessage(
                  <p>Congrats! Your project has been deployed to the Solana blockchain and your assets have been sent to your wallet.</p>,
                  "success-container",
              );
              navigate.replace("/projects");
            } else {
              createMessage(
                <p>We’re sorry. An error occurred while trying to deploy your project and mint your assets. Please check your wallet and try again.</p>,
                "danger-container",
              );
            }



        } catch (error) {
            console.log(error)
            createMessage(
                <p>We’re sorry. An error occurred while trying to deploy your project and mint your assets. Please check your wallet and try again.</p>,
                "danger-container",
            );
        }


    }

    const capitalizeString = (str: any) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const getPronouns = () => {
        if(forgeContext.userData.pronouns == "they/them") {
          return "them";
        } else if(forgeContext.userData.pronouns == "he/him") {
          return "him";
        } else {
          return "her";
        }
      }

    const pinFileToShadowDrive = async (jsonData: any) => {
        try {
          const privateKey: any = process.env.NEXT_PUBLIC_SHDW_PRIVATE;
          let private_buffer = bs58.decode(privateKey);
          let private_arrray = new Uint8Array(
            private_buffer.buffer,
            private_buffer.byteOffset,
            private_buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT,
          );
          const keypair = anchor.web3.Keypair.fromSecretKey(private_arrray);
          const drive = await new ShdwDrive(
            new anchor.web3.Connection(Config.mainRpcURL),
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
    

    return (
        <div className="invitation-page create-coin-page project-step-page">
            {showMsg && (
                <div className={"message-container " + msgClass}>{msgText}</div>
            )}
            <div className="create-coin-page-header">
                <h2>Step 4</h2> 
                <h3>Mint and Deploy</h3> 
                <p className="heading">Deploy your project to the Solana blockchain and mint your Genesis Pass, a Project Pass <br/>and 100 Invitation Badges. You can mint more Badges on the project page any time.</p>
                <div className="backAction" onClick={()=>{navigate.back()}}>
                <ArrowBackIos /><span>Back</span>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-4">
                        <div className="project-image-collage-main">
                            <div className="project-image-collage">
                                <h3>{symbol}</h3>
                                <div className="project-image-collage-image">
                                <img src={imageFile} alt="project" className="project-image-collage-image-main"/>
                                <div className="project-image-collage-coin-image">
                                    {coin.name != "" &&
                                        <img src={coin.image} alt="project"/>
                                    }
                                    {coin.name == "" &&
                                        <div className="empty-coin-image"></div>
                                    }

                                </div>
                        
                                
                                </div>
                                <p className="project-image-collage-subtitle">{name}</p>
                                <p>{description}</p>
                            </div>
                            <p>Please note: the wallet that holds the Genesis Pass will receive all of your royalties as the Project Founder, so please keep it safe.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
               <div className="row justify-content-md-center">
                   <div className="col-md-4">
                      <div className="project-pass-collage-container">
                           <h3>Genesis Pass</h3>
                           <div className="project-pass-collage-image-decorated">
                               <img src={imageFile} alt="project" className="project-pass-collage-image-decorated-main"/>
                               <div className="project-pass-collage-image-decorated-left">
                                   <img src="/images/access.png" />
                               </div>
                               <div className="project-pass-collage-image-decorated-right">
                                   <img src="/images/logo.png" />
                               </div>
                               <div className="project-pass-collage-image-decorated-bottom">
                                   <img src="/images/passback.png" className="project-pass-collage-image-decorated-bottom-background" />
                                   <div className="project-pass-collage-image-decorated-bottom-info">
                                      <div className="row">
                                        <div className="col-4">
                                            <img src={coin.image} alt="project" className="project-pass-collage-image-decorated-bottom-coin"/>
                                        </div>
                                        <div className="col-8">
                                            <h3>Gensis Pass</h3>
                                        </div>
                                      </div>

                                   </div>

                               </div>
                           </div>
                      </div>
                   </div>
                   <div className="col-md-4">
                      <div className="project-pass-collage-container">
                           <h3>Project Pass</h3>
                           <div className="project-pass-collage-image">
                               <img src={imageFile} alt="project" className="project-image-collage-image-main"/>
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
                            <Button variant="primary" size="lg" onClick={createStep4}>
                                Mint
                            </Button>
                        }

                        <div className="price-details">
                            <p>Price: 45000 MMOSH</p>
                            <label>
                            Plus you will be charged a small amount of SOL in transaction fees.
                            </label>
                        </div>
                        <div className="balance-details">
                            <p>Current Balance: {tokBalance} MMOSH</p>
                            <p>Current Balance: {solBalance} SOL</p>
                        </div>
                    </>
                    }

            </div>
        </div>
    );
}
