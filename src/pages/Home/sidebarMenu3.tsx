import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Image} from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css"
import "./sidebar.css"

export default function SidebarMenu3(): React.ReactElement {
    return (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>DOCUMENTS</h1>
                <h2>TACARE MAPSHARE</h2>
            </div>
            <Box className="no-access-container" mt="8">
                <Text fontSize="24px" color="white" textAlign="center">Looks like you dont have access to this feature!</Text>
                <Image src="https://i.ibb.co/jTw3hTX/No-data-cuate-1.png" w="100%"/>
                <Text fontSize="20px" color="white" textAlign="center" mt="6"><Text d="inline" textDecor="underline" color={globalVars.colors.blue1}>Log in</Text> to your admin or expert account to access this feature.</Text>
            </Box>
        </div>
    )
}