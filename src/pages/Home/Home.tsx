/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useState } from "react";

import { Flex, Heading, Box, SimpleGrid } from "@chakra-ui/react";
import { Scene } from "@esri/react-arcgis";
import GlobeMap from "./GlobeMap";

export function Home(): React.ReactElement {
    return (
        <>
            {/* <SimpleGrid columns={{base: 1, md: 2}} spacing={4} w="full"> */}

            {/* </Flex flexDirection="column" w="full" padding={4} justify="center" align="center" h="full"> */}
            <div style={{ height: "600px" }}>
                <GlobeMap />
            </div>
            {/* </Flex> */}
            {/* </SimpleGrid> */}
        </>
    );
}
