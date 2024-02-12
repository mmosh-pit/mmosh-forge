"use client";
import Button from 'react-bootstrap/Button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export default function Home() {
    return (
      <div className='connect-page'>
        <div className='connect-page-inner'>
          <img src='/images/connect.png' alt='connect-page' />
          <h2>Connect to Solana</h2>
          <p>Welcome to the Genesis MMOSH, a decentralized, permissionless and composable world that plays out across many different access devices and software platforms.</p>
          <p>Connect your Solana Wallet to enter our realm and mint a free Treasure Chest to stash all your loot.</p>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </div>

      </div>
    );
}
