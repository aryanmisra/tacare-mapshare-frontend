import React, {useEffect, useState, useRef} from "react";
import {HiExclamationCircle, HiBadgeCheck} from "react-icons/hi";
import {Client} from "persona";
import {
    Flex,
    Button,
    Input,
    Text,
    Link,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    HStack,
    Spacer,
    Box,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Table,
    List,
    ListItem,
    OrderedList,
    UnorderedList,
} from "@chakra-ui/react";
import {FiArrowDown} from "react-icons/fi";
import {CryptoCard} from "../../components/CryptoCard";
import {tokenState} from "../../store";
import {getEthUSD, getBitcloutUSD} from "../../services/utility";
import {TransactionSchema} from "../../interfaces/Transaction";
import {getTransactions} from "../../services/user";
import {withdrawBitcloutPreflightTxn} from "../../services/gateway";
import {TransactionModal} from "./TransactionModal";
import {BitcloutWithdrawModal, EthWithdrawModal} from "./WithdrawModal";
import {BitcloutDepositModal, EthDepositModal} from "./DepositModal";
import {useUser} from "../../hooks";
import {useRecoilValue} from "recoil";
import {userState} from "../../store";
import {BlueButton} from "../../components/BlueButton/BlueButton";
import {updateEmail, updateName, resendVerificationEmail} from "../../services/user";
import {FaCircle} from "react-icons/fa";
import {FiEdit3} from "react-icons/fi";
import {VscTriangleDown, VscTriangleUp} from "react-icons/vsc";

import * as globalVars from "../../globalVars";

const regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

const tiers = [
    {
        name: "Silver",
        color: "#cccccc",
        pageText: "You are a Silver Tier BitSwap user. Please verify your identity to get full platform access.",
    },
    {
        name: "Gold",
        color: "#FFC634",
        pageText: "You are a Gold Tier BitSwap user. Enjoy unlimited trading on BitSwap!",
    },
];

