"use client";

import { web3Consts } from "@/anchor/web3Consts";
import { web3 } from "@coral-xyz/anchor";
import { KeyboardArrowDown, Wallet } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function SwapInputVW(props:any) {

    const selectAction = () => {
        if(props.tokenAddress != web3Consts.oposToken) {
            props.onPopupOpen()
        }
    }

    const onValueChange = (event) => {
        props.onSetValue(event.target.value,props.type)
    }

    return (
        <div className="swapinput">
            <div className="swapinput-header">
                <div className="swapinput-header-label">
                    {props.type == "sell" ? "You’re paying" : "To receive" }
                </div>
                {(props.connectionstatus == "connected" && props.tokenAddress !== "") &&
                    <div className="swapinput-header-token">
                        <Wallet /> <span>{props.balance} {props.symbol}</span>
                    </div>
                }
            </div>
            <div className={props.type == "sell" ? "swapinput-box": "swapinput-box target"}>
               <div className={props.tokenAddress !="" ? "swapinput-left" : "swapinput-left no-image"} onClick={selectAction}>
                  {props.tokenAddress !="" &&
                      <img src={props.image} alt="coins"/>
                  }
              
                  {props.symbol}
                  {props.tokenAddress != web3Consts.oposToken &&
                        <div className="swapinput-left-icon">
                        <KeyboardArrowDown />
                        </div>
                  }

               </div>
               <div className="swapinput-box-input">
                    <Form.Control
                        type="number"
                        placeholder="0.00"
                        onChange={(event) => {onValueChange(event)}}
                        value={props.value > 0 ? props.value : ""}
                        disabled={props.tokenAddress==="" || props.type !== "sell"}
                    />
               </div>
            </div>
        </div>
    )
}