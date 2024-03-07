"use client";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { ForgeContext } from "./context/ForgeContext";
import React from "react";
import { Button } from "react-bootstrap";

// export default function Home() {
//   const forgeContext = React.useContext(ForgeContext);
//   return (
//     <div className="connect-page">
//       {!forgeContext.loading && !forgeContext.connected && (
//         <div className="connect-page-inner">
//           <img
//             src="/images/connect.png"
//             alt="connect-page"
//             key={"connect-page"}
//           />
//           <h2>Connect to Solana</h2>
//           <p>
//             Welcome to the Genesis MMOSH, a decentralized, permissionless and
//             composable world that plays out across many different access devices
//             and software platforms.
//           </p>
//           <p>
//             Connect your Solana Wallet to enter our realm and mint a free
//             Treasure Chest to stash all your loot.
//           </p>
//           <WalletMultiButton>Connect Wallet</WalletMultiButton>
//         </div>
//       )}
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="connect-page">
      <div className="connect-page-inner">
        <p>
          Thank you to everyone who participated in our initial test of the
          MMOSH protocol, Telegram Bot and Web App!
        </p>
        <p>
          The Forge is currently closed as we incorporate input from our
          community
        </p>

        <p>Please check for updates on Twitter and Telegram.</p>

        <p>Let's make money fun!</p>

        <div className="connect-page-buttons">
          <a href="https://twitter.com/MMOSH_Pit" target="_blank">
            <Button variant="primary">
              <p>Follow us on Twitter</p>
            </Button>
          </a>
          <a href="https://t.me/mmoshpit" target="_blank">
            <Button variant="primary">
              <p>Join us on Telegram</p>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
