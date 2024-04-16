"use client";

import { web3Consts } from "@/anchor/web3Consts";
import { Person } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { BondingPricing } from "@/anchor/curve/curves";
import { Connectivity as CurveConn } from "@/anchor/curve/bonding";
import { Connectivity as ProjectConn } from "@/anchor/project";
import { Connectivity as UserConn } from "@/anchor/user";
import SwapInputVW from "@/app/ui/swapinput/swapinputvw";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ForgeContext } from "@/app/context/ForgeContext";
import bs58 from "bs58";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import Config from "@/anchor/web3Config.json";
import { v4 as uuidv4 } from "uuid";

export default function ProjectDetail({ params }: { params: { address: string } }) {
    const forgeContext = React.useContext(ForgeContext);
    const connection = useConnection();
    const wallet = useAnchorWallet();

    const [projectLoading, setProjectLoading] = useState(true);
    const [projectDetail, setProjectDetail] = useState(null)
    const [creatorInfo, setCreatorInfo] = useState(null)
    const [projectInfo, setProjectInfo] = useState({
        profiles: [],
        activationTokens: [],
        activationTokenBalance: 0,
        totalChild: 0,
        profilelineage: {
            promoter: "",
            promoterprofile:"",
            scout: "",
            scoutprofile:"",
            recruiter: "",
            recruiterprofile: "",
            originator: "",
            originatorprofile: "",
        },
        generation: "",
        invitationPrice: 0,
        mintPrice: 0
    })

    const [solBalance, setSolBalance] = useState(0);
    const [inputValue, setInputValue] = useState("")

    const [targeToken,setTargetToken] = useState({
        name:"",
        symbol: "Select",
        token: "",
        image:"/images/logo.png",
        balance: 0,
        bonding:"",
        value: 0
    })
    const [baseToken, setBaseToken] = useState({
        name:"MMOSH: The Stoked Token",
        symbol: "MMOSH",
        token: web3Consts.oposToken.toBase58(),
        image:"https://shdw-drive.genesysgo.net/7nPP797RprCMJaSXsyoTiFvMZVQ6y1dUgobvczdWGd35/MMoshCoin.png",
        balance: 0,
        bonding:"",
        value: 0
    });
    const [switcher, setSwitcher] = useState(false);
    const [swapSubmit, setSwapSubmit] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)
    const [connectionStatus, SetConnectionStatus] = useState("connected");
    const [curve,setCurve] = useState<BondingPricing>(undefined)

    const [show, setShow] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");

    const [inviteSubmit, setInviteSubmit] = useState(false)
    const [inviteButtonStatus, setInviteButtonStatus] = useState("Mint")

    const [passSubmit, setPassSubmit] = useState(false)
    const [passButtonStatus, setPassButtonStatus] = useState("Mint")
    const [telegram, setTelegram] = useState("")

    const [telegramSubmit, setTelegramSubmit] = useState(false)
    const [telegramButtonStatus, setTelegramButtonStatus] = useState("Save")

    const [isOwner, setOwner] = useState(false)
    const [profile, setProfile] = useState("")

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(()=>{
        getProjectDetailFromAPI()
    },[])


    const getProjectDetailFromAPI = async() => {
        try {
            setProjectLoading(true)
            let listResult = await axios.get(`/api/project-detail?project=${params.address}`);
            const coinResult = await axios.get(`/api/get-token-by-address?token=${listResult.data.token}`);
            listResult.data.coin = coinResult.data
            setBaseToken(coinResult.data)
            onTokenSelect(coinResult.data)
            console.log("listResult ",listResult)
            setProjectDetail(listResult.data)
            setTelegram(listResult.data.telegram)
            getUserProfileInfo()
        } catch (error) {
            setProjectLoading(false)
            setProjectDetail(null)
        }
    }

    const getUserProfileInfo = async () => {
        setProjectLoading(false)
        const env = new anchor.AnchorProvider(connection.connection, wallet, {
            preflightCommitment: "processed",
        });

        anchor.setProvider(env);
        let projectConn: ProjectConn = new ProjectConn(env, web3Consts.programID, new anchor.web3.PublicKey(params.address));
        let projectInfo = await projectConn.getProjectUserInfo(params.address);

        let tokenInfo = await projectConn.metaplex.nfts().findByMint({
            mintAddress: new anchor.web3.PublicKey(params.address) 
        })
        let creator = tokenInfo.creators[0].address.toBase58()
        let userInfo = await getUserData(creator);
        setCreatorInfo(userInfo);
        if(projectInfo.profiles.length > 0) {
            if(projectInfo.profiles[0].address == params.address) {
                setOwner(true)
            } else {
                setOwner(false)
            }
        }
        setProjectInfo(projectInfo)
        getProfileInfo()
    }

    const getProfileInfo = async () => {
        const env = new anchor.AnchorProvider(connection.connection, wallet, {
          preflightCommitment: "processed",
        });
        let userConn: UserConn = new UserConn(env, web3Consts.programID);
        const profileInfo = await userConn.getUserInfo();
        setProfile(profileInfo.profiles[0].address);
        setProjectLoading(false)
    };

    const actionSwitch = () => {
        let target:any = targeToken;
        target.value = 0;
        let base:any = baseToken;
        base.value = 0;
        let nextSwitcher = switcher ? false : true
        setSwitcher(nextSwitcher);
        if(nextSwitcher) {
            setTargetToken(base)
            setBaseToken(target)
        } else {
            setTargetToken(base)
            setBaseToken(target)
        }
  
    }

    const onTokenSelect = async (token:any) => {
        setSwapLoading(true);
        const env = new anchor.AnchorProvider(connection.connection, wallet, {
            preflightCommitment: "processed",
        });

        anchor.setProvider(env);
        let curveConn: CurveConn = new CurveConn(env, web3Consts.programID);

        console.log("token.token ",token.token)
        console.log("web3Consts.oposToken.toBase58() ",web3Consts.oposToken.toBase58())
    
        let balances = await curveConn.getTokenBalance(token.token,web3Consts.oposToken.toBase58())

        console.log("balances ",balances)

        setSolBalance(balances.sol);
        
        let target = {
            name:token.name,
            symbol: token.symbol,
            token: token.token,
            image:token.image,
            balance: balances.base,
            bonding: token.bonding,
            value: 0
        };

        let base = {
            name:"MMOSH: The Stoked Token",
            symbol: "MMOSH",
            token: web3Consts.oposToken.toBase58(),
            image:"/images/logo.png",
            balance: balances.target,
            bonding: token.bonding,
            value: 0
        }
        
        if(switcher) {
            setTargetToken(base)
            setBaseToken(target)
        } else {
            setTargetToken(target)
            setBaseToken(base)
        }

        setCurve(await curveConn.getPricing(new anchor.web3.PublicKey(token.bonding)));

        setSwapLoading(false);
    }

    const onSetValue = (receivedValue,type) => {

        setTargetToken({
            name:targeToken.name,
            symbol: targeToken.symbol,
            token: targeToken.token,
            image:targeToken.image,
            balance: targeToken.balance,
            bonding: targeToken.bonding,
            value: receivedValue
        });
        
        if(type === "sell") {
            if(targeToken.token == web3Consts.oposToken.toBase58()) {
                console.log("receivedValue opos ",receivedValue)
                let buyValue = curve.buyWithBaseAmount(receivedValue - (receivedValue * 0.06))
                let base = baseToken
                base.value = buyValue
                setBaseToken(base);
            } else {
                console.log("receivedValue non opops ",receivedValue)
                let buyValue = curve.sellTargetAmount(receivedValue - (receivedValue * 0.06))
                let base = baseToken
                base.value = buyValue
                setBaseToken(base);
            }
        } 
    }

    const actionSwap = async () => {
        setSwapSubmit(true);
        const env = new anchor.AnchorProvider(connection.connection, wallet, {
            preflightCommitment: "processed",
        });

        anchor.setProvider(env);
        let curveConn: CurveConn = new CurveConn(env, web3Consts.programID);
        let userConn: UserConn = new UserConn(env, web3Consts.programID);
        const tokenBondingAcct = await curveConn.getTokenBonding(new anchor.web3.PublicKey(targeToken.bonding));
        const gensisUser = await userConn.getGensisProfileOwner();
        const ownerUser = await userConn.getNftProfileOwner(tokenBondingAcct.targetMint);

        console.log("my user", wallet.publicKey.toBase58())
        console.log("tokenBondingAcct ownerUser ",ownerUser.profileHolder.toBase58())
        console.log("owner user share", (targeToken.value * 0.03) * web3Consts.LAMPORTS_PER_OPOS)
        console.log("tokenBondingAcct gensisUser",gensisUser.profileHolder.toBase58())
        console.log("gensisUser share ", (targeToken.value * 0.03) * web3Consts.LAMPORTS_PER_OPOS)

        let createShare:any =  await userConn.baseSpl.transfer_token_modified({ mint: new anchor.web3.PublicKey(targeToken.token), sender: wallet.publicKey, receiver: ownerUser.profileHolder, init_if_needed: true, amount: (targeToken.value * 0.03) * web3Consts.LAMPORTS_PER_OPOS })
        let gensisShare:any =  await userConn.baseSpl.transfer_token_modified({ mint: new anchor.web3.PublicKey(targeToken.token), sender: wallet.publicKey, receiver: gensisUser.profileHolder, init_if_needed: true, amount: (targeToken.value * 0.03) * web3Consts.LAMPORTS_PER_OPOS })
        for (let index = 0; index < createShare.length; index++) {
            curveConn.txis.push(createShare[index]);
        }
        for (let index = 0; index < gensisShare.length; index++) {
            curveConn.txis.push(gensisShare[index]);
        }

        try {
            if(targeToken.token == web3Consts.oposToken.toBase58()) {
                const buyres = await curveConn.buy({
                    tokenBonding: new anchor.web3.PublicKey(targeToken.bonding),
                    desiredTargetAmount: new anchor.BN(baseToken.value * web3Consts.LAMPORTS_PER_OPOS),
                    slippage: 0.5
                });
                console.log("buyres ",buyres)
            } else {
                const sellres = await curveConn.sell({
                    tokenBonding: new anchor.web3.PublicKey(targeToken.bonding),
                    targetAmount: new anchor.BN((targeToken.value - (targeToken.value * 0.06)) * web3Consts.LAMPORTS_PER_OPOS),
                    slippage: 0.5,
                });
                console.log("sellres ",sellres)
            }

            await userConn.storeRoyalty(wallet.publicKey.toBase58(), [
                {
                  receiver: ownerUser.profileHolder.toBase58(),
                  amount: (targeToken.value * 0.03),
                },
                {
                    receiver: gensisUser.profileHolder.toBase58(),
                    amount: (targeToken.value * 0.03),
                },
              ],targeToken.token);

            setTimeout(async () => {
                createMessage(
                    <p>Congrats! Your token have been swapped successfully</p>,
                    "success-container",
                );
                if(targeToken.token != web3Consts.oposToken.toBase58()) {
                    await onTokenSelect(targeToken);
                } else {
                    await onTokenSelect(baseToken);
                }
                setSwapSubmit(false)
            }, 15000);


        } catch (error) {
            createMessage(
                "There was an error while swapping your tokens. Please, try again.",
                "danger-container",
            );
            setSwapSubmit(false)
        }
    

    }

    const createMessage = (message: any, type: any) => {
        window.scrollTo(0, 0);
        setMsgText(message);
        setMsgClass(type);
        setShowMsg(true);
        setTimeout(() => {
        setShowMsg(false);
        }, 4000);
    };

    const inviteAction = async () => {

        if (Number(inputValue) == 0) {
            createMessage(
                "Please Enter invitation mint count",
                "warning-container",
              );
            return;
        }
        if (solBalance == 0) {
            createMessage(
              "Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!",
              "warning-container",
            );
            return;
        }

        let tolBalance = targeToken.balance;
        if(switcher) {
            tolBalance = baseToken.balance
        }

        if(tolBalance < Number(inputValue) * (projectInfo.invitationPrice / 1000_000_000)) {
            createMessage(
                "Hey! We checked your wallet and you don’t have enough "+projectDetail.coin.symbol+" to mint. Get some MMOSH here and try again!",
                "warning-container",
            );
            return
        }

    
        try {
            const env = new anchor.AnchorProvider(connection.connection, wallet, {
                preflightCommitment: "processed",
            });
            setInviteSubmit(true)
            anchor.setProvider(env);
            let projectConn: ProjectConn = new ProjectConn(env, web3Consts.programID, new anchor.web3.PublicKey(params.address));
            let activationToken;
            if(projectInfo.activationTokens.length == 0) {
                setInviteButtonStatus("Preparing Metadata ...")
                let attributes = [];

                // get promoter name
                if (projectInfo.profilelineage.promoter.length > 0) {
                  let promoter: any = await getUserName(projectInfo.profilelineage.promoter);
                  if (promoter != "") {
                    attributes.push({
                      trait_type: "Parent",
                      value: promoter,
                    });
                  } else {
                    attributes.push({
                      trait_type: "Parent",
                      value: projectInfo.profilelineage.promoter,
                    });
                  }
                }

                attributes.push({
                    trait_type: "Seniority",
                    value: projectInfo.generation,
                });

                attributes.push({
                    trait_type: "Gen",
                    value: projectInfo.generation,
                });

                attributes.push({
                    trait_type: "Project",
                    value: params.address,
                });

                let desc =
                "Cordially invites you to join on the "+capitalizeString(projectDetail.name)+". The favor of a reply is requested.";
                if (forgeContext.userData.name != "") {
                    desc =
                    capitalizeString(forgeContext.userData.name) +
                    " cordially invites you to join "+ getPronouns()+" on the "+capitalizeString(projectDetail.name)+". The favor of a reply is requested.";
                }
        
              const body = {
                name: forgeContext.userData.name != "" ? "Invitation from " + capitalizeString(projectDetail.name) : "Invitation",
                symbol: projectDetail.symbol,
                description: desc,
                image: projectDetail.image,
                external_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
                minter: forgeContext.userData.name,
                attributes: attributes,
              };

              const shdwHash: any = await pinFileToShadowDrive(body);

              if (shdwHash === "") {
                createMessage(
                  "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
                  "danger-container",
                );
                return;
              }
              setInviteButtonStatus("Initialize Badge Account...")
              const initResult = await projectConn.initBadge({
                name: "Invitation",
                symbol: "BADGE",
                uri:shdwHash,
                profile: projectInfo.profiles[0].address
              })
               console.log("initResult ", initResult)
               activationToken = initResult.Ok.info.subscriptionToken
               setInviteButtonStatus("Wait for confirmation...")
               await delay(15000)
            } else {
               activationToken = projectInfo.activationTokens[0].activation
            }
            
            console.log("activationToken ", activationToken)
            setInviteButtonStatus("Mint Badge...")
            let res;
            if(Number(projectInfo.invitationPrice) / 1000_000_000 > 0) {
                res = await projectConn.mintBadge({
                    amount: Number(inputValue),
                    subscriptionToken: activationToken
                })
            } else {
                res = await projectConn.createBadge({
                    amount: Number(inputValue),
                    subscriptionToken: activationToken
                })
            }

            console.log("mintBadge ",res);
            if(res.Ok) {
                createMessage(
                    "Congrats! You have minted your Invitation(s) successfully.",
                    "success-container",
                );
            } else {
                createMessage(
                    "We’re sorry, there was an error while trying to mint your Invitation Badge(s). Check your wallet and try again.",
                    "danger-container",
                );
            }

            setInviteSubmit(false)
            setInviteButtonStatus("Mint")
            setInputValue("");
            getProjectDetailFromAPI()
        } catch (error) {
            createMessage(
                "We’re sorry, there was an error while trying to mint your Invitation Badge(s). Check your wallet and try again.",
                "danger-container",
            );
            setInviteSubmit(false)
            setInviteButtonStatus("Mint")
        }

    }

    const getUserName = async (pubKey: any) => {
        try {
          const result = await axios.get(`/api/get-wallet-data?wallet=${pubKey}`);
          if (result) {
            if (result.data) {
              if (result.data.profile) {
                return result.data.profile.username;
              }
            }
          }
          return "";
        } catch (error) {
          return "";
        }
    };

    const getUserData = async (address: any) => {
        try {
            const result = await axios.get(
                `/api/get-wallet-data?wallet=${address}`,
              );
              if (result) {
                if (result.data) {
                  if (result.data.profile) {
                    return result.data.profile;
                  }
                }
            }
            return null
        } catch (error) {
            return null
        }
    };
    

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

    const handleShow = () => {

    }

    const passAction = async () => {
        if (solBalance < 0) {
            createMessage(
              <p>
                Hey! We checked your wallet and you don’t have enough SOL for the gas
                fees. Get some Solana and try again!
              </p>,
              "warning-container",
            );
            return;
        }
      
        let tolBalance = targeToken.balance;
        if(switcher) {
            tolBalance = baseToken.balance
        }

        if(tolBalance < (projectInfo.mintPrice / 1000_000_000)) {
            createMessage(
                "Hey! We checked your wallet and you don’t have enough "+projectDetail.coin.symbol+" to mint. Get some MMOSH here and try again!",
                "warning-container",
            );
            return
        }
       
        try {
            setPassSubmit(true);
            const genesisProfile = projectDetail.project;
            const activationToken = new anchor.web3.PublicKey(projectInfo.activationTokens[0].activation);
            const env = new anchor.AnchorProvider(connection.connection, wallet, {
              preflightCommitment: "processed",
            });
            let projectConn: ProjectConn = new ProjectConn(env, web3Consts.programID, new anchor.web3.PublicKey(params.address));
            setPassButtonStatus("Preparing Metadata...")
            const body = {
                name:  projectDetail.name,
                symbol: projectDetail.symbol,
                description: projectDetail.desc,
                image: projectDetail.image,
                enternal_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
                family: "MMOSH",
                collection: "MMOSH Pass Collection",
                attributes: [
                  {
                    trait_type: "Project",
                    value:params.address,
                  },
                  {
                    trait_type: "Primitive",
                    value:"Pass",
                  },
                  {
                    trait_type: "MMOSH",
                    value:"Genesis MMOSH",
                  },
                  {
                    trait_type: "Seniority",
                    value:"0",
                  },
                ],
            };



            // get originator name
            if (projectInfo.profilelineage.originator.length > 0) {
                let originator: any = await getUserName(projectInfo.profilelineage.originator);
                if (originator != "") {
                    body.attributes.push({
                    trait_type: "Creator",
                    value: originator,
                    });
                } else {
                    body.attributes.push({
                    trait_type: "Creator",
                    value: projectInfo.profilelineage.originator,
                    });
                }
                body.attributes.push({
                    trait_type: "Creator_Profile",
                    value: projectInfo.profilelineage.originatorprofile,
                });
            }

            const shadowHash: any = await pinFileToShadowDrive(body);
            if (shadowHash === "") {
                setPassSubmit(false);
                createMessage(
                    "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
                    "danger-container",
                );
                return;
            }
            setPassButtonStatus("Minting Pass...")

            const res = await projectConn.mintPass({
                name: projectDetail.name,
                symbol: projectDetail.symbol,
                uriHash: shadowHash,
                activationToken,
                genesisProfile,
                commonLut: projectDetail.lut
            },profile);

            if(res.Ok) {
                setPassButtonStatus("Waiting for confirmations...")
                await delay(15000)
                createMessage(
                    "Congrats! You have minted your Pass successfully.",
                    "success-container",
                );
                getProjectDetailFromAPI()
            } else {
                createMessage(
                    "We’re sorry, there was an error while trying to mint your Pass. Check your wallet and try again.",
                    "danger-container",
                );
            }
                 
            setPassSubmit(false)
            setPassButtonStatus("Mint")
        } catch (error) {
            createMessage(
                "We’re sorry, there was an error while trying to mint your Pass. Check your wallet and try again.",
                "danger-container",
            );
            setPassSubmit(false)
            setPassButtonStatus("Mint")
        }
    }

    const saveTelegram = async() => {
        try {
            setTelegramSubmit(true)
            setTelegramButtonStatus("Saving...")
            await axios.put("/api/update-project", {
                field: "telegram",
                value: telegram,
                project: projectDetail.project,
            });
            setTelegramSubmit(false)
            setTelegramButtonStatus("Save")
        } catch (error) {
            console.log("save telegram ",error)
            setTelegramSubmit(false)
            setTelegramButtonStatus("Save")
        }

    }

    return (
        <>
            {projectDetail &&
                <div className="project-detail-main-banner">
                {isOwner &&
                    <div className="telegram-info">
                            Connect to Official Community on Telegram
                    </div>
                }

                {!isOwner &&
                    <div className="telegram-info-others">
                            Mint this Pass to join {capitalizeString(projectDetail.name)}
                    </div>
                }

                </div>
            }
            {showMsg && (
                <div className={"message-container " + msgClass}>{msgText}</div>
            )}
            <div className="container">
                <div className="project-detail">
                    <div className="project-detail-loader">
                        <Bars
                            height="80"
                            width="80"
                            color="rgba(255, 0, 199, 1)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}} 
                            wrapperClass="bars-loading"
                            visible={projectLoading}
                        />
                    </div>
                    {projectDetail &&
                    <>
                
                        <div className="project-detail-containers-sub-banner">
                                <div className="project-detail-container-inner">
                                    <div className="project-detail-cointainer-info">
                                        <div className="project-pass-collage-image">
                                            <img src={projectDetail.image} alt="project" className="project-image-collage-image-main"/>
                                        </div>
                                        <h2>{projectDetail.name} <span>. {projectDetail.symbol}</span></h2>
                                        <p>{projectDetail.desc}</p>
                                    </div>
                                </div>
                                {creatorInfo &&
                                    <div className="project-detail-user-info">
                                        <div className="project-detail-user-info-header">
                                            <img src={creatorInfo.image} alt="project" className="user-image"/>
                                            <div className="project-detail-user-info-header-content">
                                                <h4>{creatorInfo.name}</h4>
                                                <p>@{creatorInfo.username}</p>
                                            </div>
                                        </div>
                                        <div className="project-detail-user-info-desc">
                                            {creatorInfo.bio}
                                        </div>
                                        <div className="project-detail-user-info-link">
                                            <a className="profile-link" href={process.env.NEXT_PUBLIC_APP_MAIN_URL +"/"+creatorInfo.username} target="_blank">{creatorInfo.name}</a>
                                        </div>
                                    </div>
                                }

                        </div>

                        <div className="project-detail-container">
                            <div className="project-detail-containers-mint-swap">
                                <h2>Coin</h2>
                                <div className="swap-page-container-coin-detail">
                                    <img src={projectDetail.coin.image} alt="coin image" />
                                    <h3>{projectDetail.coin.symbol}</h3>
                                </div>
                                <div className="swap-page-container-inner">
                                    <SwapInputVW balance={targeToken.balance} symbol={targeToken.symbol} type={"sell"} image={targeToken.image} onPopupOpen={handleShow} connectionstatus={connectionStatus} tokenAddress={targeToken.token} value={targeToken.value} onSetValue={onSetValue} />
                                    {targeToken.name !== "" &&
                                        <>
                                        <div className="swap-page-switcher" onClick={actionSwitch}>
                                            <div className="swap-page-switcher-border"></div>
                                            <div className="swap-page-switcher-icon">
                                            <img src="/images/swap.png" alt="swap" />
                                            </div>
                                        </div>
                                        <SwapInputVW balance={baseToken.balance} symbol={baseToken.symbol} type={"buy"} image={baseToken.image} onPopupOpen={handleShow} connectionstatus={connectionStatus} tokenAddress={baseToken.token} value={baseToken.value} onSetValue={onSetValue} />
                                        </>
                                    }
                                {swapLoading &&
                                        <Button variant="primary" size="lg">
                                            Loading Token...
                                        </Button>
                                }

                                {!swapLoading &&
                                        <>
                                            {(connectionStatus == "connected" && !swapSubmit) &&
                                            <>
                                            <>
                                                {(targeToken.value <= targeToken.balance) &&
                                                   <>
                                                        <div className="swap-info">3% goes to holder of the Genesis Profile and 3% goes to the holder of the Profile of the Coin Creator.</div>
                                                        <Button variant="primary" size="lg" onClick={actionSwap} disabled={!(targeToken.value <= targeToken.balance && targeToken.balance!=0 && targeToken.value!=0)} >
                                                            Swap
                                                        </Button>
                                                   </>

                                                }
                                            </>
                                                <>
                                                {(targeToken.value > targeToken.balance) &&
                                                    <Button variant="primary" size="lg" className="nobalance">
                                                            Insufficient {targeToken.symbol.toUpperCase()}
                                                    </Button>
                                                }
                                                </>
                                                </>
                                            }


                                        
            
                                            {(connectionStatus == "connected" && swapSubmit) &&
                                                <Button variant="primary" size="lg">
                                                        Swaping Token...
                                                </Button>
                                            }
            
                                            
            
                                            {connectionStatus == "notconnected" &&
                                                <WalletMultiButton>Connect Wallet</WalletMultiButton>
                                            }
                                        </>
                                }



                                <p className="info">The price will automatically update after a period of time.</p>
                                </div>
                            </div>
                            <div className="project-detail-containers-mint-box">
                                {projectInfo.profiles.length > 0 &&
                                    <div className="project-detail-containers-invitation">
                                        <div className="project-detail-container-inner">
                                            <div className="project-detail-container-invitation">
                                                <h2>Invitation Badges</h2>

                                                    <div className="project-pass-collage-image-decorated">
                                                        <img src={projectDetail.image} alt="project" className="project-pass-collage-image-decorated-main"/>
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
                                                                        <img src={projectDetail.coin.image} alt="project" className="project-pass-collage-image-decorated-bottom-coin"/>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <h3>Inivtiation Badge</h3>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="project-detail-element">
                                                        <label>Invitations to Mint</label>
                                                        <Form.Control
                                                        type="number"
                                                        placeholder="0"
                                                        onChange={(event) => setInputValue(event.target.value)}
                                                        value={inputValue}
                                                        />
                                                    </div>
                                                    <div className="profile-container-action">
                                                        {!inviteSubmit &&
                                                            <Button variant="primary" size="lg" onClick={inviteAction}>
                                                                Mint
                                                            </Button>
                                                        }
                                                        {inviteSubmit &&
                                                            <Button variant="primary" size="lg">
                                                                {inviteButtonStatus}
                                                            </Button>
                                                        }

                                                    <div className="price-details">
                                                        {Number(projectInfo.invitationPrice) / 1000_000_000 > 0 &&
                                                        <p>Price: {Number(projectInfo.invitationPrice) / 1000_000_000} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                        }
                                                
                                                        <label>
                                                        Plus you will be charged a small amount of SOL in transaction fees.
                                                        </label>
                                                        </div>
                                                        <div className="balance-details">
                                                            {switcher&&
                                                            <p>Current Balance: {baseToken.balance} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                            }
                                                            {!switcher&&
                                                            <p>Current Balance: {targeToken.balance} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                            }
                                                            
                                                            <p>Current Balance: {solBalance} SOL</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                } 
                                {projectInfo.profiles.length == 0 && projectInfo.activationTokens.length > 0 &&
                                    <div className="project-detail-containers-passes">
                                        <div className="project-detail-container-inner">
                                                <div className="project-detail-container-passes">
                                                <h2>Project Passes</h2>
                                                    <div className="project-pass-collage-image">
                                                        <img src={projectDetail.image} alt="project" className="project-image-collage-image-main"/>
                                                    </div>
                                                    <div className="profile-container-action">
                                                        {!passSubmit &&
                                                            <Button variant="primary" size="lg" onClick={passAction}>
                                                                Mint
                                                            </Button>
                                                        } 

                                                        {passSubmit &&
                                                            <Button variant="primary" size="lg">
                                                                {passButtonStatus}
                                                            </Button>
                                                        } 

                                                        <div className="price-details">
                                                            <p>Price: {Number(projectInfo.mintPrice) / 1000_000_000} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                            <label>
                                                            Plus you will be charged a small amount of SOL in transaction fees.
                                                            </label>
                                                        </div>
                                                        <div className="balance-details">
                                                            {switcher&&
                                                                <p>Current Balance: {baseToken.balance} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                            }
                                                            {!switcher&&
                                                                <p>Current Balance: {targeToken.balance} {projectDetail.coin.symbol.toUpperCase()}</p>
                                                            }
                                                            <p>Current Balance: {solBalance} SOL</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                
                                }

                            </div>
                        </div>
                        {isOwner &&
                        <div className="project-detail-telegram-container">
                            <div className="project-detail-telegram-container-inner">
                                <h4>Official Community on Telegram</h4>
                                <p>With the {projectDetail.name}, you may join the Official Community on Telegram by following the link below </p>
                              
                                    <div className="project-detail-telegram-container-input">
                                        <Form.Control
                                        type="text"
                                        placeholder="Link"
                                        onChange={(event) => setTelegram(event.target.value)}
                                        value={telegram}
                                        />
                                        {!telegramSubmit &&
                                            <Button variant="primary" size="lg" onClick={saveTelegram}>
                                                Save
                                            </Button>
                                        }
    
                                        {telegramSubmit &&
                                            <Button variant="primary" size="lg">
                                                {telegramButtonStatus}
                                            </Button>
                                        }
                                    </div>
                            </div>
                        </div>
                        }

                    {(!isOwner && telegram !="") &&
                        <div className="project-detail-telegram-container">
                            <div className="project-detail-telegram-container-inner">
                                <h4>Official Community on Telegram</h4>
                                <p>With the {projectDetail.name}, you may join the Official Community on Telegram by following the link below </p>
                              
                                <div className="project-detail-telegram-container-link">
                                    <a href={"https://t.me/"+telegram} target="_blank">{"https://t.me/"+telegram}</a>
                                </div>
                            </div>
                        </div>
                    }
            
                    </>
            
                    }



                </div>
            </div>
        </>
    )
}