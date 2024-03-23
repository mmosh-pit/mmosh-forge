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

const WalletConnector = ({ children }: { children: React.ReactNode }) => {
  const solNetwork = Config.rpcURL;
  const endpoint = useMemo(() => solNetwork, [solNetwork]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
      new TorusWalletAdapter(),
    ],
    [solNetwork],
  );

  return (
    <ForgeProvider>
      <ConnectionProvider endpoint={endpoint} config={{confirmTransactionInitialTimeout:120000}}>
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
