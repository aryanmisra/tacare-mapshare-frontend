/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {useEffect, useRef, useState} from "react";

import {Flex, Heading, Box, SimpleGrid, Progress, Text} from "@chakra-ui/react";
import {Scene} from "@esri/react-arcgis";
import * as globalVars from "../../globalVars";
import GlobeMap from "./GlobeMap";
import {BiMenu, BiGitBranch} from "react-icons/bi";
import {HiOutlineDocumentDuplicate} from "react-icons/hi";
import {AiFillGithub, AiOutlineCloseCircle, AiOutlineInfoCircle} from "react-icons/ai";
import {FiMail} from "react-icons/fi";
import SidebarMenu1 from "./sidebarMenu1";
import SidebarMenu2 from "./sidebarMenu2";
import SidebarMenu3 from "./sidebarMenu3";
import SidebarMenu4 from "./sidebarMenu4";
import {conservationState, userState, loggedInState} from "../../store";
import {useRecoilValue} from "recoil";
import {getAllBranches} from "../../services/branch";
import Branch from "../../interfaces/Branch";
import "./home.css";
import { logout } from "../../helpers/persistence";
import {getBranchCommits} from "../../services/branch";
import {loadModules} from "esri-loader";

export function Home(): React.ReactElement {
    const [loaded, setLoaded] = useState(false);
    const currentSpecies = useRecoilValue(conservationState);
    const [menuMode, setMenuMode] = useState(-1);
    const [user, setUser] = useState(null);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState([-500, -500, -500, -500]);
    const [mapEditMode, setMapEditMode] = useState(true);
    // const [currentCommit, setCurrentCommit] = useState({id:"asdasdasdasd", note:'ASDASDASDASDASD'});
    const [currentCommit, setCurrentCommit] = useState(null);
    const [speciesCardOpen, setSpeciesCardOpen] = useState(true);
    const userValue = useRecoilValue(userState);
    const loggedIn = useRecoilValue(loggedInState);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [homeCommit, setHomeCommit] = useState([])
    // console.log(userValue, loggedIn);
    function compare( a, b ) {
        if ( a.order > b.order ){
          return -1;
        }
        if ( a.order < b.order ){
          return 1;
        }
        return 0;
      }

      function getDepth(arr:any[], depth:number):any {
        if (!arr[0]) {
            return depth
        }
        else {
            return getDepth(arr[0], depth + 1)
        }
    }

      function processPolygon(arr:any[]):any {
        if (getDepth(arr, 0) == 3) {
            return arr
        }
        const temp = []
        for (let i =0;i<arr.length;i++) {
            temp.push(...arr[i])
        }
        return processPolygon(temp)
    }

    useEffect(() => {
        if (loggedIn) {
            setUser(userValue)
            getAllBranches()
                .then((response) => {
                    setBranches(response.data);
                    getBranchCommits("main").then((resp)=>{
                        const temp: any = [];
                        loadModules(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/Polygon"]).then(([Graphic, GraphicsLayer, Polygon]) => {
                            resp.data.sort(compare)[0].features.forEach((feature:any)=>{
                            const graphic = new Graphic({
                                geometry: new Polygon(processPolygon(JSON.parse(feature.geometry))),
                                attributes: feature.attributes
                            });
                            temp.push(graphic)  
                        })
                    })
                    setHomeCommit(temp)
                })
                .catch((error) => console.error);
        })
    }
    }, []);

    useEffect(() => {
        if (menuMode == -1) {
            setSidebarOpen([-500, -500, -500, -500]);
        } else if (menuMode == 0) {
            setSidebarOpen([55, -500, -500, -500]);
        } else if (menuMode == 1) {
            setSidebarOpen([-500, 55, -500, -500]);
        } else if (menuMode == 2) {
            setSidebarOpen([-500, -500, 55, -500]);
        } else {
            setSidebarOpen([-500, 55, -500, 55]);
        }
    }, [menuMode]);
    

    return (
        <>
            <div style={{pointerEvents:!loaded?'auto':'none', opacity:!loaded?1:0, transition: '0.5s cubic-bezier(.69,.09,.37,.94)'}} className="loading-container">
                <div className="loading-text-container">
                    <h1>TACARE MAPSHARE</h1>
                    <h2>Powered by the Jane Goodal Institute</h2>
                    <Progress size="xs" mt="4" isIndeterminate w="50%" bgColor={globalVars.colors.gray2} colorScheme="whiteAlpha" borderRadius="md" />
                </div>
            </div>

            <div className="body-container">
                <div className="globe-container">
                    <GlobeMap homeCommit={homeCommit} mapEditMode={mapEditMode} setLoaded={setLoaded} currentCommit={currentCommit}/>
                </div>
                <div className="navbar-container">
                    <div className="link-container">
                        <BiMenu
                            color={menuMode == 0 ? globalVars.colors.blue1 : globalVars.colors.white}
                            size={30}
                            style={{cursor: "pointer", transition: "0.3s"}}
                            onClick={() => (menuMode == 0 ? setMenuMode(-1) : setMenuMode(0))}
                        />
                        <BiGitBranch
                            color={menuMode == 1 || menuMode == 3 ? globalVars.colors.blue1 : globalVars.colors.white}
                            size={26}
                            style={{marginTop: 25, cursor: "pointer", transition: "0.3s"}}
                            onClick={() => (menuMode == 1 ? setMenuMode(-1) : setMenuMode(1))}
                        />
                        <HiOutlineDocumentDuplicate
                            color={menuMode == 2 ? globalVars.colors.blue1 : globalVars.colors.white}
                            size={28}
                            style={{marginTop: 25, cursor: "pointer", transition: "0.3s"}}
                            onClick={() => (menuMode == 2 ? setMenuMode(-1) : setMenuMode(2))}
                        />
                    </div>
                    <div className="link-container">
                        <AiFillGithub
                            color="white"
                            size={31}
                            style={{cursor: "pointer"}}
                            onClick={() => (window.location.href = "https://github.com/aryanmisra/jane-goodall-docusign")}
                        />
                        <img
                            src="https://i.ibb.co/bFrQQBH/devpost.png"
                            width={32}
                            height={32}
                            style={{marginTop: 25, cursor: "pointer"}}
                            onClick={() =>
                                (window.location.href = "https://devpost.com/software/tacare-mapshare?ref_content=user-portfolio&ref_feature=in_progress")
                            }
                        />
                        <FiMail
                            color="white"
                            size={28}
                            style={{marginTop: 25, cursor: "pointer"}}
                            onClick={() => (window.location.href = "mailto:eshchock1@gmail.com")}
                        />
                    </div>
                </div>
                <div id="sidebar-container1" className="sidebar-container" style={{marginLeft: sidebarOpen[0]}}>
                    <SidebarMenu1 />
                </div>
                <div id="sidebar-container2" className="sidebar-container" style={{marginLeft: sidebarOpen[1]}}>
                    <SidebarMenu2
                        currentBranch={currentBranch}
                        setCurrentBranch={setCurrentBranch}
                        setMenuMode={setMenuMode}
                        branches={branches}
                        user={user}
                        currentCommit={currentCommit}
                        setCurrentCommit={setCurrentCommit}
                    />
                </div>
                <div id="sidebar-container3" className="sidebar-container" style={{marginLeft: sidebarOpen[2]}}>
                    <SidebarMenu3 user={user} branches={branches} />
                </div>
                <div id="sidebar-container4" className="sidebar-container" style={{marginLeft: sidebarOpen[3]}}>
                    <SidebarMenu4
                        currentBranch={currentBranch}
                        setCurrentBranch={setCurrentBranch}
                        setMenuMode={setMenuMode}
                        branches={branches}
                        user={user}
                        currentCommit={currentCommit}
                        setCurrentCommit={setCurrentCommit}
                        setSpeciesCardOpen={setSpeciesCardOpen}
                    />
                </div>
                <div className="title-container">
                    <h1>TACARE MAPSHARE</h1>
                    <h2>Powered by the Jane Goodal Institute</h2>
                </div>
                {!loggedIn ? (
                    <div className="login-container">
                        <button onClick={() => (window.location.href = "/login")}>LOGIN</button>
                    </div>
                ) : (
                    <div className="login-container">
                        <button onClick={() => {logout();window.location.assign("/")}}>LOGOUT</button>
                    </div>
                )}
                <div className="species-card-toggle" style={{transform: speciesCardOpen ? "scale(0)" : "scale(1)"}}>
                    <AiOutlineInfoCircle size={22} color={"white"} onClick={() => setSpeciesCardOpen(true)} style={{cursor: "pointer"}} />
                </div>
                <div className="species-card-container" style={{transform: speciesCardOpen ? "scale(1)" : "scale(0)"}}>
                    <img src={currentSpecies.coverImage} />
                    <AiOutlineCloseCircle
                        size={24}
                        color={"white"}
                        style={{position: "absolute", top: 10, right: 10, cursor: "pointer"}}
                        onClick={() => setSpeciesCardOpen(false)}
                    />
                    <Text color={globalVars.colors.white} mt="4" ml="4" mr="4" fontSize="18px">
                        {currentCommit?`Commit #${currentCommit.slug} Note:`:currentSpecies.name}
                    </Text>
                    <Text color={globalVars.colors.white} mt="2" ml="4" mr="4" lineHeight="16px" fontSize="12px">
                        {currentCommit?currentCommit.note:currentSpecies.description}
                    </Text>
                    <br></br>
                    <Text color={globalVars.colors.white} mt="-10px" ml="4" mr="4" lineHeight="16px" fontSize="12px">
                    {!currentCommit && "Current Global Count: 1566"}
                    </Text>
                </div>
                {mapEditMode && (
                    <div className="modify-layer-container">
                        <button>Submit changes</button>
                    </div>
                )}
            </div>
        </>
    );
}
