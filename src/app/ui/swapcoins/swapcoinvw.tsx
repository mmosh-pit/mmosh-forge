"use client";

import { KeyboardArrowDown, OpenInNew, Wallet } from "@mui/icons-material";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function SwapCoinVW(props:any) {

  const openLink = () => {
    window.open("https://solscan.io/account/"+props.address+"?cluster=devnet", '_blank', 'noopener,noreferrer');
  }

  const chooseToken = () => {
    props.onTokenSelect({
      name: props.name,
      symbol: props.symbol,
      token: props.address,
      bonding: props.bonding,
      image: props.image
    },"list")
  }
  return (
      <div className="swap-page-coin-item" onClick={chooseToken}>
        <div className="swap-page-coin-item-left">
          <img src={props.image} alt="swap" />
        </div>
        <div className="swap-page-coin-item-right">
          <h4><span className="list-title">{props.symbol}</span>
          <div className="swap-page-coin-item-address" onClick={openLink}>
              <span>{props.address.substring(0,4)}...{props.address.substring(props.address.length - 4, props.address.length)} </span><OpenInNew />
          </div>
          </h4>
          <p>{props.name}</p>
        </div>
     </div>
  )
}