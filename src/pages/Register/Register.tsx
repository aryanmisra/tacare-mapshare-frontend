import React, { ReactElement, useState } from "react";
import { VStack, Text, Input, Flex, Select, Link, HStack, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BlueButton } from "../../components/BlueButton";
import { HiExclamationCircle } from "react-icons/hi";
import { register } from "../../services/auth";
import * as globalVars from "../../globalVars";
import { BiArrowBack } from "react-icons/bi";

import "./register.css";
export function Register(): ReactElement {
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [errText, setErrText] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("user");
    const [password, setPassword] = useState("");
    const [regComplete, setRegComplete] = useState(false);
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const validate = () => {
        if (globalVars.regEmail.test(email) && firstName.length > 1 && lastName.length > 1 && password.length >= 6) {
            setEmailErr(false);
            setNameErr(false);
            return true;
        } else {
            setEmailErr(!globalVars.regEmail.test(email));
            setNameErr(firstName.length <= 1 || lastName.length <= 1);
            setPassErr(password.length < 6);
            return false;
        }
    };

    const registerHandler = () => {
        setLoading(true);
        if (validate()) {
            register(firstName, lastName, userType, email, password)
                .then(() => {
                    setErrText("");
                    setLoading(false);
                    setRegComplete(true);
                })
                .catch((error: any) => {
                    setLoading(false);
                    error.response.data
                        ? error.response.data.message
                            ? setErrText(error.response.data.message)
                            : setErrText(error.response.data)
                        : setErrText("Something went wrong, try again later.");
                });
        } else {
            setLoading(false);
        }
    };
    const newUserView = (
        <VStack spacing={5} align="flex-start" maxW="400px" mt="12">
            <Text fontSize="xx-large" fontWeight="bold">
                <BiArrowBack
                    size={40}
                    color="white"
                    style={{ display: "inline", marginTop: -4, cursor: "pointer" }}
                    onClick={() => window.location.assign("/")}
                />
                &nbsp;Create Expert Account
            </Text>

            <Text fontSize="md" color="gray.600">
                Let’s get you started with Tacare MapShare!
            </Text>
            <Text fontSize="md" fontWeight="bold">
                Name
            </Text>
            <HStack spacing={4} w="full">
                <Input variant="outline" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input variant="outline" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {nameErr ? <HiExclamationCircle style={{ display: "inline" }} color="#EE0004" size="56" /> : null}
            </HStack>

            <Text fontSize="md" fontWeight="bold">
                Email Address
            </Text>
            <HStack spacing={4} w="full">
                <Input
                    isInvalid={emailErr}
                    errorBorderColor="red.300"
                    variant="outline"
                    placeholder="Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                />
                {emailErr ? <HiExclamationCircle style={{ display: "inline" }} color="#EE0004" size="24" /> : null}
            </HStack>

            {/* <Text fontSize="md" fontWeight="bold">
                User Type
            </Text>
            <Select placeholder="" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option style={{ backgroundColor: globalVars.colors.gray1 }} value="user">
                    Stakeholder/Expert
                </option>
                <option style={{ backgroundColor: globalVars.colors.gray1 }} value="admin">
                    GIS User/Admin
                </option>
            </Select> */}

            <Text fontSize="md" fontWeight="bold">
                Password
            </Text>
            <VStack w="full">
                <HStack spacing={4} w="full">
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick} _hover={{ backgroundColor: globalVars.colors.gray1 }}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {passErr ? <HiExclamationCircle style={{ display: "inline" }} color="#EE0004" size="24" /> : null}
                </HStack>
                {passErr ? (
                    <Text fontSize="md" color="red.300">
                        Your password must be at least 6 characters in length.
                    </Text>
                ) : null}
            </VStack>

            <Text fontSize="md" color="red.300">
                {errText}
            </Text>
            <Flex w="full" justify="center">
                <BlueButton text={`   Register   `} width="full" onClick={registerHandler} loading={loading} />
            </Flex>
            <Button w="full" _hover={{ backgroundColor: globalVars.colors.gray2 }} onClick={() => window.location.assign("/login")}>
                Login
            </Button>
        </VStack>
    );

    const accountCreated = (
        <VStack spacing={8} align="center" maxW="450px">
            <Text fontSize="xx-large" fontWeight="bold" textAlign="center">
                Your account has been created 🚀
            </Text>
            <Link href={"/login"} color="brand.100">
                <BlueButton text={`   Login   `} width="350px" />
            </Link>
        </VStack>
    );
    return (
        <>
            <Flex minH="70vh" align="center" justify="center">
                {regComplete ? accountCreated : newUserView}
            </Flex>
        </>
    );
}
