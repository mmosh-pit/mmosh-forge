"use client";
import Config from "../../anchor/web3Config.json";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import HeaderVW from "./headervw";
import { ForgeProvider } from "../context/ForgeContext";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { usePathname } from "next/navigation";

const WalletConnector = ({ children }: { children: React.ReactNode }) => {
  const solNetwork = Config.rpcURL;
  const endpoint = useMemo(() => solNetwork, [solNetwork]);
  const pathname = usePathname()

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({network: WalletAdapterNetwork.Devnet }),
      new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet}),
      new TorusWalletAdapter(),
    ],
    [solNetwork],
  );

  const isProjectPages = () => {
    if(pathname == "/project/step1" || pathname == "/project/step2" || pathname == "/project/step3" || pathname == "/project/step4") {
      return false
    }
    if(pathname.substring(0,8) == "/project") {
      return true
    }
    return false
  }

  return (
    <ForgeProvider>
      <ConnectionProvider endpoint={endpoint} config={{confirmTransactionInitialTimeout:120000}}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <div className={isProjectPages ? "project-root-container root-container" : "root-container"}>
              <HeaderVW />
              <div className="content-container">{children}</div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ForgeProvider>
  );
};

export default WalletConnector;
