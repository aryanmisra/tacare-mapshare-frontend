import React, { ReactElement, Suspense } from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { tacareMapShareTheme } from "./theme";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";

import { DefaultNavBar, NavBar } from "./components/NavBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { loadCss } from "esri-loader";

import * as config from "./globalVars";

export const App = (): ReactElement => {
    loadCss();
    return (
        <>
            <RecoilRoot>
                <ChakraProvider theme={tacareMapShareTheme} resetCSS>
                    <BrowserRouter>
                        {/* TODO: implement auth to set loggedOut */}
                        <Suspense fallback={DefaultNavBar()}>
                            <NavBar />
                        </Suspense>

                        <Box p={{ base: 4, md: 8 }}>
                            <Suspense fallback={<></>}>
                                <Container maxW="container.xl">
                                    <Switch>
                                        <Route path="/login">
                                            <Login />
                                        </Route>
                                        <Route path="/register">
                                            <Register />
                                        </Route>

                                        <PrivateRoute path="/profile">
                                            <Profile />
                                        </PrivateRoute>
                                        <Route path="/home">
                                            <Redirect to="/" />
                                        </Route>
                                        <Route path="/">
                                            <Home />
                                        </Route>
                                    </Switch>
                                </Container>
                            </Suspense>
                        </Box>
                    </BrowserRouter>
                </ChakraProvider>
            </RecoilRoot>
        </>
    );
};
