import React, {useEffect, useRef, useState} from "react";
import {Box, Text, Tabs, Image, TabList, Tab, TabPanel, TabPanels, Flex, Button} from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css";
import "./sidebar.css";
import {BiArrowBack} from "react-icons/bi";
import {AiOutlineReload} from "react-icons/ai";
import {getBranchCommits, deleteBranch, revertCommits, mergeBranch} from "../../services/branch";
import {startVirtualAudit, auditImageUpload, updateAuditStatus} from "../../services/audit";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react"
export default function SidebarMenu4({startNewModification, user, branches, setMenuMode, currentBranch, setCurrentBranch, currentCommit, setCurrentCommit, setSpeciesCardOpen}): React.ReactElement {
    const [filter1, setFilter1] = useState(0);
    const [commits, setCommits] = useState([])
    const [fileUploadErr, setFileUploadErr] = useState(false)
    const [imageUploaded, setImageUploaded] = useState(false)
    const {isOpen: isOpenRevertBranch, onOpen: onOpenRevertBranch, onClose: onCloseRevertBranch} = useDisclosure()
    const {isOpen: isOpenMergeBranch, onOpen: onOpenMergeBranch, onClose: onCloseMergeBranch} = useDisclosure()
    const {isOpen: isOpenCloseBranch, onOpen: onOpenCloseBranch, onClose: onCloseCloseBranch} = useDisclosure()
    const {isOpen: isOpenAudit, onOpen: onOpenAudit, onClose: onCloseAudit} = useDisclosure()
    function compare(a, b) {
        if (a.order > b.order) {
            return -1;
        }
        if (a.order < b.order) {
            return 1;
        }
        return 0;
    }

    function getBase64(file, cb) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function startAudit() {
        let idCardBase64 = '';
        console.log(document.getElementById("image-upload").files[0].size)
        if (document.getElementById("image-upload").files[0].size > 2100000) {
            document.getElementById("image-upload").value = null
            setFileUploadErr(true)
        }
        else {
            setFileUploadErr(false)
            getBase64(document.getElementById("image-upload").files[0], (result) => {
                idCardBase64 = result;
                auditImageUpload(currentBranch.slug, result).then(()=>{
                    startVirtualAudit(currentBranch.slug, user._id)   
                })
            });
        }
    }

    function reloadStats() {
        updateAuditStatus(currentBranch.slug)
    }

    useEffect(() => {
        if (currentBranch) {
            getBranchCommits(currentBranch.slug).then((resp) => {
                setCommits(resp.data);
                setCurrentCommit(resp.data.sort(compare)[0]);
                setSpeciesCardOpen(true);
                console.log(resp.data);
            });
        }
        console.log(currentBranch)
    }, [currentBranch]);

    const mainMenu = currentBranch && (
        <>
            <Modal isOpen={isOpenCloseBranch} onClose={onCloseCloseBranch}>
                <ModalOverlay />
                <ModalContent bgColor={globalVars.colors.gray3} color={"white"}>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to close branch #{currentBranch.slug}
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={globalVars.colors.gray1} mr={3} onClick={onCloseCloseBranch}>
                            Cancel
                        </Button>
                        <Button bgColor={globalVars.colors.blue2} onClick={() => deleteBranch(currentBranch.slug).then((resp) => {window.location.assign("/")})}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenMergeBranch} onClose={onCloseMergeBranch}>
                <ModalOverlay />
                <ModalContent bgColor={globalVars.colors.gray3} color={"white"}>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to merge branch #{currentBranch.slug}
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={globalVars.colors.gray1} mr={3} onClick={onCloseMergeBranch}>
                            Cancel
                        </Button>
                        <Button bgColor={globalVars.colors.blue2} onClick={() => mergeBranch(currentBranch.slug).then((resp) => {window.location.assign("/")})}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenRevertBranch} onClose={onCloseRevertBranch}>
                <ModalOverlay />
                <ModalContent bgColor={globalVars.colors.gray3} color={"white"}>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to revert branch #{currentBranch.slug} to commit #{currentCommit && currentCommit.slug}
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={globalVars.colors.gray1} mr={3} onClick={onCloseRevertBranch}>
                            Cancel
                        </Button>
                        <Button bgColor={globalVars.colors.blue2} onClick={() => revertCommits(currentCommit.slug).then((resp) => {window.location.assign("/")})}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenAudit} onClose={onCloseAudit}>
                <ModalOverlay />
                <ModalContent bgColor={globalVars.colors.gray3} color={"white"}>
                    <ModalHeader>Confirm Action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <input type="file" id="image-upload" accept="image/jpeg, image/x-png" onChange={()=>setImageUploaded(document.getElementById("image-upload").value)}/>
                    <Text color={globalVars.colors.red + ' !important'} mt="2" mb="2">{fileUploadErr && "File too large"}</Text>
                        Upload a JPG screenshot of the map before proceeding with a virtual audit. (Max 2MB)
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={globalVars.colors.gray1} mr={3} onClick={onCloseAudit}>
                            Cancel
                        </Button>
                        <Button bgColor={globalVars.colors.blue2} disabled={!imageUploaded} onClick={() => startAudit()}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <div className="sidebar-inner-container">
                <div className="sidebar-title-container">
                    <h1>
                        <BiArrowBack size={30} color="white" style={{display: "inline", marginTop: -4}} onClick={() => {setMenuMode(1); setCurrentBranch(null); setCurrentCommit(null)}} />
                        &nbsp;{currentBranch.status == 1 ? "MERGED" : currentBranch.status == 2 ? "CLOSED" : ""} Branch #{currentBranch.slug}
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
                    {commits.sort(compare).map((commit: any, id: any) => {
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
                                    ID#: {commit.slug} {id == 0 && "(current)"}
                                </Text>
                                {user && user.userType == "admin" && id != 0 && (
                                    <Text
                                        pos="relative"
                                        color="white"
                                        right="-5px"
                                        fontWeight="light"
                                        cursor="pointer"
                                        onClick={() => {
                                            setCurrentCommit(commit);
                                            setSpeciesCardOpen(true);
                                            onOpenRevertBranch();
                                        }}
                                    >
                                        Revert
                                    </Text>
                                )}
                                <Text
                                    pos="relative"
                                    color="white"
                                    right="15px"
                                    fontWeight="light"
                                    cursor="pointer"
                                    onClick={() => {
                                        setCurrentCommit(commit);
                                        setSpeciesCardOpen(true);
                                    }}
                                >
                                    View
                                </Text>
                            </Flex>
                        );
                    })}
                </Box>
                <Text mt="4" color="white" fontSize="20px">
                    Stakeholder Decisions <AiOutlineReload onClick={()=>reloadStats()} size={20} style={{marginTop:-4, display:'inline'}} color={"white"}/>
                </Text>
                <Text color="white" fontSize="14px" lineHeight="16px">
                    The virtual audit has not been started.{" "}
                </Text>

                <Tabs variant="soft-rounded" align="center" mt="2" w="full" onChange={(index) => setFilter1(index)}>
                    <TabList w="full" justifyContent="space-evenly" bgColor={globalVars.colors.gray2} borderRadius="100">
                        <Tab _selected={{color: "white", bg: globalVars.colors.gray1}} color="lightgray" fontWeight="light">
                            {currentBranch.auditStatus.pending} Pending
                        </Tab>
                        <Tab _selected={{color: "white", bg: globalVars.colors.gray1}} color="lightgray" fontWeight="light">
                            {currentBranch.auditStatus.approvals} Active
                        </Tab>
                        <Tab _selected={{color: "white", bg: globalVars.colors.gray1}} color="lightgray" fontWeight="light">
                            {currentBranch.auditStatus.denials} Denied
                        </Tab>
                    </TabList>
                </Tabs>
                {user && user.userType == "admin" && currentBranch.status == 0 && (
                    <>
                    <Button
                            pos="fixed"
                            bottom="145px"
                            p="6"
                            fontWeight="light"
                            bgColor={globalVars.colors.blue2}
                            color="white"
                            w="380px"
                            _hover={{bgColor: globalVars.colors.blue1}}
                            onClick={() => onOpenAudit()}
                        >
                            {currentBranch.auditStatus.envelopeId != ""?"Res":"S"}tart Virtual audit
                        </Button>
                        <Button
                            pos="fixed"
                            bottom="85px"
                            p="6"
                            fontWeight="light"
                            bgColor={globalVars.colors.blue2}
                            color="white"
                            w="380px"
                            _hover={{bgColor: globalVars.colors.blue1}}
                            onClick={() => onOpenCloseBranch()}
                        >
                            Close branch #{currentBranch.slug}
                        </Button>
                        <Button
                            pos="fixed"
                            bottom="25px"
                            p="6"
                            fontWeight="light"
                            bgColor={globalVars.colors.blue2}
                            color="white"
                            w="380px"
                            _hover={{bgColor: globalVars.colors.blue1}}
                            onClick={() => onOpenMergeBranch()}
                        >
                            Merge branch #{currentBranch.slug}
                        </Button>
                    </>
                )}
                {user && user.userType != "admin" && currentBranch.status == 0 && (
                    <Button
                        pos="fixed"
                        bottom="25px"
                        p="6"
                        fontWeight="light"
                        bgColor={globalVars.colors.blue2}
                        color="white"
                        w="380px"
                        _hover={{bgColor: globalVars.colors.blue1}}
                        onClick={() => startNewModification()}
                    >
                        Submit a modification
                    </Button>)}
                {currentBranch.status == 1 && (
                    <Button
                        pos="fixed"
                        bottom="25px"
                        p="6"
                        fontWeight="light"
                        bgColor={globalVars.colors.gray2}
                        color="white"
                        w="380px"
                        _hover={{bgColor: globalVars.colors.gray2}}
                    >
                        Branch merged {globalVars.timeSince(new Date(currentBranch.updatedAt))}
                    </Button>
                )}
                {currentBranch.status == 2 && (
                    <Button
                        pos="fixed"
                        bottom="25px"
                        p="6"
                        fontWeight="light"
                        bgColor={globalVars.colors.gray2}
                        color="white"
                        w="380px"
                        _hover={{bgColor: globalVars.colors.gray2}}
                    >
                        Branch closed {globalVars.timeSince(new Date(currentBranch.updatedAt))}
                    </Button>
                )}
            </div></>
    );

    return (mainMenu);
}
