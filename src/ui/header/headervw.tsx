import {
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WebIcon from '@mui/icons-material/Web';
import HomeIcon from '@mui/icons-material/Home';
import { styled, useTheme } from "@mui/material";


export default function HeaderVW() {
    const location = useLocation()
    const theme = useTheme();
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const connection = useConnection();
    const wallet = useWallet();
    const [open, setOpen] = useState(false);

    const [menuData] = useState([{name: 'Home', link: "https://mmosh.app"}, {name: 'Website', link: "https://mmosh.ai"}])

    useEffect(()=>{
       if(location.pathname == "/" && wallet.publicKey) {
           navigate("/dashboard")
       } else if(location.pathname != "/" && !wallet.publicKey) {
           navigate("/")
       }
    },[wallet.publicKey, location.pathname])

    useEffect(()=>{
      const onScroll = () => setOffset(window.scrollY);
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    },[])

    useEffect(()=>{
        if(wallet.wallet) {
            wallet.connect();
        }
    },[wallet.wallet])


    const handleDrawerOpen = () => {
       setOpen(true);
    };

    const handleDrawerClose = () => {
       setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

      
    return (
    <>
        {wallet.connected &&
            <>
            <div className="header">
            <div className={offset===0 ? 'header-container' : 'header-container active' } >
                <IconButton onClick={handleDrawerOpen} className="menu-button">
                    <MenuIcon />
                </IconButton>
                <h1><Link to="/"><img src="/images/logo.png" alt="Forge MMOSH" /></Link></h1>
                <div className="forge-menu">
                    <ul>
                        {menuData.map((menuDataItem, index) => (
                           <li><a href={menuDataItem.link} target="_blank">{menuDataItem.name}</a></li>
                        ))}
                    </ul>
                </div>
                <div className="connect-action">
                    <div className="connect-action-item">
                        <Button variant="primary" size='lg' className="setting-btn">
                            <span>Coming soon</span>
                            Settings
                        </Button>
                    </div>
                    <div className="connect-action-item">
                        {wallet.publicKey &&
                            <WalletMultiButton />
                        }
                    </div>
                </div>
            </div>
            <div className="banner-container">
                <div className="banner-container-inner">
                    {location.pathname == "/dashboard" && 
                        <div className="banner-container-inner-item">
                            <p>Hey Frank, you’ll need an invitation to mint your Profile and become a MMOSH DAO member</p>
                            <p>You can get an invitation from a current member. <Link to="/profile">Find one in the Membership Directory</Link>.</p>
                            <Button variant="primary" size='lg' onClick={()=>{navigate("/invitation")}}>Link to Bot</Button>
                        </div>
                    }

                    <div className="banner-container-inner-item">
                       <img src={location.pathname == "/dashboard" ? "/images/headerlogo.png" : "/images/headerlogo1.png" }  alt="banner" />
                    </div>
                </div>
               
            </div>
            </div>
            <Drawer
                sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
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
                {menuData.map((menuDataItem, index) => (
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
        }

        {!wallet.connected &&
             <div className="header">
                <div className="guest-header-container header-container">
                    <h1><a href="/"><img src="/images/logo.png" alt="Forge MMOSH" /></a></h1>
                </div>
             </div>
        }
    </>


    );
}


