import React, { useState, useEffect, ReactElement } from "react";
import { loadModules } from "esri-loader";
import { Scene } from "@esri/react-arcgis";
import Feature from "esri/widgets/Feature";
import { resourceLimits } from "worker_threads";

const EastChimpanzeeFeatureLayer = (props: any) => {
    const ChimpPopup = {
        "title": "Chimpanzee Reservation ID #{ID_NO}",
        "spinnerEnabled":true,
        "content": [{
            "type": "fields",
            "fieldInfos": [
              {
                "fieldName": "ASSESSMENT",
                "label": "Assessment",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": null,
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "BINOMIAL",
                "label": "Binomial",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": null,
                "stringFieldOption": "text-box"
              },
  
              {
                "fieldName": "CITATION",
                "label": "Citation",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": {
                  "places": 2,
                  "digitSeparator": true
                },
  
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "COMPILER",
                "label": "Compiler",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": {
                  "places": 2,
                  "digitSeparator": true
                },
  
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "SUBSPECIES",
                "label": "Subspecies",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": {
                  "places": 2,
                  "digitSeparator": true
                },
  
                "stringFieldOption": "text-box"
              },
              {
                "fieldName": "YEAR",
                "label": "Year",
                "isEditable": true,
                "tooltip": "",
                "visible": true,
                "format": {
                  "places": 2,
                  "digitSeparator": true
                },
  
                "stringFieldOption": "text-box"
              }
            ]
          }]}
    const [layer, setLayer] = useState(null);
    useEffect(() => {
        loadModules(["esri/layers/FeatureLayer"])
            .then(([FeatureLayer]) => {
                const easternChimpanzeeLayer = new FeatureLayer({
                    url: props.featureLayerProperties.url,
                    popupTemplate: ChimpPopup,
                    outFields: ["ASSESSMENT","BINOMIAL","CITATION","COMPILER","ID_NO", "SUBSPECIES", "YEAR",],
                    title: "Monkeys",
                    editingEnabled: true,
                    labelingInfo: [
                        {
                            labelExpressionInfo: { expression: "$feature.ID_NO" },
                            symbol: {
                                type: "text",
                                color: "black",
                                haloSize: 1,
                                haloColor: "white",
                            },
                        },
                    ],
                });
                setLayer(easternChimpanzeeLayer);
                props.map.add(easternChimpanzeeLayer);
            })
            .catch((err) => console.error(err));

        return function cleanup() {
            props.map.remove(layer);
        };
    }, [props]);

    return null;
};

export default class GlobeMap extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            status: "loading",
            map: null,
            view: null,
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleFail = this.handleFail.bind(this);
        // this.handlePointerMove = this.handlePointerMove.bind(this);
    }
    render() {
        return (
            <Scene
                // onPointerMove={this.handlePointerMove}
                onLoad={this.handleMapLoad}
                onFail={this.handleFail}
                mapProperties={{ basemap: "national-geographic" }}
                viewProperties={{
                    center: [-70, 25],
                    zoom: 4,
                }}
            >
                <EastChimpanzeeFeatureLayer
                    featureLayerProperties={{
                        url: "https://services3.arcgis.com/LyHBUBQ7sNYDeUPl/arcgis/rest/services/redlist_species_data_7b024e640fd848a2adf08e43737b5cb3/FeatureServer/0",
                    }}
                ></EastChimpanzeeFeatureLayer>
            </Scene>
        );
    }
    handleMapLoad(map: any, view: any) {
        this.setState({ map: map, view: view, status: "loaded" });
    }

    handleFail(e: any) {
        console.error(e);
        this.setState({ status: "failed" });
    }
}