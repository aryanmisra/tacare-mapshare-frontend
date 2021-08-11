import React, { ReactElement, Suspense } from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { tacareMapShareTheme } from "./theme";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { DefaultNavBar, NavBar } from "./components/NavBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { loadCss } from "esri-loader";

import * as config from "./globalVars";

export const App = (): ReactElement => {
    if (!localStorage.getItem("nulled")) {
        console.log("nulling");
        localStorage.clear();
        localStorage.setItem("nulled", JSON.stringify(true));
    }
    loadCss();
    return (
        <>
            <RecoilRoot>
                <ChakraProvider theme={tacareMapShareTheme} resetCSS>
                    <BrowserRouter>
                        {/* TODO: implement auth to set loggedOut */}

                        <Suspense fallback={<></>}>
                            <Container maxW="container.xl">
                                <Switch>
                                    <Route path="/login">
                                        <Login />
                                    </Route>
                                    <Route path="/register">
                                        <Register />
                                    </Route>
                                    <Route path="/home">
                                        <Redirect to="/" />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </Container>
                        </Suspense>
                        {/* </Box> */}
                    </BrowserRouter>
                </ChakraProvider>
            </RecoilRoot>
        </>
    );
};
