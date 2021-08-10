/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";

import { Flex, Heading, Box, SimpleGrid } from "@chakra-ui/react";
import { Scene } from "@esri/react-arcgis";
import GlobeMap from "./GlobeMap";
import "./home.css"

export function Home(): React.ReactElement {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {
            //  !loaded?<div style={{background:'red', width:'100%', height:'100%', position:'fixed', top:0, left:0, zIndex:1000}}></div>:null   
            }
            
            <div className="body-container">
                <div className="globe-container">
                    <GlobeMap setLoaded={setLoaded}/>
                </div>
                <div className="navbar-container"></div>
                <div className="sidebar-container"></div>
                <div className="title-container"></div>
                <div className="login-container"></div>
                <div className="species-card-container"></div>
            </div>
        </>
    );
}
