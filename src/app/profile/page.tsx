"use client";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { web3Consts } from "../../anchor/web3Consts";
import { Connectivity as UserConn } from "../../anchor/user";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ForgeContext } from "../context/ForgeContext";
import { pinFileToShadowDrive } from "../lib/pinFileToShadowDrive";
import { pinImageToShadowDrive } from "../lib/pinImageToShadowDrive";

export default function Profile() {
  const forgeContext = React.useContext(ForgeContext);
  const navigate = useRouter();
  const [doesUsernameExists, setDoesUsernameExists] = useState(false);
  const [solBalance, setSolBalance] = useState(0);
  const [tokBalance, setTokBalance] = useState(0);
  const [generation, setGeneration] = useState("0");
  const [profileLineage, setProfileLineage] = useState({
    promoter: "",
    scout: "",
    recruiter: "",
    originator: "",
  });
  const connection = useConnection();
  const wallet: any = useAnchorWallet();
  const [msgClass, setMsgClass] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("he/him");
  const [desc, setDesc] = useState("");
  const [descriptor, setDescriptor] = useState("");
  const [nouns, setNouns] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [gensis, setGensis] = useState("");
  const [subToken, setSubToken] = useState("");

  useEffect(() => {
    if (wallet?.publicKey) {
      const env = new anchor.AnchorProvider(connection.connection, wallet, {
        preflightCommitment: "processed",
      });
      anchor.setProvider(env);
      getProfileInfo();
      fillFormData();
    }
  }, [wallet?.publicKey]);

  const fillFormData = async () => {
    try {
      const fullname = forgeContext.userData.name.split(" ");
      setUserName(forgeContext.userData.username);
      setDesc(forgeContext.userData.bio);
      setGender(forgeContext.userData.pronouns);

      setFirstName(fullname[0]);
      if(fullname.length>1) {
        setLastName(fullname[1]);
      }

      setImageFile([
        {
          preview: forgeContext.userData.image,
          file: null,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setImageFile([]);
      setIsLoading(false);
    }
  };

  const getTotalMints = async () => {
    try {
      const result = await axios.get(`/api/get-option?name=totalmints`);
      return result.data != "" ? parseInt(result.data) : 0;
    } catch (error) {
      return 0
    }
  };

  const updateTotalMints = async (totalMints:any) => {
    try {
      await axios.post("/api/set-option", {
        name: "totalmints",
        value: totalMints
      });
    } catch (error) {
      console.log("error updating total mints ", error)
    }
  };
  

  const updateUserData = async (params: any) => {
    await axios.put("/api/update-wallet-data", {
      field: "profile",
      value: params,
      wallet: wallet.publicKey,
    });
  };

  const createMessage = (message: any, type: any) => {
    window.scrollTo(0, 0);
    setMsgText(message);
    setMsgClass(type);
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 5000);
  };

  const validateFields = () => {
    if (subToken == "") {
      createMessage("Invalid activation token", "danger-container");
      return false;
    }

    if (gensis == "") {
      createMessage("Invalid gensis token", "danger-container");
      return false;
    }

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

    if (tokBalance < 20000) {
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
      return false;
    }
    if (imageFile.length == 0) {
      createMessage("image file is required", "danger-container");
      return false;
    }
    if (firstName.length == 0) {
      createMessage("First name is required", "danger-container");
      return false;
    }

    if (userName.length == 0) {
      createMessage("Username is required", "danger-container");
      return false;
    }

    return true;
  };

  const createNewProfile = async () => {
    if (!validateFields()) {
      return;
    }
    setIsSubmit(true);
    const seniority = await getTotalMints() + 1;
    const genesisProfile = web3Consts.genesisProfile;
    const activationToken = new anchor.web3.PublicKey(subToken);
    const commonLut = web3Consts.commonLut;
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });

    let fullname = firstName;
    if(lastName.length > 0) {
      fullname = fullname + " " + lastName;
    }

    const body = {
      name: fullname,
      symbol: userName,
      description: desc,
      image: "",
      enternal_url: process.env.NEXT_PUBLIC_APP_MAIN_URL + "/" + userName,
      family: "MMOSH Pit",
      collection: "Moral Panic",
      attributes: [
        {
          trait_type: "Primitive",
          value: "Profile",
        },
        {
          trait_type: "MMOSH",
          value: "Moral Panic",
        },
        {
          trait_type: "Gen",
          value: generation,
        },
        {
          trait_type: "Seniority",
          value: seniority,
        },
        {
          trait_type: "Full Name",
          value: fullname,
        },
        {
          trait_type: "Username",
          value: userName,
        },
        {
          trait_type: "Adjective",
          value: descriptor,
        },
        {
          trait_type: "Noun",
          value: nouns,
        },
        {
          trait_type: "Pronoun",
          value: gender,
        },
      ],
    };

    // get promoter name
    if (profileLineage.promoter.length > 0) {
      let promoter: any = await getUserName(profileLineage.promoter);
      if (promoter != "") {
        body.attributes.push({
          trait_type: "Promoter",
          value: promoter,
        });
      } else {
        body.attributes.push({
          trait_type: "Promoter",
          value: profileLineage.promoter,
        });
      }
    } 

    // get scout name
    if (profileLineage.scout.length > 0) {
      let scout: any = await getUserName(profileLineage.scout);
      if (scout != "") {
        body.attributes.push({
          trait_type: "Scout",
          value: scout,
        });
      } else {
        body.attributes.push({
          trait_type: "Scout",
          value: profileLineage.scout,
        });
      }
    } 

    // get recruiter name
    if (profileLineage.recruiter.length > 0) {
      let recruiter: any = await getUserName(profileLineage.recruiter);
      if (recruiter != "") {
        body.attributes.push({
          trait_type: "Recruiter",
          value: recruiter,
        });
      } else {
        body.attributes.push({
          trait_type: "Recruiter",
          value: profileLineage.recruiter,
        });
      }
    } 

    // get originator name
    if (profileLineage.originator.length > 0) {
      let originator: any = await getUserName(profileLineage.originator);
      if (originator != "") {
        body.attributes.push({
          trait_type: "Originator",
          value: originator,
        });
      } else {
        body.attributes.push({
          trait_type: "Originator",
          value: profileLineage.originator,
        });
      }
    }

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

    const shadowHash: any = await pinFileToShadowDrive(body);
    if (shadowHash === "") {
      setIsSubmit(false);
      createMessage(
        "We’re sorry, there was an error while trying to prepare meta url. please try again later.",
        "danger-container",
      );
      return;
    }
    try {
      let userConn: UserConn = new UserConn(env, web3Consts.programID);
      const res = await userConn.mintProfileByActivationToken({
        name: userName.substring(0, 15),
        symbol: userName.substring(0, 5).toUpperCase(),
        uriHash: shadowHash,
        activationToken,
        genesisProfile,
        commonLut,
      });

      if (res.Ok) {
        let params: any = {
          username: userName,
          bio: desc,
          pronouns: gender,
          name: fullname,
          image: body.image,
          descriptor: descriptor,
          nouns: nouns,
          seniority: seniority
        };
        await updateUserData(params);
        await updateTotalMints(seniority);
        params.wallet = wallet.publickey;
        params._id = forgeContext.userData._id;
        forgeContext.setUserData(params);
        createMessage(
          "Congrats! Your profile has been minted, granting you full membership in MMOSH DAO.",
          "success-container",
        );
        setTimeout(() => {
          navigate.push("/invitation");
        }, 4000);
      } else {
        createMessage(
          "We’re sorry, there was an error while trying to mint your profile. Check your wallet and try again.",
          "danger-container",
        );
      }
      setIsSubmit(false);
    } catch (error) {
      createMessage(error, "danger-container");
      setIsSubmit(false);
    }
  };

  const getUserName = async (pubKey: any) => {
    try {
      const result = await axios.get(`/api/get-wallet-data?wallet=${pubKey}`);
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

  const getProfileInfo = async () => {
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });
    let userConn: UserConn = new UserConn(env, web3Consts.programID);

    const profileInfo = await userConn.getUserInfo();
    setSolBalance(profileInfo.solBalance);
    setTokBalance(profileInfo.oposTokenBalance);
    if (profileInfo.activationTokens.length > 0) {
      setGensis(profileInfo.activationTokens[0].genesis);
      setSubToken(profileInfo.activationTokens[0].activation);
      setGeneration(profileInfo.generation);
      setProfileLineage(profileInfo.profilelineage);
    }
  };

  const closeImageAction = () => {
    setImageFile([]);
  };

  const checkForUsername = React.useCallback(async () => {
    if (userName === forgeContext.userData.username) {
      setDoesUsernameExists(false);
      return;
    }

    const result = await axios.get(`/api/check-username?username=${userName}`);

    if (result.data) {
      setDoesUsernameExists(true);
      return;
    }

    setDoesUsernameExists(false);
  }, [userName]);

  return (
    <div className="profile-page">
      {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
      )}
      <h2>Welcome to the Forge, {forgeContext.userData.name}!</h2>
      <div className="container">
        <h3>About You</h3>
        <div className="profile-container">
          <div className="profile-container-item">
            <div className="profile-container-element">
              <label>Avatar*</label>
              {imageFile.length == 0 && (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <img src="/images/upload.png" key={"Forge Upload"} />
                </div>
              )}
              {imageFile.length > 0 && (
                <div className="preview-container">
                  <Button
                    variant="link"
                    onClick={closeImageAction}
                    className="image-close-btn"
                  >
                    Close
                  </Button>
                  <img src={imageFile[0].preview} key={"Preview"} />
                </div>
              )}
            </div>
          </div>
          <div className="profile-container-item">
            <div className="profile-container-element">
              <label>First Name or Alias*</label>
              <Form.Control
                type="text"
                placeholder="Enter First Name or Alias"
                maxLength={50}
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
              <span>Up to 50 characters, can have spaces.</span>
            </div>
            <div className="profile-container-element">
              <label>Last Name</label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                maxLength={15}
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
              <span>15 characters</span>
            </div>
            <div className="profile-container-element">
              <label>Username*</label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                maxLength={15}
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
                onBlur={checkForUsername}
              />
              {doesUsernameExists ? (
                <span className="text-danger">Username already exists!</span>
              ) : (
                <span>15 characters</span>
              )}
            </div>
            <div className="profile-container-element">
              <label>Pronouns*</label>
              <Form.Select
                onChange={(event) => setGender(event.target.value)}
                value={gender}
              >
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
              <Form.Control
                as="textarea"
                rows={12}
                placeholder="Tell us about yourself in up to 160 characters."
                onChange={(event) => setDesc(event.target.value)}
                value={desc}
              />
            </div>
            <div className="profile-container-element">
              <label>Superhero Identity</label>
              <span>Example: Frank the Amazing Elf</span>
              <div className="profile-container-element-group">
                <p className="profile-container-element-group-start-item">
                  The
                </p>
                <div className="profile-container-element-group-item">
                  <div className="profile-container-element-group-item-left">
                    <Form.Control
                      type="text"
                      placeholder="Descriptor"
                      onChange={(event) => setDescriptor(event.target.value)}
                      value={descriptor}
                    />
                    <span>Example: Amazing</span>
                  </div>
                </div>
                <div className="profile-container-element-group-item">
                  <div className="profile-container-element-group-item-right">
                    <Form.Control
                      type="text"
                      placeholder="Noun"
                      onChange={(event) => setNouns(event.target.value)}
                      value={nouns}
                    />
                    <span>Example: Elf</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="profile-container-action">
          {isSubmit && (
            <Button variant="primary" size="lg">
              Minting Your Profile...
            </Button>
          )}
          {!isSubmit && (
            <Button variant="primary" size="lg" onClick={createNewProfile}>
              Mint Your Profile
            </Button>
          )}
          <div className="price-details">
            <p>Price: 20000 MMOSH</p>
            <label>plus a small amount of SOL for gas fees</label>
          </div>
          <div className="balance-details">
            <p>Current Balance: {tokBalance} MMOSH</p>
            <p>Current Balance: {solBalance} SOL</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="profile-container-action">
          <Button variant="primary" size="lg">
            Loading Profile...
          </Button>
        </div>
      )}
    </div>
  );
}
