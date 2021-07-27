import React, { ReactElement, useState } from "react";
import { VStack, Text, Input, Flex, LinkOverlay, Link, HStack, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { HiExclamationCircle } from "react-icons/hi";
import { BlueButton } from "../../components/BlueButton/BlueButton";
import { login, register } from "../../services/auth";
import * as globalVars from "../../globalVars";

export function Login(): ReactElement {
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [errText, setErrText] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const validate = () => {
        if (globalVars.regEmail.test(email) && password.length >= 6) {
            setEmailErr(false);
            setPassErr(false);
            return true;
        } else {
            setEmailErr(!globalVars.regEmail.test(email));
            setPassErr(password.length < 6);
            return false;
        }
    };
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const loginHandler = () => {
        if (validate()) {
            setLoading(true);
            login(email, password)
                .then(() => {
                    setLoading(false);
                    window.location.assign("/");
                })
                .catch((error: any) => {
                    setLoading(false);
                    //TODO: revise response status codes
                    if (error.response) {
                        if (error.response.status === 401) {
                            setErrText("Invalid username/password.");
                        }
                    } else {
                        setErrText("Error");
                        console.log(error);
                    }
                });
        }
    };

    const loginView = (
        <VStack spacing={6} align="flex-start" maxW="450px">
            <Text fontSize="xx-large" fontWeight="bold">
                Login to Tacare MapShare
            </Text>
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
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
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
            <BlueButton text={`   Login  `} onClick={loginHandler} w="full" loading={loading} />
            <Button w="full" onClick={() => window.location.assign("/register")}>
                Register
            </Button>
        </VStack>
    );

    return (
        <>
            <Flex minH="70vh" align="center" justify="center">
                {loginView}
            </Flex>
        </>
    );
}
