import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css";
import "./sidebar.css";
import { useRecoilValue } from "recoil";
import { loggedInState, userState } from "../../store";
import Branch from "../../interfaces/Branch";

export default function SidebarMenu3({ branches }): React.ReactElement {
    const loggedIn = useRecoilValue(loggedInState);
    const user = useRecoilValue(userState);
    const notLoggedInView = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>DOCUMENTS</h1>
                <h2>TACARE MAPSHARE</h2>
            </div>
            <Box className="no-access-container" mt="8">
                <Text fontSize="24px" color="white" textAlign="center">
                    Looks like you dont have access to this feature!
                </Text>
                <Image src="https://i.ibb.co/jTw3hTX/No-data-cuate-1.png" w="100%" />
                <Text fontSize="20px" color="white" textAlign="center" mt="6">
                    <Text d="inline" textDecor="underline" color={globalVars.colors.blue1}>
                        Log in
                    </Text>{" "}
                    to your admin or expert account to access this feature.
                </Text>
            </Box>
        </div>
    );

    const loggedInView = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>DOCUMENTS</h1>
                <h2>TACARE MAPSHARE</h2>
            </div>
            <Box mt="8">
                <Text fontSize="22px" color="white">
                    West African Chimpanzee Documents
                </Text>
                <Text fontSize="14px" color="white">
                    Access docusign documents for active branches here
                </Text>
                <Box p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                    {branches
                        .filter((branch) => branch.owner.id != user._id && branch.auditStatus.status === 0)
                        .map((branch: any, id: any) => {
                            return (
                                <Flex
                                    key={id}
                                    w="full"
                                    bgColor={globalVars.colors.gray1}
                                    borderRadius={10}
                                    pt="2"
                                    pb="2"
                                    mb="4"
                                    flexDir="row"
                                    justifyContent="space-between"
                                >
                                    <Text color="white" pl="8" fontWeight="light">
                                        Branch {branch.slug}
                                    </Text>
                                    <Text color="white" pr="8" fontWeight="light">
                                        View
                                    </Text>
                                </Flex>
                            );
                        })}
                </Box>
            </Box>
        </div>
    );

    if (loggedIn && user) {
        return loggedInView;
    }
    return notLoggedInView;
}
