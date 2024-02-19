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
  const [solBalance, setSolBalance] = useState(0);
  const [tokBalance, setTokBalance] = useState(0);
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
    const fullname = forgeContext.userData.name.split(" ");
    setUserName(forgeContext.userData.username);
    setDesc(forgeContext.userData.bio);
    setGender(forgeContext.userData.pronouns);
    setFirstName(fullname[0]);
    setLastName(fullname[1]);

    const response = await fetch(forgeContext.userData.image);
    const data = await response.blob();
    const metadata = {
      type: "image/jpeg",
    };
    const file = new File(
      [data],
      `${forgeContext.userData.username}-${new Date()}.jpg`,
      metadata,
    );

    setImageFile([
      {
        preview: URL.createObjectURL(file),
        file: file,
      },
    ]);
    setIsLoading(false);
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
    }, 4000);
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
        "Hey! We checked your wallet and you don’t have enough SOL for the gas fees. Get some Solana and try again!",
        "warning-container",
      );
      return false;
    }

    if (tokBalance < 20000) {
      createMessage(
        "Hey! We checked your wallet and you don’t have enough MMOSH to mint. Get some MMOSH here and try again!",
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
    if (lastName.length == 0) {
      createMessage("Last name is required", "danger-container");
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
    const genesisProfile = web3Consts.genesisProfile;
    const activationToken = new anchor.web3.PublicKey(subToken);
    const commonLut = web3Consts.commonLut;
    const env = new anchor.AnchorProvider(connection.connection, wallet, {
      preflightCommitment: "processed",
    });

    const body = {
      name: firstName + " " + lastName,
      symbol: userName,
      description: desc,
      image: "",
      enternal_url: process.env.NEXT_PUBLIC_MAIN_APP_URL + "/" + userName,
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
      ],
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
        name: forgeContext.userData.name,
        symbol: forgeContext.userData.username.substring(0, 5).toUpperCase(),
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
          name: firstName + " " + lastName,
          image: body.image,
          descriptor: descriptor,
          nouns: descriptor,
        };
        await updateUserData(params);
        params.wallet = wallet.publickey;
        params._id = forgeContext.userData._id;
        forgeContext.setUserData(params);
        navigate.push("/invitation");
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
    }
  };

  const closeImageAction = () => {
    setImageFile([]);
  };

  return (
    <div className="profile-page container">
      {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
      )}
      <h2>Welcome to the Forge, {forgeContext.userData.name}!</h2>
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
              disabled
            />
            <span>15 characters</span>
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
              rows={13}
              placeholder="Tell us about yourself in up to 160 characters."
              onChange={(event) => setDesc(event.target.value)}
              value={desc}
            />
          </div>
          <div className="profile-container-element">
            <label>Superhero Identity</label>
            <div className="profile-container-element-group">
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