export function Profile(): React.ReactElement {
    const user = useRecoilValue(userState);

    const profilePage = user ? (
        <>

            <Flex flexDirection={{base: "column", md: "row"}} w="full" p={4} justify={{base: "start", md: "space-between"}} mt={4}>
                <Flex flexDirection="column" w={{base: "100%", md: "55%"}} m={6} ml={{base: 0, md: 10}}>
                    <VStack spacing={6} align={{base: "flex-start", md: "flex-start"}} w="full">
                        <HStack align="start" mb="2" spacing={4}>
                            <Image
                                src={`https://bitclout.com/api/v0/get-single-profile-picture/${user.bitclout.publicKey}`}
                                boxSize={{base: "100px"}}
                                borderStyle="solid"
                                borderColor={user ? tiers[user.tier].color : "white"}
                                borderWidth="6px"
                                fallbackSrc="https://bitclout.com/assets/img/default_profile_pic.png"
                                fit="cover"
                                borderRadius="full"
                            />
                            {/* </Box> */}
                            <VStack align="start" spacing={2} alignSelf="center">
                                <Link
                                    isExternal
                                    href={`https://bitclout.com/u/${user.bitclout.username ? user.bitclout.username : "anonymous"}`}
                                    color="black"
                                    fontWeight="700"
                                    fontSize="20"
                                >
                                    @{user.bitclout.username ? user.bitclout.username : user.bitclout.publicKey}
                                </Link>
                                <Text color="#5B5B5B" fontWeight="400" fontSize="16" mt="1">
                                    {user.bitclout.bio}
                                </Text>

                            </VStack>
                        </HStack>
                        <Flex
                            w={{base: "full", md: "full"}}
                            flexDir={{base: "column", md: "row"}}
                            p="6"
                            borderRadius="8"
                            borderColor="#DDE2E5"
                            borderWidth="1px"
                        >
                            <Flex flex="0.65" align={{base: "center", md: "flex-start"}} justify="center" flexDir="column">
                                <HStack>
                                    <Text color="#44423D" fontWeight="700" fontSize="18">
                                        Tier
                                    </Text>
                                    <FaCircle color={user.tier == 0 ? "#C4C4C4" : "#FFC634"} size="16" />
                                </HStack>

                                <Text color="#44423D" fontWeight="300" fontSize="sm" mt="12px">
                                    You are a <span style={{fontWeight: 600}}>{user.tier == 0 ? "Silver" : "Gold"} Tier</span> BitSwap user.
                                    <br />
                                    {user.tier == 0 && `$${withdrawRemaining.toFixed(2)} USD withdrawal remaining.`}
                                    <br />
                                    {user.tier == 0 ? "Verify your identity to advance to the next tier." : "Enjoy unlimited trading on BitSwap!"}
                                </Text>
                            </Flex>
                            <Flex flex="0.35" justify={{base: "center", md: "flex-end"}} align="center" mt={{base: "15px", md: "0"}}>
                                <BlueButton text={`   View   `} w={{base: "45%", md: "90%"}} fontSize="sm" onClick={onTierOpen} />
                            </Flex>
                        </Flex>
                        <Flex
                            w={{base: "full", md: "full"}}
                            flexDir={{base: "column", md: "row"}}
                            p="6"
                            borderRadius="8"
                            borderColor="#DDE2E5"
                            borderWidth="1px"
                        >
                            <Flex flex="0.65" align={{base: "center", md: "flex-start"}} justify="center" flexDir="column">
                                <HStack>
                                    <Text color="#44423D" fontWeight="700" fontSize="18">
                                        Email
                                    </Text>
                                    {user.verification.email ? (
                                        <HiBadgeCheck style={{display: "inline"}} color="#5388fe" size="20" />
                                    ) : (
                                        <HiExclamationCircle style={{display: "inline"}} color="#EE0004" size="20" />
                                    )}
                                </HStack>

                                {user.verification.email ? (
                                    <Text color="#44423D" fontWeight="300" fontSize="sm" mt="12px">
                                        Your email is verified.
                                        <br />
                                        Important updates will be sent to this address.
                                    </Text>
                                ) : (
                                    <Text color="#44423D" fontWeight="300" fontSize="sm" mt="12px">
                                        Check your inbox for verification.
                                        <br />
                                        Important updates will be sent to this address.
                                    </Text>
                                )}


                            </Flex>
                            <Flex
                                flex="0.35"
                                justify={{base: "center", md: "space-between"}}
                                align={{base: "center", md: "flex-end"}}
                                flexDir={{base: "row", md: "column"}}
                                mt={{base: "15px", md: "0"}}
                            >

                            </Flex>
                        </Flex>
                        <Flex
                            mt="20px"
                            w={{base: "full", md: "full"}}
                            flexDir={{base: "column", md: "row"}}
                            p="6"
                            borderRadius="8"
                            borderColor="#DDE2E5"
                            borderWidth="1px"
                        >
                            <Flex flex={"0.65"} align={{base: "center", md: "flex-start"}} justify="center" flexDir="column">
                                <HStack>
                                    <Text color="#44423D" fontWeight="700" fontSize="18" isTruncated>
                                        Identity Verification
                                    </Text>
                                    {user.verification.personaVerified ? (
                                        <HiBadgeCheck style={{display: "inline"}} color="#5388fe" size="20" />
                                    ) : (
                                        <HiExclamationCircle style={{display: "inline"}} color="#EE0004" size="20" />
                                    )}
                                </HStack>
                                {user.verification.personaVerified ? (
                                    <Text color="#44423D" fontWeight="300" fontSize="sm" mt="12px">
                                        Your identity is verified. Enjoy full access to the platform.
                                    </Text>
                                ) : (
                                    <Text color="#44423D" fontWeight="300" fontSize="sm" mt="12px">
                                        Complete your identity verification to unlock full access.
                                    </Text>
                                )}
                            </Flex>
                            <Flex
                                flex="0.35"
                                justify={{base: "center"}}
                                align={{base: "center", md: "flex-end"}}
                                flexDir={{base: "row", md: "column"}}
                                mt={{base: "15px", md: "0"}}
                            >

                            </Flex>
                        </Flex>
                    </VStack>
                </Flex>

                {/* WALLET SECTION */}
                <Flex
                    justify={{base: "space-between", xl: "start"}}
                    flexDirection="column"
                    w={{base: "full", md: "45%"}}
                    m={{base: 0, md: 6}}
                    mr={{base: 0, md: 10}}
                >
                    <Flex flexDir="column" alignItems="center" w="full">
                        <Flex direction="column" bg="white" w="full">

                        </Flex>


                    </Flex>
                </Flex>
            </Flex>
        </>
    ) : null;

    return profilePage ? profilePage : <></>;
}
