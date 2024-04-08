"use client";

import { Search } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Bars } from "react-loader-spinner";

let source;
export default function Projects() {
    const navigate = useRouter();
    const [projectLoading, setProjectLoading] = useState(true);
    const [keyword, setKeyword] = useState("")
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        getProjectsFromAPI("");
    },[])

    const searchProject = (searchKeyword:any) => {
        setKeyword(searchKeyword);
        getProjectsFromAPI(searchKeyword);
    }

    const getProjectsFromAPI = async (keyword:any) => {
        try {
            if(source) {
                source.cancel();
                source = null
            }
            source = axios.CancelToken.source();
            setProjectLoading(true)
            const listResult = await axios.get(`/api/list-project?keyword=${keyword}`,{
                cancelToken: source.token
            });
            setProjects(listResult.data)
            setProjectLoading(false)
        } catch (error) {
            setProjectLoading(false)
            setProjects([])
        }
    }


    const onProjectSelect = (projectItem:any) => {
        navigate.push("/project/"+projectItem.project)
    }

    return (
        <div className="project-directory">
               <div className="project-directory-header">
                   <h2>Project Directory</h2> 
                   <div className="project-directory-search">
                       <Search />
                       <Form.Control
                            type="text"
                            placeholder="Type the name or symbol of the project you want to search"
                            maxLength={32}
                            onChange={(event) => searchProject(event.target.value)}
                            value={keyword}
                        />
                   </div>
               </div>
               <div className="project-directory-container">
               {projects.length > 0 &&
                    <div className="container">
                        <div className="row">
                            {projects.map((projectItem: any, index: any) => (
                                <div className="col-md-4" onClick={()=>{onProjectSelect(projectItem)}}>
                                  <div className="project-directory-container-item">
                                       <div className="project-image-collage">
                                        <h3>{projectItem.symbol}</h3>
                                        <div className="project-image-collage-image">
                                            <img src={projectItem.image} alt="project" className="project-image-collage-image-main"/>
                                            <div className="project-image-collage-coin-image">
                                                <img src={projectItem.coinimage} alt="project"/> 
                                            </div>
                                        </div>
                                        <p className="project-image-collage-subtitle">{projectItem.name}</p>
                                        <p>{projectItem.desc}</p>
                                    </div>   
                                  </div>     
                                </div>
                            ))}
                        </div>
                    </div>
                }

                <div className="project-directory-loader">
                    <Bars
                        height="80"
                        width="80"
                        color="rgba(255, 0, 199, 1)"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}} 
                        wrapperClass="bars-loading"
                        visible={projectLoading}
                    />
                </div>

                {(projects.length == 0 && !projectLoading) &&
                    <div className="project-directory-empty">Projects not available</div>
                }
               </div>
        </div>
    )
}