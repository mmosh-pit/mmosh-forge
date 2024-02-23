"use client";
import Config from "../../anchor/web3Config.json";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import HeaderVW from "./headervw";
import { ForgeProvider } from "../context/ForgeContext";

const WalletConnector = ({ children }: { children: React.ReactNode }) => {
  const solNetwork = Config.rpcURL;
  const endpoint = useMemo(() => solNetwork, [solNetwork]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [solNetwork]);

  return (
    <ForgeProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <div className="root-container">
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
