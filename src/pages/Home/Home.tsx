/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {useEffect, useRef, useState} from "react";

import {
    Flex,
    Heading,
    Box,

    SimpleGrid,

} from "@chakra-ui/react";
import {Scene} from '@esri/react-arcgis';
import MyFeatureLayer from './MonkeyMap';


export function Home(): React.ReactElement {

    return (
        <>

            {/* <SimpleGrid columns={{base: 1, md: 2}} spacing={4} w="full"> */}

            {/* </Flex flexDirection="column" w="full" padding={4} justify="center" align="center" h="full"> */}
            <div style={{height: "600px"}}>
                <Scene
                    mapProperties={{basemap: 'national-geographic'}}
                    viewProperties={{
                        center: [-70, 25],
                        zoom: 4
                    }}>
                    <MyFeatureLayer
                        featureLayerProperties={{
                            url: 'https://services3.arcgis.com/LyHBUBQ7sNYDeUPl/arcgis/rest/services/redlist_species_data_7b024e640fd848a2adf08e43737b5cb3/FeatureServer/0'
                        }}
                    >
                    </MyFeatureLayer>
                </Scene>
            </div>
            {/* </Flex> */}
            {/* </SimpleGrid> */}
        </>
    );
}
