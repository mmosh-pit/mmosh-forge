"use client";

import {useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { Connectivity as CurveConn } from "../../anchor/curve/bonding";
import { Connectivity as UserConn } from "@/anchor/user";
import SwapInputVW from "../ui/swapinput/swapinputvw";
import { Close, OpenInNew, Search, SwapVerticalCircle } from "@mui/icons-material";
import { Button, Form, InputGroup } from "react-bootstrap";
import SwapCoinVW from "../ui/swapcoins/swapcoinvw";
import Modal from 'react-bootstrap/Modal';
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { web3Consts } from "@/anchor/web3Consts";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { BondingPricing } from "@/anchor/curve/curves";
let source;

export default function Swap() {

    const connection = useConnection();
    const walletInjector = useWallet();
    const wallet = useAnchorWallet();

    const [show, setShow] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");

    const [connectionStatus, SetConnectionStatus] = useState("notconnected");

    const [curve,setCurve] = useState<BondingPricing>(undefined)
    
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

    const [keyword,setKeyword] = useState("")
    const [tokenList, setTokenList] = useState([]);
    const [recentTokens, setRecentTokenList] = useState([]);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [switcher, setSwitcher] = useState(false);

    const [swapSubmit, setSwapSubmit] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)

    useEffect(() => {
        if (walletInjector?.publicKey) {
            if (targeToken.name !== "" && baseToken.name !== "") {
                if(targeToken.token != web3Consts.oposToken.toBase58()) {
                    onTokenSelect(targeToken,"saved");
                } else {
                    onTokenSelect(baseToken,"saved");
                }
            }
           SetConnectionStatus("connected")
        }
    }, [walletInjector?.publicKey]);

    useEffect(()=>{
       if(walletInjector.connected) {
          SetConnectionStatus("connected")
       } else {
          SetConnectionStatus("notconnected")
       }
       setRecentTokenList(localStorage.getItem("recenttokens") ? JSON.parse(localStorage.getItem("recenttokens")) : [])
    },[])

    const createMessage = (message: any, type: any) => {
        window.scrollTo(0, 0);
        setMsgText(message);
        setMsgClass(type);
        setShowMsg(true);
        setTimeout(() => {
        setShowMsg(false);
        }, 4000);
    };

    const handleClose = () => {
        setShow(false);
 
    };
    const handleShow = () => {
        setKeyword("")
        setRecentTokenList(localStorage.getItem("recenttokens") ? JSON.parse(localStorage.getItem("recenttokens")) : []);
        setShow(true);
        getTokensFromAPI("");
    };

    const getTokensFromAPI = async (keyword:any) => {
        try {
            if(source) {
                source.cancel();
                source = null
            }
            source = axios.CancelToken.source();
            setTokenLoading(true)
            const listResult = await axios.get(`/api/token-list?keyword=${keyword}`,{
                cancelToken: source.token
            });
            setTokenList(listResult.data)
            setTokenLoading(false)
        } catch (error) {
            setTokenLoading(false)
            setTokenList([])
        }
    }

    const handleSearch = (event:any) => {
        setKeyword(event.target.value)
        getTokensFromAPI(event.target.value);
    } 

    const onTokenSelect = async (token:any,type: any) => {
        setSwapLoading(true);
        handleClose();
        setKeyword("");
        const env = new anchor.AnchorProvider(connection.connection, wallet, {
            preflightCommitment: "processed",
        });

        anchor.setProvider(env);
        let curveConn: CurveConn = new CurveConn(env, web3Consts.programID);

        console.log("token.token ",token.token)
        console.log("web3Consts.oposToken.toBase58() ",web3Consts.oposToken.toBase58())
    
        let balances = await curveConn.getTokenBalance(token.token,web3Consts.oposToken.toBase58())

        console.log("balances ",balances)
        
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

        if(type == "list") {
            let recents = localStorage.getItem("recenttokens") ? JSON.parse(localStorage.getItem("recenttokens")) : [];
            if(recents.length == 0) {
                recents.push(target);
            } else {
                let isExist = false;
                for (let index = 0; index < recents.length; index++) {
                    const element = recents[index];
                    if(element.symbol == target.symbol) {
                        isExist = true;
                        break;
                    }
                }
                if(!isExist) {
                    recents.unshift(target)
                }

                if(recents.length > 6) {
                    recents.splice(-1);
                }

                setRecentTokenList(recents);
            }
            localStorage.setItem("recenttokens",JSON.stringify(recents));
        }
        setSwapLoading(false);
    }

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
                if(sellres == "") {
                    createMessage(
                        "There was an error while swapping your tokens. Please, try again.",
                        "danger-container",
                    );
                    setSwapSubmit(false)
                    return
                }
            }


            let params;
            if(targeToken.token == web3Consts.oposToken.toBase58()) {
               // sell
               params = {
                basekey: targeToken.token,
                basename:  targeToken.name,
                basesymbol:  targeToken.symbol,
                baseimg: targeToken.image,
                bonding: targeToken.bonding,
                targetkey: baseToken.token,
                targetname: baseToken.name,
                targetsymbol:baseToken.symbol,
                targetimg: baseToken.image,
                value: (targeToken.value - (targeToken.value * 0.06)),
                price: baseToken.value / (targeToken.value - (targeToken.value * 0.06)),
                type:"sell",
                wallet:wallet.publicKey.toBase58()
               }
            } else {
                params = {
                    basekey: baseToken.token,
                    basename: baseToken.name,
                    basesymbol: baseToken.symbol,
                    baseimg: baseToken.image,
                    bonding: baseToken.bonding,
                    targetkey: targeToken.token,
                    targetname: targeToken.name,
                    targetsymbol:targeToken.symbol,
                    targetimg: targeToken.image,
                    value: baseToken.value,
                    price: (targeToken.value - (targeToken.value * 0.06)) / baseToken.value,
                    type:"buy",
                    wallet:wallet.publicKey.toBase58()
                }
            }
            await saveDirectory(params);


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
                    await onTokenSelect(targeToken,"saved");
                } else {
                    await onTokenSelect(baseToken,"saved");
                }
                setSwapSubmit(false)
            }, 15000);


        } catch (error) {
            console.log("error ", error)
            createMessage(
                "There was an error while swapping your tokens. Please, try again.",
                "danger-container",
            );
            setSwapSubmit(false)
        }
    

    }

    const saveDirectory = async (params) => {
        await axios.post("/api/save-directory", params);
    }

      
    return (
        <div className="invitation-page swap-page">
            {showMsg && (
                <div className={"message-container " + msgClass}>{msgText}</div>
            )}
            <div className="swap-page-header">
                <h2>Swap</h2> 
            </div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-xl-5">
                        <div className="swap-page-container">
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
                                                    Swapping Token...
                                            </Button>
                                        }
        
                                        
        
                                        {connectionStatus == "notconnected" &&
                                            <WalletMultiButton>Connect Wallet</WalletMultiButton>
                                        }
                                    </>
                               }



                               <p className="info">The price will automatically update after a period of time.</p>
                            </div>
                            {targeToken.name !== "" &&
                                <div className="swap-page-coins">
                                    <SwapCoinVW symbol={baseToken.symbol} name={baseToken.name} image={baseToken.image} address={baseToken.token} bonding={baseToken.bonding} onTokenSelect={(token:any,type:any)=>{}} />
                                    <SwapCoinVW symbol={targeToken.symbol} name={targeToken.name} image={targeToken.image} address={targeToken.token} bonding={targeToken.bonding} onTokenSelect={(token:any,type:any)=>{}} />
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

        <Modal
           id="forge-popup"
           show={show}
           onHide={handleClose}
           scrollable={true}
         >
            <Modal.Header>
                <div className="model-header-title">
                    <Modal.Title>Creator Coins</Modal.Title>
                    <Close onClick={handleClose} />
                </div>
                <div className="model-header-search">
                    <InputGroup className="model-header-search-group">
                        <InputGroup.Text><Search /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search"
                            aria-label="Search"
                            type="text"
                            value={keyword}
                            onChange={(event) => {handleSearch(event)}}
                        />
                    </InputGroup>
                </div>
                {recentTokens.length > 0 &&
                    <div className="model-header-recent">
                        <div className="row">
                            {recentTokens.map((recentTokenItem: any, index: any) => (
                                <div className="col-4" onClick={()=>{onTokenSelect(recentTokenItem,"saved")}}>
                                    <div className="model-header-recent-item">
                                        <img src={recentTokenItem.image} alt="recent" />
                                            <h6>{recentTokenItem.symbol}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }

            </Modal.Header>
            <Modal.Body>
            {tokenList.length > 0 &&
               <>
                {tokenList.map((tokenItem: any, index: any) => (
                     <SwapCoinVW symbol={tokenItem.symbol} name={tokenItem.name} image={tokenItem.image} address={tokenItem.token} bonding={tokenItem.bonding} onTokenSelect={onTokenSelect} />
                ))}
               </>
            }

            <Bars
                height="80"
                width="80"
                color="rgba(255, 0, 199, 1)"
                ariaLabel="bars-loading"
                wrapperStyle={{}} 
                wrapperClass="bars-loading"
                visible={tokenLoading}
            />
            {(tokenList.length == 0 && !tokenLoading) &&
               <p>Token not available</p>
            }

            </Modal.Body>
        </Modal>
        </div>
    )
}