"use client";
import { InsertPhoto } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import { pinImageToShadowDrive } from "../../../lib/pinImageToShadowDrive";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function ProjectStepOne() {
    const navigate = useRouter();

    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState("");
    const [msgText, setMsgText] = useState("");
    
    const [imageFile, setImageFile] = useState<any>([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
          "image/*": [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
          setImageFile(
            acceptedFiles.map((file) =>
              Object.assign(imageFile, {
                preview: URL.createObjectURL(file),
                file: file,
              }),
            ),
          );
        },
    });

    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [desc, setDesc] = useState("")
    const [buttonStatus, setButtonStatus] = useState("Next")
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(()=>{
      if(localStorage.getItem("step1")) {
        let body = JSON.parse(localStorage.getItem("step1"));
        setName(body.name);
        setSymbol(body.symbol);
        setDesc(body.description);
        setImageFile([
          {
            preview: body.image,
            file: null,
          },
      ]);
      }
    },[])


   const createStep1 = async () => {
      if (!validateFields()) {
         return;
      }
      setIsSubmit(true)


      
      const body = {
        name: name,
        symbol: symbol,
        description: desc,
        image: "",
      };

      try {
        setButtonStatus("Checking Project Symbol...")
        const result = await axios.get(`/api/check-project?project=${symbol}`);

        if (result.data) { 
          createMessage("Project symbol already exist", "danger-container");
          return false;
        }
        if (imageFile[0].file != null) {
          setButtonStatus("Uploading Image...")
          const imageUri = await pinImageToShadowDrive(imageFile[0].file);
          body.image = imageUri;
        } else {
          body.image = imageFile[0].preview;
        }
        setButtonStatus("Next")
        setIsSubmit(false);
        localStorage.setItem("step1",JSON.stringify(body));
        navigate.push("/project/create/step2");
      } catch (error) {
        console.log("error on project step 1",error)
        setButtonStatus("Next")
        setIsSubmit(false);
      }


   }

  const validateFields = () => {
    if (name.length == 0) {
      createMessage("Name is required", "danger-container");
      return false;
    }

    if (symbol.length == 0) {
      createMessage("Symbol is required", "danger-container");
      return false;
    }

    if (desc.length == 0) {
      createMessage("Description is required", "danger-container");
      return false;
    }

    if(imageFile.length == 0) {
      createMessage("Project Image is required", "danger-container");
      return false;
    }
    return true;
  };



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

  const closeImageAction = () => {
    setImageFile([]);
  };



  return (
    <div className="invitation-page create-coin-page project-step-page">
    {showMsg && (
        <div className={"message-container " + msgClass}>{msgText}</div>
      )}

       <div className="create-coin-page-header">
        <h2>Step 1</h2> 
        <h3>Deploy the Art and Metadata</h3> 
        <p className="heading">Set the image, name, symbol and description for your project.</p>
       </div>

       <div className="container">
           <div className="row justify-content-md-center">
              <div className="col-xl-7">
                 <div className="create-coin-container">
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="create-coin-left">
                              {imageFile.length > 0 && 
                                <div className="project-uploader-image">
                                  <img src={imageFile[0].preview} alt="coins" />
                                  <Button
                                    variant="link"
                                    onClick={closeImageAction}
                                    className="image-close-btn"
                                  >
                                    Close
                                  </Button>
                                </div>
                              }
                              {imageFile.length == 0 && 
                                <div {...getRootProps({ className: "dropzone create-coin-uploader" })}>
                                   <input {...getInputProps()} />

                                    {imageFile.length == 0 && 
                                        <div className="project-uploader-container">
                                           <p>1080 X 1080</p>
                                           <p>Jpg, Png, Gif, Max 100 mb</p>
                                           <div className="project-uploader-icon">
                                             <InsertPhoto />
                                           </div>
                                           <p><span>Drag and Drop file</span></p>
                                           <p>or <span>Browse media</span> on your</p>
                                           <p>device</p>
                                        </div>    
                                    }
                                  

                                  
                                </div>
                              }
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="create-coin-right">
                                    <div className="profile-container-element">
                                            <label>Name</label>
                                            <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            maxLength={32}
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                            />
                                            <span>Up to 32 characters, can have spaces.</span>
                                    </div>

                                    <div className="profile-container-element">
                                            <label>Symbol</label>
                                            <Form.Control
                                            type="text"
                                            placeholder="Symbol"
                                            maxLength={10}
                                            onChange={(event) => setSymbol(event.target.value)}
                                            value={symbol}
                                            />
                                            <span>10 characters</span>
                                    </div>

                                    <div className="profile-container-element">
                                        <label>Description</label>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            maxLength={160}
                                            placeholder="Describe your project within 160 characters."
                                            onChange={(event) => setDesc(event.target.value)}
                                            value={desc}
                                        />
                                    </div>

                            </div>
                        </div>
                    </div>
   

                </div>
              </div>

           </div>
       </div>


       
       <div className="profile-container-action">
             <>
               {isSubmit &&
                  <Button variant="primary" size="lg">
                      {buttonStatus}
                  </Button>
               }
               {!isSubmit&&
                  <Button variant="primary" size="lg" onClick={createStep1}>
                      Next
                  </Button>
               }

                <div className="note-step-1">
                    Please note. You will be charged 45,000 $MMOSH <br/>and a small amount of SOL to deploy your project to <br/>the Solana blockchain. Please ensure you have <br/>sufficient funds in this wallet before you begin.
                </div>

             </>
       </div>

    </div>
  );
}
