import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import router from "./routes/router";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from "react";
import Layout from "./components/layout/layout";
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
    ],
    [solNetwork]
  );
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Router>
            <Layout>
            <Routes>
              {router.map(item => (
                  <Route path={item.path} element={item.element} />
              ))}
            </Routes>

            </Layout>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
