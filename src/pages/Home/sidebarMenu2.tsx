import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Tabs, Image, TabList, Tab, TabPanel, TabPanels, Flex, Button } from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css";
import "./sidebar.css";

export default function SidebarMenu2({ userType, branches, setMenuMode, currentBranch, setCurrentBranch }): React.ReactElement {
    const [filter1, setFilter1] = useState(0);

    const notLoggedIn = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>BRANCHES</h1>
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

    const expert = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>BRANCHES</h1>
                <h2>TACARE MAPSHARE</h2>
            </div>
            <Box mt="8">
                <Text fontSize="22px" color="white">
                    Your Branches
                </Text>
                <Tabs variant="soft-rounded" align="center" mt="2" w="full" onChange={(index) => setFilter1(index)}>
                    <TabList w="full" justifyContent="space-evenly" bgColor={globalVars.colors.gray2} borderRadius="100">
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Pending
                        </Tab>
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Active
                        </Tab>
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Denied
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.author == "eshwar" && branch.status == 0)
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
                                                {branch.name}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.author == "eshwar" && branch.status == 1)
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
                                                {branch.name}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.author == "eshwar" && branch.status == 2)
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
                                                {branch.name}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Box mt="8">
                <Text fontSize="22px" color="white">
                    Other Active Branches
                </Text>
                <Box p="0" pl="2" pr="2" mt="3" maxH="174px" overflowY="auto">
                    {branches
                        .filter((branch) => branch.author != "eshwar" && branch.status == 0)
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
                                        {branch.name}
                                    </Text>
                                    <Text
                                        color="white"
                                        pr="8"
                                        fontWeight="light"
                                        onClick={() => {
                                            setMenuMode(3);
                                            setCurrentBranch(branch);
                                        }}
                                    >
                                        View
                                    </Text>
                                </Flex>
                            );
                        })}
                </Box>
            </Box>
            <Button
                pos="fixed"
                bottom="30px"
                p="6"
                fontWeight="light"
                bgColor={globalVars.colors.blue2}
                color="white"
                w="380px"
                _hover={{ bgColor: globalVars.colors.blue1 }}
            >
                Create a new branch
            </Button>
        </div>
    );

    const admin = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>BRANCHES</h1>
                <h2>TACARE MAPSHARE</h2>
            </div>
            <Box mt="8">
                <Text fontSize="22px" color="white">
                    All Branches
                </Text>
                <Text fontSize="14px" color="white" lineHeight="16px">
                    Manage all West African Chimpanzee branches here
                </Text>
                <Tabs variant="soft-rounded" align="center" mt="4" w="full" onChange={(index) => setFilter1(index)}>
                    <TabList w="full" justifyContent="space-evenly" bgColor={globalVars.colors.gray2} borderRadius="100">
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Pending
                        </Tab>
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Active
                        </Tab>
                        <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                            Denied
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.auditStatus.status == 0)
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
                                                Branch #{branch.slug}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.auditStatus.status == 1)
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
                                                Branch #{branch.slug}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                        <TabPanel p="0" pl="2" pr="2" mt="6" maxH="174px" overflowY="auto">
                            {branches
                                .filter((branch) => branch.auditStatus.status == 2)
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
                                                Branch #{branch.slug}
                                            </Text>
                                            <Text
                                                color="white"
                                                pr="8"
                                                fontWeight="light"
                                                onClick={() => {
                                                    setMenuMode(3);
                                                    setCurrentBranch(branch);
                                                }}
                                            >
                                                View
                                            </Text>
                                        </Flex>
                                    );
                                })}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </div>
    );

    if (userType == "user") {
        return expert;
    } else if (userType == "admin") {
        return admin;
    }
    return notLoggedIn;
}
