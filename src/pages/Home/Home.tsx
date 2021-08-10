/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";

import { Flex, Heading, Box, SimpleGrid, Progress, Text} from "@chakra-ui/react";
import { Scene } from "@esri/react-arcgis";
import * as globalVars from "../../globalVars";
import GlobeMap from "./GlobeMap";
import {BiMenu, BiGitBranch} from "react-icons/bi";
import {HiOutlineDocumentDuplicate} from "react-icons/hi"
import {AiFillGithub, AiOutlineCloseCircle, AiOutlineInfoCircle} from "react-icons/ai"
import {FiMail} from "react-icons/fi"
import SidebarMenu1 from "./sidebarMenu1";
import SidebarMenu2 from "./sidebarMenu2";
import SidebarMenu3 from "./sidebarMenu3";
import SidebarMenu4 from "./sidebarMenu4";
// import { tokenState } from "../../store";
import { useRecoilValue } from "recoil";


import "./home.css"

export function Home(): React.ReactElement {
    const [loaded, setLoaded] = useState(false);
    const [currentSpecies, setCurrentSpecies] = useState({name:"The West African Chimpanzee", image:"https://i.ibb.co/F5GDpBL/image-16.png", count:1532, description:"Nam non elementum odio. Phasellus consequat, felis sed pulvinar accumsan, nisl tellus convallis orci, quis gravida augue diam ac magna. Aliquam interdum ut nibh ut blandit. In congue justo et mi blandit condimentum. Donec odio est, semper nec condimentum sagittis."});
    const [menuMode, setMenuMode] = useState(-1);
    const [userType, setuserType] = useState("admin");
    // const token = useRecoilValue(tokenState);
    // const { user, userIsLoading, userIsError } = useUser(token);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState([-500, -500, -500, -500]);
    const [mapEditMode, setMapEditMode] = useState(false)
    const [speciesCardOpen, setSpeciesCardOpen] = useState(true)

    useEffect(()=>{
        if (menuMode == -1) {
            setSidebarOpen([-500, -500, -500, -500])
        }
        else if (menuMode == 0) {
            setSidebarOpen([55, -500, -500, -500])
        }
        else if (menuMode == 1) {
            setSidebarOpen([-500, 55, -500, -500])
        }
        else if (menuMode == 2) {
            setSidebarOpen([-500, -500, 55, -500])
        }
        else {
            setSidebarOpen([-500, 55, -500, 55])
        }
        // console.log(user)
    },[menuMode])

    const branches = [
        {name:"branch #2423", author:"eshwar", status:0},
        {name:"branch #123", author:"eshwar", status:0},
        {name:"branch #324234", author:"eshwar", status:1},
        {name:"branch #234423", author:"eshwar", status:2},
        {name:"branch #1232423", author:"eshwar", status:0},
        {name:"branch #212423", author:"eshwar", status:0},
        {name:"branch #3331", author:"asd", status:0},
        {name:"branch #23", author:"asd", status:0},
        {name:"branch #1233", author:"asd", status:1},
        {name:"branch #3456", author:"asd", status:0},
        {name:"branch #2133", author:"asd", status:2},
        {name:"branch #52456", author:"asd", status:2},
    ]
    return (
        <>
            <div style={{pointerEvents:!loaded?'auto':'none', opacity:!loaded?1:0, transition: '0.5s cubic-bezier(.69,.09,.37,.94)'}} className="loading-container">
                <div className="loading-text-container">
                    <h1>TACARE MAPSHARE</h1>
                    <h2>Powered by the Jane Goodal Institute</h2>
                    <Progress size="xs" mt="4" isIndeterminate w="50%" bgColor={globalVars.colors.gray2} colorScheme="whiteAlpha" borderRadius="md"/>
                </div>
            </div>
            
            <div className="body-container">
                <div className="globe-container">
                    <GlobeMap mapEditMode={mapEditMode} setLoaded={setLoaded}/>
                </div>
                <div className="navbar-container">
                    <div className="link-container">
                        <BiMenu color={menuMode==0?globalVars.colors.blue1:globalVars.colors.white}  size={30} style={{cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==0?setMenuMode(-1):setMenuMode(0)}/>
                        <BiGitBranch color={menuMode==1 || menuMode==3?globalVars.colors.blue1:globalVars.colors.white}  size={26} style={{marginTop:25, cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==1?setMenuMode(-1):setMenuMode(1)}/>
                        <HiOutlineDocumentDuplicate color={menuMode==2?globalVars.colors.blue1:globalVars.colors.white}  size={28} style={{marginTop:25, cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==2?setMenuMode(-1):setMenuMode(2)}/>
                    </div>
                    <div className="link-container">
                        <AiFillGithub color="white"  size={31} style={{cursor:'pointer'}} onClick={()=> window.location.href = "https://github.com/aryanmisra/jane-goodall-docusign"}/>
                        <img src="https://i.ibb.co/bFrQQBH/devpost.png"  width={32} height={32} style={{marginTop:25, cursor:'pointer'}} onClick={()=> window.location.href = "https://devpost.com/software/tacare-mapshare?ref_content=user-portfolio&ref_feature=in_progress"}/>
                        <FiMail color="white"  size={28} style={{marginTop:25, cursor:'pointer'}} onClick={()=> window.location.href = "mailto:eshchock1@gmail.com"}/>
                    </div>
                </div>
                <div id="sidebar-container1" className="sidebar-container" style={{marginLeft:sidebarOpen[0]}}><SidebarMenu1 userType={userType}/></div>
                <div id="sidebar-container2" className="sidebar-container" style={{marginLeft:sidebarOpen[1]}}><SidebarMenu2 currentBranch={currentBranch} setCurrentBranch={setCurrentBranch} setMenuMode={setMenuMode} branches={branches} userType={userType}/></div>
                <div id="sidebar-container3" className="sidebar-container" style={{marginLeft:sidebarOpen[2]}}><SidebarMenu3 branches={branches} userType={userType}/></div>
                <div id="sidebar-container4" className="sidebar-container" style={{marginLeft:sidebarOpen[3]}}><SidebarMenu4 currentBranch={currentBranch} setCurrentBranch={setCurrentBranch} setMenuMode={setMenuMode} branches={branches} userType={userType}/></div>
                <div className="title-container">
                    <h1>TACARE MAPSHARE</h1>
                    <h2>Powered by the Jane Goodal Institute</h2>
                </div>
                <div className="login-container">
                    <button onClick={()=>window.location.href="/login"}>LOGIN</button>
                </div>
                <div className="species-card-toggle" style={{transform:speciesCardOpen?'scale(0)':'scale(1)'}}><AiOutlineInfoCircle size={22} color={"white"} onClick={()=>setSpeciesCardOpen(true)} style={{cursor:'pointer'}}/></div>
                <div className="species-card-container" style={{transform:speciesCardOpen?'scale(1)':'scale(0)'}}>
                    <img src={currentSpecies.image}/>
                    <AiOutlineCloseCircle size={24} color={"white"} style={{position:'absolute', top:10, right:10, cursor:'pointer'}} onClick={()=>setSpeciesCardOpen(false)}/>
                    <Text color={globalVars.colors.white} mt="4" ml="4" mr="4" fontSize="18px">{currentSpecies.name}</Text>
                    <Text color={globalVars.colors.white} mt="2" ml="4" mr="4" lineHeight="16px" fontSize="14px">{currentSpecies.description}</Text>
                    <Text color={globalVars.colors.white} mt="2" ml="4" mr="4" lineHeight="16px" fontSize="14px">Current global count: {currentSpecies.count}</Text>
                </div>
                {mapEditMode && 
                <div className="modify-layer-container">
                    <button>Submit changes</button>
                </div>}
            </div>
        </>
    );
}
