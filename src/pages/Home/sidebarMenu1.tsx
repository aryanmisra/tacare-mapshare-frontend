import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import * as globalVars from "../../globalVars";
import "./home.css";
import "./sidebar.css";
import { conservationState } from "../../store";
import { useRecoilState } from "recoil";
import Conservation from "../../interfaces/Conservation";
import axios from "axios";

export default function SidebarMenu1({ userType }): React.ReactElement {
    const [conservationGroup, setConservationGroup] = useRecoilState<Conservation>(conservationState);
    const [conservationGroupList, setConservationGroupList] = useState<Conservation[]>([]);
    useEffect(() => {
        axios
            .get(`${globalVars.api}/branch/conservations`)
            .then((response) => {
                setConservationGroupList(response.data);
                setConservationGroup(response.data[0]);
            })
            .catch((error) => console.error);
    }, []);
    const mainMenu = (
        <div className="sidebar-inner-container">
            <div className="sidebar-title-container">
                <h1>TACARE MAPSHARE</h1>
                <h2>Powered by the Jane Goodal Institute</h2>
            </div>
            <Box className="dropdown-container" mt="8">
                <Text fontSize="20px" color="white">
                    Select a Conservation Action Plan
                </Text>

                <Select mt="2" bgColor={globalVars.colors.gray1} border="none" color="white" onChange={(e) => setConservationGroup(JSON.parse(e.target.value))}>
                    {conservationGroupList.map((conservation) => (
                        <option style={{ background: globalVars.colors.gray1 }} value={JSON.stringify(conservation)} key={conservation._id}>
                            {conservation.name}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box className="mission-container" mt="8">
                <Text fontSize="20px" color="white">
                    Our mission
                </Text>
                <Text fontSize="14px" color="white">
                    Nam non elementum odio. Phasellus consequat, felis sed pulvinar accumsan, nisl tellus convallis orci, quis gravida augue diam ac magna.
                    Aliquam interdum ut nibh ut blandit. In congue justo et mi blandit condimentum. Donec odio est, semper nec condimentum sagittis, semper nec
                    ligula. Cras ornare lacus turpis, sit amet maximus felis semper sed. Suspendisse aliquet mi sit amet diam elementum, congue mollis nibh
                    pellentesque. Praesent lobortis non odio eu pulvinar. Aliquam at justo euismod mi sagittis pretium vitae et odio vitae.
                </Text>
            </Box>
        </div>
    );
    return mainMenu;
}
