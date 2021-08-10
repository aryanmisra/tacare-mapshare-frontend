/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";

import { Flex, Heading, Box, SimpleGrid, Progress, Text} from "@chakra-ui/react";
import { Scene } from "@esri/react-arcgis";
import * as globalVars from "../../globalVars";
import GlobeMap from "./GlobeMap";
import {BiMenu, BiGitBranch} from "react-icons/bi";
import {HiOutlineDocumentDuplicate} from "react-icons/hi"
import {AiFillGithub} from "react-icons/ai"
import {FiMail} from "react-icons/fi"
import "./home.css"

export function Home(): React.ReactElement {
    const [loaded, setLoaded] = useState(false);
    const [menuMode, setMenuMode] = useState(-1);
    const [sidebarOpen, setSidebarOpen] = useState([-500, -500, -500]);

    useEffect(()=>{
        if (menuMode == -1) {
            setSidebarOpen([-500, -500, -500])
        }
        else if (menuMode == 0) {
            setSidebarOpen([55, -500, -500])
        }
        else if (menuMode == 1) {
            setSidebarOpen([-500, 55, -500])
        }
        else {
            setSidebarOpen([-500, -500, 55])
        }
    },[menuMode])
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
                    <GlobeMap setLoaded={setLoaded}/>
                </div>
                <div className="navbar-container">
                    <div className="link-container">
                        <BiMenu color={menuMode==0?globalVars.colors.blue1:globalVars.colors.white}  size={30} style={{cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==0?setMenuMode(-1):setMenuMode(0)}/>
                        <BiGitBranch color={menuMode==1?globalVars.colors.blue1:globalVars.colors.white}  size={26} style={{marginTop:25, cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==1?setMenuMode(-1):setMenuMode(1)}/>
                        <HiOutlineDocumentDuplicate color={menuMode==2?globalVars.colors.blue1:globalVars.colors.white}  size={28} style={{marginTop:25, cursor:'pointer', transition: '0.3s'}} onClick={()=>menuMode==2?setMenuMode(-1):setMenuMode(2)}/>
                    </div>
                    <div className="link-container">
                        <AiFillGithub color="white"  size={31} style={{cursor:'pointer'}} onClick={()=> window.location.href = "https://github.com/aryanmisra/jane-goodall-docusign"}/>
                        <img src="https://i.ibb.co/bFrQQBH/devpost.png"  width={32} height={32} style={{marginTop:25, cursor:'pointer'}} onClick={()=> window.location.href = "https://devpost.com/software/tacare-mapshare?ref_content=user-portfolio&ref_feature=in_progress"}/>
                        <FiMail color="white"  size={28} style={{marginTop:25, cursor:'pointer'}} onClick={()=> window.location.href = "mailto:eshchock1@gmail.com"}/>
                    </div>
                </div>
                <div id="sidebar-container1" className="sidebar-container" style={{marginLeft:sidebarOpen[0]}}></div>
                <div id="sidebar-container2" className="sidebar-container" style={{marginLeft:sidebarOpen[1]}}></div>
                <div id="sidebar-container3" className="sidebar-container" style={{marginLeft:sidebarOpen[2]}}></div>
                <div className="title-container">
                    <h1>TACARE MAPSHARE</h1>
                    <h2>Powered by the Jane Goodal Institute</h2>
                </div>
                <div className="login-container">
                    <button>LOGIN</button>
                </div>
                <div className="species-card-container">
                    <img src="https://i.ibb.co/F5GDpBL/image-16.png"/>
                    <Text color={globalVars.colors.white} mt="4" ml="4" mr="4" fontSize="18px">The West African Chimpanzee</Text>
                    <Text color={globalVars.colors.white} mt="2" ml="4" mr="4" lineHeight="16px" fontSize="14px">Nam non elementum odio. Phasellus consequat, felis sed pulvinar accumsan, nisl tellus convallis orci, quis gravida augue diam ac magna. Aliquam interdum ut nibh ut blandit. In congue justo et mi blandit condimentum. Donec odio est, semper nec condimentum sagittis.</Text>
                    <Text color={globalVars.colors.white} mt="2" ml="4" mr="4" lineHeight="16px" fontSize="14px">Current global count: 1532</Text>
                </div>
                <div className="modify-layer-container">
                    <button>Submit changes</button>
                </div>
            </div>
        </>
    );
}
