"use client";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { web3Consts } from "../../anchor/web3Consts";
import { Connectivity as UserConn } from "../../anchor/user";
import axios from "axios";
import { Connectivity as AdConn } from "../../anchor/admin";
import { v4 as uuidv4 } from "uuid";
import bs58 from "bs58";
import { ShdwDrive } from "@shadow-drive/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ForgeContext } from "../context/ForgeContext";
import Config from "./../../anchor/web3Config.json";

export default function Invitation() {
  const forgeContext = React.useContext(ForgeContext);
  const [solBalance, setSolBalance] = useState(0);
  const [tokBalance, setTokBalance] = useState(0);
  const [actBalance, setActBalance] = useState(0);
  const [quota, setQuota] = useState(0);
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [buttonText, setButtonText] = useState("Mint");
  const [msgClass, setMsgClass] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");
  const connection = useConnection();
  const wallet: any = useAnchorWallet();
  const [inputValue, setInputValue] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [generation, setGeneration] = useState("0");
  const [profileLineage, setProfileLineage] = useState({
    promoter: "",
    scout: "",
    recruiter: "",
    originator: "",
  });

  useEffect(() => {
    if (wallet?.publicKey) {
      const env = new anchor.AnchorProvider(connection.connection, wallet, {
        preflightCommitment: "processed",
      });
      anchor.setProvider(env);
      getProfileInfo();
    }
  }, [wallet?.publicKey]);

  useEffect(() => {
    setInputValue(quota - actBalance);
  }, [quota, actBalance]);

  const getProfileInfo = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    let userConn: UserConn = new UserConn(env, web3Consts.programID);

    const profileInfo = await userConn.getUserInfo();

    setName(profileInfo.profiles[0].userinfo.username);
    setProfile(profileInfo.profiles[0].address);
    setSolBalance(profileInfo.solBalance);
    setTokBalance(profileInfo.oposTokenBalance);
    setActBalance(parseInt(profileInfo.activationTokenBalance) + profileInfo.totalChild);
    setProfileLineage(profileInfo.profilelineage);
    setGeneration(profileInfo.generation);
    const totalMints = profileInfo.totalChild;
    if (profileInfo.activationTokens.length > 0) {
      if(profileInfo.activationTokens[0].activation != "") {
          setFirstTime(false);
      }
    }
    const totalChilds = totalMints;
    if (totalChilds < 3) {
      setQuota(10);
    } else if (totalChilds >= 3 && totalChilds < 7) {
      setQuota(25);
    } else if (totalChilds >= 7 && totalChilds < 15) {
      setQuota(50);
    } else if (totalChilds >= 15 && totalChilds < 35) {
      setQuota(250);
    } else if (totalChilds >= 35 && totalChilds < 75) {
      setQuota(500);
    } else {
      setQuota(1000);
    }
  };

  const capitalizeString = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const createSubscriptionInvitation = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    anchor.setProvider(env);
    let userConn: UserConn = new UserConn(env, web3Consts.programID);

    let isSuccess = false;
    if (firstTime) {
      let attributes = [];
      // get promoter name
      if (profileLineage.promoter.length > 0) {
        let promoter: any = await getUserName(profileLineage.promoter);
        if (promoter != "") {
          attributes.push({
            trait_type: "Promoter",
            value: promoter,
          });
        } else {
          attributes.push({
            trait_type: "Promoter",
            value: profileLineage.promoter,
          });
        }
      }

      // get scout name
      if (profileLineage.scout.length > 0) {
        let scout: any = await getUserName(profileLineage.scout);
        if (scout != "") {
          attributes.push({
            trait_type: "Scout",
            value: scout,
          });
        } else {
          attributes.push({
            trait_type: "Scout",
            value: profileLineage.scout,
          });
        }
      }

      // get recruiter name
      if (profileLineage.recruiter.length > 0) {
        let recruiter: any = await getUserName(profileLineage.recruiter);
        if (recruiter != "") {
          attributes.push({
            trait_type: "Recruiter",
            value: recruiter,
          });
        } else {
          attributes.push({
            trait_type: "Recruiter",
            value: profileLineage.recruiter,
          });
        }
      }

      // get originator name
      if (profileLineage.originator.length > 0) {
        let originator: any = await getUserName(profileLineage.originator);
        if (originator != "") {
          attributes.push({
            trait_type: "Originator",
            value: originator,
          });
        } else {
          attributes.push({
            trait_type: "Originator",
            value: profileLineage.originator,
          });
        }
      }

      attributes.push({
        trait_type: "MMOSH",
        value: "Charlie the Cybernatural Owl #0",
      });

      attributes.push({
        trait_type: "Gen",
        value: generation,
      });

      attributes.push({
        trait_type: "Seniority",
        value: forgeContext.userData.seniority,
      });

      let desc =
        "Cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.";
      if (name != "") {
        desc =
          capitalizeString(name) +
          " cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.";
      }

      const body = {
        name: name != "" ? "Invitation from " + name : "Invitation",
        symbol: "INVITE",
        description: desc,
        image:
          "https://shdw-drive.genesysgo.net/FuBjTTmQuqM7pGR2gFsaiBxDmdj8ExP5fzNwnZyE2PgC/invite.png",
        external_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
        minter: name,
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

      const symbol = "INVITE";
      const uri = shdwHash;
      const res: any = await userConn.initSubscriptionBadge({
        name: "Invitation",
        symbol,
        uri,
        profile: profile,
      });
      const res1 = await userConn.mintSubscriptionToken({
        amount: inputValue,
        subscriptionToken: res.Ok.info.subscriptionToken,
      });
      if (res1.Ok) {
        isSuccess = true;
      }
    } else {
      const res = await userConn.initSubscriptionBadge({
        name: "Invitation",
        profile: profile,
      });
      const res1 = await userConn.mintSubscriptionToken({
        amount: inputValue,
        subscriptionToken: res.Ok.info.subscriptionToken,
      });
      if (res1.Ok) {
        isSuccess = true;
      }
    }
    if (isSuccess) {
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

    setButtonText("Mint");
    getProfileInfo();
  };

  const getUserName = async (pubKey: any) => {
    try {
      const result = await axios.get(`/api/get-wallet-data?wallet=${pubKey}`);
      console.log("userdata ", result);
      let hasProfile = false;
      if (result) {
        if (result.data) {
          if (result.data.profile) {
            return result.data.profile.name;
          }
        }
      }
      return "";
    } catch (error) {
      return "";
    }
  };

  const createGensisInvitation = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    anchor.setProvider(env);
    let userConn: AdConn = new AdConn(env, web3Consts.programID);

    let isSuccess = false;
    if (firstTime) {
      let desc =
        "Cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.";
      if (name != "") {
        desc =
          capitalizeString(name) +
          " cordially invites you to join on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.";
      }
      const body = {
        name: name != "" ? "Invitation from " + name : "Invitation",
        symbol: "INVITE",
        description: desc,
        image:
          "https://shdw-drive.genesysgo.net/FuBjTTmQuqM7pGR2gFsaiBxDmdj8ExP5fzNwnZyE2PgC/invite.png",
        external_url: process.env.NEXT_PUBLIC_APP_MAIN_URL,
        minter: name,
      };
      const shdwHash: any = await pinFileToShadowDrive(body);

      if (shdwHash === "") {
        createMessage(
          "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
          "danger-container",
        );
        return;
      }

      const symbol = "INVITE";
      const uri = shdwHash;
      const res: any = await userConn.initActivationToken({
        name: "Invitation",
        symbol,
        uri,
      });
      console.log("res ", res);
      const res1 = await userConn.mintActivationToken(
        inputValue,
        wallet.publicKey,
      );
      if (res1.Ok) {
        isSuccess = true;
      }
    } else {
      const res1 = await userConn.mintActivationToken(
        inputValue,
        wallet.publicKey,
      );
      if (res1.Ok) {
        isSuccess = true;
      }
    }
    if (isSuccess) {
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

    setButtonText("Mint");
    getProfileInfo();
  };

  const calcNonDecimalValue = (value: number, decimals: number) => {
    return Math.trunc(value * Math.pow(10, decimals));
  };

  const transferAction = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    anchor.setProvider(env);
    // let userConn: AdConn = new AdConn(env, web3Consts.programID);
    let userConn: UserConn = new UserConn(env, web3Consts.programID);
    const symbol = "INVITE";
    const uri = "";
    // const res: any = await userConn.initActivationToken({
    //   name: "Invitation from " + name,
    //   symbol,
    //   uri,
    // });
    const res: any = await userConn.initSubscriptionBadge({
      name: "Invitation from " + name,
      symbol,
      uri,
      profile: profile,
    });

    // transfer activation token
    await userConn.baseSpl.transfer_token(
      {
        mint: new anchor.web3.PublicKey(res.Ok.info.subscriptionToken),
        sender: wallet.publicKey,
        receiver: new anchor.web3.PublicKey(
          "HMvvRsoHAjCcCK6YUckdTezaxgZ9QBJApK1hY6NLfZA4",
        ),
        init_if_needed: true,
      },
      userConn.ixCallBack,
    );
    const tx = await new anchor.web3.Transaction().add(...userConn.txis);
    userConn.txis = [];
    const res2 = await userConn.provider.sendAndConfirm(tx);

    await userConn.baseSpl.transfer_token(
      {
        mint: web3Consts.oposToken,
        sender: wallet.publicKey,
        receiver: new anchor.web3.PublicKey(
          "HMvvRsoHAjCcCK6YUckdTezaxgZ9QBJApK1hY6NLfZA4",
        ),
        init_if_needed: true,
        amount: calcNonDecimalValue(20380, 9),
      },
      userConn.ixCallBack,
    );
    const tx1 = await new anchor.web3.Transaction().add(...userConn.txis);
    userConn.txis = [];
    const res3 = await userConn.provider.sendAndConfirm(tx1);

    // transfer mmosh token
    // await userConn.baseSpl.transfer_token(
    //   {
    //     mint: web3Consts.oposToken,
    //     sender: wallet.publicKey,
    //     receiver: new anchor.web3.PublicKey(
    //       "8mPADLUyDdqEsDQdFteynUA9zW5eQLZztjvaDHhgeBNi",
    //     ),
    //     init_if_needed: true,
    //     amount: calcNonDecimalValue(200000, 9),
    //   },
    //   userConn.ixCallBack,
    // );
    // const tx2 = await new anchor.web3.Transaction().add(...userConn.txis);
    // userConn.txis = [];
    // const res4 = await userConn.provider.sendAndConfirm(tx2);

    // transfer mmosh token
    // await userConn.baseSpl.transfer_token(
    //   {
    //     mint: web3Consts.oposToken,
    //     sender: wallet.publicKey,
    //     receiver: new anchor.web3.PublicKey(
    //       "HMvvRsoHAjCcCK6YUckdTezaxgZ9QBJApK1hY6NLfZA4",
    //     ),
    //     init_if_needed: true,
    //     amount: calcNonDecimalValue(200000, 9),
    //   },
    //   userConn.ixCallBack,
    // );
    // const tx3 = await new anchor.web3.Transaction().add(...userConn.txis);
    // const res5 = await userConn.provider.sendAndConfirm(tx3);
    userConn.txis = [];
  };

  const mintInvitationAction = () => {
    if (solBalance == 0) {
      createMessage(
        "Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!",
        "warning-container",
      );
      return;
    }

    if (tokBalance == 0) {
      createMessage(
        "Hey! We checked your wallet and you don’t have enough MMOSH to mint. Get some MMOSH here and try again!",
        "warning-container",
      );
      return;
    }
    if (quota <= actBalance) {
      createMessage(
        "Hey! You don’t have any more invitations available in your quota. Please come back when it’s refreshed.",
        "warning-container",
      );
      return;
    }

    if (inputValue > quota - actBalance) {
      createMessage(
        "Hey! You don’t have any more invitations available in your quota. Please come back when it’s refreshed.",
        "warning-container",
      );
      return;
    }
    setButtonText("Minting...");
    if (profile == web3Consts.genesisProfile.toBase58()) {
      createGensisInvitation();
    } else {
      createSubscriptionInvitation();
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

  const onAmountChange = (event: any) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
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

  return (
    <div className="invitation-page">
      {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
      )}
      {name === "" && <h2>Welcome to the Forge</h2>}

      {name !== "" && <h2>Welcome to the Forge, {capitalizeString(name)}!</h2>}

      <div className="invitation-page-inner">
        <div className="invitation-page-inner-image">
          <img src="/images/invite.png" key={"Invite"} />
        </div>
        <div className="invitation-page-inner-content">
          {name != "" && <h3>Invitation from {capitalizeString(name)}</h3>}

          {name == "" && <h3>Invitation</h3>}

          {name != "" && (
            <p>
              {capitalizeString(name)} cordially invites you to join him on
              Moral Panic, the Genesis MMOSH. The favor of a reply is requested.
            </p>
          )}

          {name == "" && (
            <p>
              Cordially invites you to join him on Moral Panic, the Genesis
              MMOSH. The favor of a reply is requested.
            </p>
          )}

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
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={inputValue}
                  onChange={onAmountChange}
                />
              </div>
              {inputValue > 0 && <p>Price: {inputValue} $MMOSH</p>}

              {inputValue == 0 && <p>Price: 0 $MMOSH</p>}

              <p className="small">Plus at least 0.03 SOL in fees. Note: this amount will be reduced when the protocol is optimized. Sorry for the temporary inconvenience.</p>
              <p>Current Balance: {tokBalance} MMOSH</p>
              <p>Current Balance: {solBalance} SOL</p>
            </div>
          </div>
          <div className="invitation-action-container">
            {buttonText === "Mint" &&
              <Button variant="primary" size="sm" onClick={mintInvitationAction}>
                {buttonText}
              </Button>
            }

            {buttonText !== "Mint" &&
              <Button variant="primary" size="sm">
                {buttonText}
              </Button>
            }
            {/* <Button variant="primary" size="sm" onClick={transferAction}>Tranfer</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
