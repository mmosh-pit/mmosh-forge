"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WebIcon from "@mui/icons-material/Web";
import HomeIcon from "@mui/icons-material/Home";
import { styled, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ForgeContext } from "../context/ForgeContext";
import { Connectivity as UserConn } from "../../anchor/user";
import { web3Consts } from "@/anchor/web3Consts";

export default function HeaderVW() {
  const forgeContext = React.useContext(ForgeContext);
  const theme = useTheme();
  const navigate = useRouter();
  const pathname = usePathname();
  const [offset, setOffset] = useState(0);
  const connection = useConnection();
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [menuData, setMenuData] = useState<any>([]);
  const [mainUrl, setMainUrl] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    const mainUrl: any = process.env.NEXT_PUBLIC_APP_MAIN_URL;
    setMainUrl(mainUrl);
    setMenuData([
      { name: "Home", link: mainUrl },
      { name: "Website", link: "https://mmosh.ai" },
    ]);
  }, []);

  useEffect(() => {
    if (wallet?.publicKey) {
      if (name == "") {
        getProfileInfo();
      }
    } else {
      forgeContext.setLoading(false);
      forgeContext.setConnected(false);
      forgeContext.setUserData({
        _id: "",
        wallet: "",
        username: "",
        bio: "",
        pronouns: "",
        name: "",
        image: "",
        descriptor: "",
        nouns: "",
        seniority: ""
      });
      setName("");
      navigate.push("/");
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    if (pathname == "/" && wallet.publicKey) {
      navigate.push("/dashboard");
    } else if (pathname != "/" && !wallet.publicKey) {
      navigate.push("/");
    }
    setCurrentLocation(pathname);
  }, [pathname]);

  useEffect(() => {
    console.log("forgeContext.userData.name", forgeContext.userData.name);
    setName(forgeContext.userData.name);
  }, [forgeContext.connected]);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (wallet.wallet) {
      wallet.connect();
    }
  }, [wallet.wallet]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const getUserData = async (hasInvitation:any) => {
    setIsLoading(true);
    const result = await axios.get(
      `/api/get-wallet-data?wallet=${wallet?.publicKey}`,
    );
    if (result) {
      if (result.data) {
        if (result.data.profile) {
          let userData = result.data.profile;
          userData.wallet = wallet.publicKey;
          userData._id = result.data._id;
          if(!userData.seniority) {
            userData.seniority = "";
          }
          forgeContext.setUserData(userData);
          forgeContext.setLoading(false);
          forgeContext.setConnected(true);
          if (hasInvitation) {
            navigate.push("/profile");
          } else {
            navigate.push("/dashboard");
          }
          setIsLoading(false);
          return;
        }
      }
    }
    navigate.push("/dashboard");
    forgeContext.setConnected(true);
    setIsLoading(false);
  };

  const capitalizeString = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getProfileInfo = async () => {
    
    try {
      setIsLoading(true);
      const env = new anchor.AnchorProvider(connection.connection, wallet, {
        preflightCommitment: "processed",
      });
      let userConn: UserConn = new UserConn(env, web3Consts.programID);
      const profileInfo = await userConn.getUserInfo();
      if (profileInfo.profiles.length > 0) {
        navigate.push("/invitation");
        forgeContext.setUserData(profileInfo.profiles[0].userinfo)
        forgeContext.setLoading(false);
        forgeContext.setConnected(true);
      } else if (
        profileInfo.activationTokens.length > 0 &&
        profileInfo.profiles.length == 0
      ) {
        getUserData(true);
      } else {
        getUserData(false);
      }
    } catch (error) {
      getUserData(false);
      console.log("error is ", error);
    }
  };

  return (
    <>
      {forgeContext.connected && (
        <>
          <div className="header">
            <div
              className={
                offset === 0 ? "header-container" : "header-container active"
              }
            >
              <IconButton onClick={handleDrawerOpen} className="menu-button">
                <MenuIcon />
              </IconButton>
              <h1>
                <Link href="javascript:void(0)">
                  <img
                    src="/images/logo.png"
                    alt="Forge MMOSH"
                    key={"Forge MMOSH"}
                  />
                </Link>
              </h1>
              <div className="forge-menu">
                <ul>
                  {menuData.map((menuDataItem: any, index: any) => (
                    <li key={index}>
                      <a href={menuDataItem.link} target="_blank">
                        {menuDataItem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="connect-action">
                <div className="connect-action-item">
                  <Button variant="primary" size="lg" className="setting-btn">
                    <span>Coming soon</span>
                    Settings
                  </Button>
                </div>
                <div className="connect-action-item">
                  {wallet.publicKey && <WalletMultiButton />}
                </div>
              </div>
            </div>

            <div className="banner-container">
              <div className="banner-container-inner">
                {name !== "" && currentLocation == "/dashboard" && (
                  <div className="banner-container-inner-item">
                    <p>
                      Hey {capitalizeString(name)}, you’ll need an invitation to
                      mint your Profile and become a MMOSH DAO member
                    </p>
                    <p>
                      You can get an invitation from a current member.{" "}
                      <Link href={mainUrl}>
                        Find one in the Membership Directory
                      </Link>{" "}
                      or ask in our main telegram group for guests
                    </p>
                    <a
                      type="button"
                      href="https://t.me/mmoshpit"
                      target="_blank"
                    >
                      <Button variant="primary" size="lg">
                        Go to Telegram Group
                      </Button>
                    </a>
                  </div>
                )}

                {name === "" && currentLocation == "/dashboard" && (
                  <div className="banner-container-inner-item no-account-banner">
                    <h2>Howdy Stranger</h2>
                    <p>The Forge is only for MMOSH Members and their Guests.</p>
                    <p>
                      Please connect the wallet you used to register, create a
                      new account for this wallet address.
                    </p>
                    <Button variant="primary" size="lg" href={mainUrl}>
                      Create an Account
                    </Button>
                  </div>
                )}

                <div className="banner-container-inner-item">
                  <img
                    src={
                      location.pathname == "/dashboard"
                        ? "/images/headerlogo.png"
                        : "/images/headerlogo1.png"
                    }
                    alt="banner"
                    key={"banner"}
                  />
                </div>
              </div>
            </div>
          </div>
          <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {menuData.map((menuDataItem: any, index: any) => (
                <ListItem key={menuDataItem.name} disablePadding>
                  <ListItemButton href={menuDataItem.link} target="_blank">
                    <ListItemIcon>
                      {index % 2 === 0 ? <HomeIcon /> : <WebIcon />}
                    </ListItemIcon>
                    <ListItemText primary={menuDataItem.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}

      {!forgeContext.connected && (
        <div className="header">
          <div className="guest-header-container header-container">
            <h1>
              <a href="javascript:void(0)">
                <img
                  src="/images/logo.png"
                  alt="Forge MMOSH"
                  key={"Forge MMOSH"}
                />
              </a>
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
