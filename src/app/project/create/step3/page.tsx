"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBackIos, CheckBox, CheckBoxOutlineBlank, Close, KeyboardArrowDown, Search} from "@mui/icons-material";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import SwapCoinVW from "@/app/ui/swapcoins/swapcoinvw";
import axios from "axios";
let source;

export default function ProjectStepThree() {
    const navigate = useRouter();

    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");


    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState("");
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

    const [show, setShow] = useState(false);
    const [keyword,setKeyword] = useState("")
    const [tokenList, setTokenList] = useState([]);
    const [recentTokens, setRecentTokenList] = useState([]);
    const [tokenLoading, setTokenLoading] = useState(false);

    useEffect(()=>{
       let projectDetails:any = JSON.parse(localStorage.getItem("step1"));
       setName(projectDetails.name)
       setSymbol(projectDetails.symbol)
       setDescription(projectDetails.description)
       setImageFile(projectDetails.image)

       if(localStorage.getItem("step3")) {
            let projectInfo:any = JSON.parse(localStorage.getItem("step3"));
            setCoin(projectInfo.coin)
            setPrice(projectInfo.price)
            setInvitationType(projectInfo.invitationType)
            setDiscount(projectInfo.discount)
            setInvitationPrice(projectInfo.invitaitonPrice)
            setPriceDistribution(projectInfo.priceDistribution)
       }
    },[])

    const getTotalPercentage = () => {
        return  Number(priceDistribution.echosystem) +  Number(priceDistribution.creator) + Number(priceDistribution.curator) + Number(priceDistribution.promoter) + Number(priceDistribution.scout);
    }

    const validateFields = () => {
        if (coin.name == "") {
            createMessage("Please select coin", "danger-container");
            return false;
        }

        if (price == "") {
            createMessage("Please choose pass price", "danger-container");
            return false;
        }

        if (Number(price) % 1 != 0) {
            createMessage("Price should be full number", "danger-container");
            return false
        }

        if(invitationType !== "none") {
            if (invitaitonPrice == "") {
                createMessage("Please choose invitation price", "danger-container");
                return false;
            }

            if (Number(invitaitonPrice) % 1 != 0) {
                createMessage("Invitation should be full number", "danger-container");
                return false
            }
        }

        if(invitationType == "optional") {
            if (discount == "") {
                createMessage("Please choose discount", "danger-container");
                return false;
            }
    
            if (Number(discount) % 1 != 0) {
                createMessage("discount should be full number", "danger-container");
                return false
            }

            if (Number(discount) > 100) {
                createMessage("discount should be less than 100 percentage", "danger-container");
                return false
            }
        }

        if (getTotalPercentage() != 100) {
            createMessage("Mint price distribution should be below 100%", "danger-container");
            return false;
        }
    
        return true;
    };

    const createMessage = (message: any, type: any) => {
        window.scrollTo(0, 0);
        setMsgText(message);
        setMsgClass(type);
        setShowMsg(true);
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
    

    const createStep3 = async () => {
        if (!validateFields()) {
            return;
        }
        const body = {
            coin,
            price,
            invitationType,
            invitaitonPrice,
            discount,
            priceDistribution
        };
        localStorage.setItem("step3",JSON.stringify(body));
        navigate.push("/project/create/step4");
    }


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
        handleClose();
        setKeyword("");
        let coinDetails = {
            name:token.name,
            symbol: token.symbol,
            token: token.token,
            image:token.image,
            balance: 0,
            bonding: token.bonding,
            value: 0
        };
        setCoin(coinDetails)
        if(type == "list") {
            let recents = localStorage.getItem("recenttokens") ? JSON.parse(localStorage.getItem("recenttokens")) : [];
            if(recents.length == 0) {
                recents.push(coinDetails);
            } else {
                let isExist = false;
                for (let index = 0; index < recents.length; index++) {
                    const element = recents[index];
                    if(element.symbol == coinDetails.symbol) {
                        isExist = true;
                        break;
                    }
                }
                if(!isExist) {
                    recents.unshift(coinDetails)
                }

                if(recents.length > 6) {
                    recents.splice(-1);
                }

                setRecentTokenList(recents);
            }
            localStorage.setItem("recenttokens",JSON.stringify(recents));
        }
    }

    const chooseInvitationType = (currentInvitationType:any) => {
       setInvitationType(currentInvitationType)
       if(currentInvitationType == "none") {
           setPriceDistribution({
              echosystem: 3,
              curator: 7,
              creator: 90,
              promoter: 0,
              scout: 0,
           })
           setInvitationPrice("");
       } else {
           setPriceDistribution({
              echosystem: 3,
              curator: 2,
              creator: 70,
              promoter: 20,
              scout: 5,
           })
       }
    }

    return (
        <div className="invitation-page create-coin-page project-step-page">
            {showMsg && (
                <div className={"message-container " + msgClass}>{msgText}</div>
            )}
            <div className="create-coin-page-header">
                <h2>Step 3</h2> 
                <h3>Set the Coin, Royalties, Discount and Prices</h3> 
                <p className="heading">Choose the Coin that will be used by your community members.</p>
                <div className="backAction" onClick={()=>{navigate.back()}}>
                <ArrowBackIos /><span>Back</span>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-xl-8">
                        <div className="create-coin-container">
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="create-coin-left">
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
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="create-coin-right">
                                         <div className="project-share-container">
                                                <div className="row">
                                                   <div className="col-md-6">
                                                        <div className="profile-container-element">
                                                                <label>Set the Coin</label>
                                                                <div className="coin-select" onClick={handleShow}>
                                                                    <div className={coin ? "custom-form-control active" : "custom-form-control"}>
                                                                        {coin ? coin.symbol : "Coins"}
                                                                    </div>
                                                                    <div className="profile-container-element-icon">
                                                                        <KeyboardArrowDown />
                                                                    </div>
                                                                </div>

                                                        </div>
                                                   </div>
                                                   <div className="col-md-6">
                                                        <div className="profile-container-element">
                                                                <label>Project Pass Price</label>
                                                                <Form.Control
                                                                type="number"
                                                                placeholder="0"
                                                                onChange={(event) => setPrice(event.target.value)}
                                                                value={price}
                                                                />
                                                        </div>
                                                   </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="invitation-type-options">
                                                           <p className="heading">Invitation to Mint a Pass</p>
                                                           <div className="invitation-type-option-list">
                                                                {invitationTypes.map((invitationTypeItem: any, index: any) => (
                                                                    <div className="invitation-type-option-item" key={index} onClick={()=>{chooseInvitationType(invitationTypeItem)}}>
                                                                        <div className={invitationTypeItem == invitationType ? "invitation-type-option-item-select active" : "invitation-type-option-item-select" }>
                                                                            {invitationTypeItem == invitationType &&
                                                                                <CheckBox />
                                                                            }
                                                                            {invitationTypeItem != invitationType &&
                                                                                <CheckBoxOutlineBlank />
                                                                            }
                                                                        </div>
                                                                        <p>{invitationTypeItem}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {invitationType == "optional" &&
                                                        <div className="col-md-3">
                                                                <div className="profile-container-element">
                                                                        <label>Discount</label>
                                                                        <Form.Control
                                                                        type="number"
                                                                        placeholder="%"
                                                                        onChange={(event) => setDiscount(event.target.value)}
                                                                        value={discount}
                                                                        />
                                                                </div>
                                                        </div>
                                                    }
                                                    {invitationType != "none" &&
                                                    <div className="col-md-4">
                                                            <div className="profile-container-element">
                                                                    <label>Mint Price for Invitation</label>
                                                                    <Form.Control
                                                                    type="number"
                                                                    placeholder="0"
                                                                    onChange={(event) => setInvitationPrice(event.target.value)}
                                                                    value={invitaitonPrice}
                                                                    />
                                                            </div>
                                                    </div>
                                                    }
                                                </div>
                                                <div className="project-share-royalties">
                                                    <h4>Set the Royalties for the Project</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="project-share-royalties-info">
                                                                <label>Ecosystem</label>
                                                                <span>MMOSH DAO {priceDistribution.echosystem} %</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="project-share-royalties-info">
                                                                <label>Curator</label>
                                                                <span>Your Promoter {priceDistribution.curator} %</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="project-share-royalties-info flex-box">
                                                        <label>Creator</label>
                                                        {invitationType == "none" &&
                                                           <span>{priceDistribution.creator}% </span>
                                                        }
                                                        {invitationType != "none" &&
                                                            <Form.Control
                                                                    type="number"
                                                                    placeholder="0"
                                                                    onChange={(event) => {
                                                                        let priceDetails = {
                                                                            echosystem: 3,
                                                                            curator: 2,
                                                                            creator: event.target.value,
                                                                            promoter: priceDistribution.promoter,
                                                                            scout: priceDistribution.scout,
                                                                        };
                                                                        setPriceDistribution(priceDetails)
                                                                    }}
                                                                    value={priceDistribution.creator}
                                                            />
                                                        }
                                                        <span>Your royalties</span>
                                                    </div>
                                                </div>
                                                {invitationType != "none" &&
                                                    <div className="project-share-royalties-agents">
                                                        <h4>Agents</h4>
                                                        <div className="project-share-royalties-info flex-box">
                                                            <label>Promoter</label>
                                                            <Form.Control
                                                                    type="number"
                                                                    placeholder="0"
                                                                    onChange={(event) => {
                                                                        let priceDetails = {
                                                                            echosystem: 3,
                                                                            curator: 2,
                                                                            creator: priceDistribution.creator,
                                                                            promoter: event.target.value,
                                                                            scout: priceDistribution.scout,
                                                                        };
                                                                        setPriceDistribution(priceDetails)
                                                                    }}
                                                                    value={priceDistribution.promoter}
                                                            />
                                                            <span>Promotes your project</span>
                                                        </div>
                                                        <div className="project-share-royalties-info flex-box">
                                                            <label>Scout</label>
                                                            <Form.Control
                                                                    type="number"
                                                                    placeholder="0"
                                                                    onChange={(event) => {
                                                                        let priceDetails = {
                                                                            echosystem: 3,
                                                                            curator: 2,
                                                                            creator: priceDistribution.creator,
                                                                            promoter: priceDistribution.promoter,
                                                                            scout: event.target.value,
                                                                        };
                                                                        setPriceDistribution(priceDetails)
                                                                    }}
                                                                    value={priceDistribution.scout}
                                                            />
                                                            <span>Organizes, encourages, trains and motivates Promoters</span>
                                                        </div>
                                                    </div>
                                                }

                                                <div className="project-share-royalties-final">
                                                    <h6><label>Total: </label> <span>{getTotalPercentage()}</span></h6>
                                                </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="profile-container-action">
                <Button variant="primary" size="lg" onClick={createStep3}>
                    Next
                </Button>
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
    );
}
