import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Tabs, Image, TabList, Tab, TabPanel, TabPanels, Flex, Button } from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css";
import "./sidebar.css";
import { BiArrowBack } from "react-icons/bi";

export default function SidebarMenu4({ user, branches, setMenuMode, currentBranch, setCurrentBranch }): React.ReactElement {
    const [filter1, setFilter1] = useState(0);

    const edits = [{ id: "12334523415" }, { id: "6231323415" }, { id: "3536423415" }, { id: "920434523415" }, { id: "888334523415" }, { id: "1223423415" }];

    const mainMenu = currentBranch && (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>
                    <BiArrowBack size={30} color="white" style={{ display: "inline", marginTop: -4 }} onClick={() => setMenuMode(1)} />
                    &nbsp;Branch #{currentBranch.slug}
                </h1>
            </div>
            <Text color="white" fontSize="14px">
                Conservation: {currentBranch.conservationSlug}
            </Text>
            <Text color="white" fontSize="14px">
                ID#: {currentBranch._id}
            </Text>
            <Text mt="4" color="white" fontSize="20px">
                Expert Information:
            </Text>
            <Text color="white" fontSize="14px">
                Name: {currentBranch.owner.firstName} {currentBranch.owner.lastName}
            </Text>
            <Text color="white" fontSize="14px">
                Email: {currentBranch.owner.email}
            </Text>
            <Text mt="4" color="white" fontSize="20px">
                Note:
            </Text>
            <Text color="white" fontSize="12px" lineHeight="14px">
                {currentBranch.note}
            </Text>

            <Text mt="4" color="white" fontSize="20px">
                Overview of Changes
            </Text>
            <Box p="0" pl="2" pr="2" mt="3" maxH="174px" overflowY="auto">
                {edits.map((edit: any, id: any) => {
                    return (
                        <Flex
                            key={id}
                            w="full"
                            bgColor={id != 0 ? globalVars.colors.gray1 : globalVars.colors.green}
                            borderRadius={10}
                            pt="2"
                            pb="2"
                            mb="4"
                            flexDir="row"
                            justifyContent="space-between"
                        >
                            <Text color="white" pl="8" fontWeight="light">
                                ID#: {edit.id}
                            </Text>
                            <Text
                                color="white"
                                pr="8"
                                fontWeight="light"
                                onClick={() => {
                                    console.log("attempt to view");
                                }}
                            >
                                View
                            </Text>
                        </Flex>
                    );
                })}
            </Box>
            <Text mt="4" color="white" fontSize="20px">
                Stakeholder Decisions
            </Text>
            <Text color="white" fontSize="14px" lineHeight="16px">
                The virtual audit has not been started.{" "}
            </Text>

            <Tabs variant="soft-rounded" align="center" mt="2" w="full" onChange={(index) => setFilter1(index)}>
                <TabList w="full" justifyContent="space-evenly" bgColor={globalVars.colors.gray2} borderRadius="100">
                    <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                        {currentBranch.auditStatus.pending} Pending
                    </Tab>
                    <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                        {currentBranch.auditStatus.approvals} Active
                    </Tab>
                    <Tab _selected={{ color: "white", bg: globalVars.colors.gray1 }} color="lightgray" fontWeight="light">
                        {currentBranch.auditStatus.denials} Denied
                    </Tab>
                </TabList>
            </Tabs>
            {user && user.userType == "admin" && (
                <Button
                    pos="fixed"
                    bottom="85px"
                    p="6"
                    fontWeight="light"
                    bgColor={globalVars.colors.blue2}
                    color="white"
                    w="380px"
                    _hover={{ bgColor: globalVars.colors.blue1 }}
                >
                    Send re-approval request
                </Button>
            )}
            <Button
                pos="fixed"
                bottom="25px"
                p="6"
                fontWeight="light"
                bgColor={globalVars.colors.blue2}
                color="white"
                w="380px"
                _hover={{ bgColor: globalVars.colors.blue1 }}
            >
                Submit a modification
            </Button>
        </div>
    );

    return mainMenu;
}
