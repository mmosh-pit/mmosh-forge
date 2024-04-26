"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import Select from 'react-dropdown-select';
import { ArrowBackIos, CheckBox, CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { topics } from "@/app/data/topics";

export default function ProjectStepTwo() {
    const navigate = useRouter();
    const [options, setOptions] = useState(topics)
    const [values,setValues] = useState([])

    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");

    useEffect(()=>{
       setValues(localStorage.getItem("step2") ? JSON.parse(localStorage.getItem("step2")) : [])
    },[])

    const createStep2 = async () => {
         if(values.length>8) {
            createMessage("Please pick only 8 topics", "danger-container");
            return;
         }
         localStorage.setItem("step2",JSON.stringify(values));
         navigate.push("/community/create/step3");
    }

    const createMessage = (message: any, type: any) => {
        window.scrollTo(0, 0);
        setMsgText(message);
        setMsgClass(type);
        setShowMsg(true);
        if(type == "success-container") {
          setTimeout(() => {
            setShowMsg(false);
          }, 4000);
        } else {
          setTimeout(() => {
            setShowMsg(false);
          }, 4000);
        }
    
      };


  return (
    <div className="invitation-page create-coin-page project-step-page">

    {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
    )}

       <div className="create-coin-page-header">
        <h2>Step 2</h2> 
        <h3>Select the Topics and Interest</h3> 
        <p className="heading">Select up to 8 topics and interests associate with your community.</p>
        <div className="backAction" onClick={()=>{navigate.back()}}>
           <ArrowBackIos /><span>Back</span>
        </div>
       </div>

       <div className="container">
           <div className="row justify-content-md-center">
              <div className="col-xl-5">
                 <div className="create-coin-container">
                    <div className="profile-container-element">
                            <label>Topics and Interests</label>
                            <Select
                            multi
                            dropdownGap={0}
                            options={options}
                            values={values}
                            onChange={(value) => setValues(value)}
                            itemRenderer={({ item, methods }) => (
                                <div className="custom-select-item" onClick={()=>{
                                    if(item.type != "header") {
                                        methods.addItem(item)
                                    }
                                }}>
                                    {item.type !== "header" &&
                                        <div className="custom-select-left">
                                            {methods.isSelected(item) &&
                                               <CheckBox />
                                            }
                                            {!methods.isSelected(item) &&
                                               <CheckBoxOutlineBlank />
                                            }
                                        </div>
                                    }
                                    <div className={item.type === "header" ?  "custom-select-right heading" : "custom-select-right"}>
                                        {item.label}
                                    </div>
                                </div>
                            )}
                            />
                    </div>
                </div>
              </div>

           </div>
       </div>


       
       <div className="profile-container-action">
            <Button variant="primary" size="lg" onClick={createStep2}>
                Next
            </Button>
       </div>

    </div>
  );
}
