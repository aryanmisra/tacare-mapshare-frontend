import React, {useState, useEffect} from "react";
import {loadModules} from "esri-loader";
import {Scene} from "@esri/react-arcgis";
import {conservationState} from "../../store";
import {useRecoilValue} from "recoil";
import * as globalVars from "../../globalVars";

interface globeState {
    status: string;
    map: any | null;
    view: any | null;
    editorLoaded: boolean;
    layer: any;
    initalLoad: boolean;
}

function getDepth(arr: any[], depth: number): any {
    if (!arr[0]) {
        return depth;
    } else {
        return getDepth(arr[0], depth + 1);
    }
}

function processPolygon(arr: any[]): any {
    if (getDepth(arr, 0) == 3) {
        return arr;
    }
    const temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp.push(...arr[i]);
    }
    return processPolygon(temp);
}

let easternChimpanzeeLayer: any;
const fields = [
    {
        name: "ID_NO",
        alias: "ID_NO",
        type: "oid",
    },
    {
        name: "POPULATION",
        alias: "POPULATION",
        type: "integer",
    },
    {
        name: "SUBSPECIES",
        alias: "SUBSPECIES",
        type: "string",
    },
    {
        name: "BINOMIAL",
        alias: "BINOMIAL",
        type: "string",
    },
    {
        name: "CITATION",
        alias: "CITATION",
        type: "string",
    },
    {
        name: "COMPILER",
        alias: "COMPILER",
        type: "string",
    },
    {
        name: "YEAR",
        alias: "YEAR",
        type: "integer",
    },
    {
        name: "NAME",
        alias: "NAME",
        type: "string",
    },
];

export default class GlobeMap extends React.Component<any, globeState> {
    constructor (props: any) {
        super(props);
        this.state = {
            initalLoad: false,
            status: "loading",
            map: null,
            view: null,
            editorLoaded: false,
            layer: null,
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleFail = this.handleFail.bind(this);
    }

    formatLayer = (layerInfo: any) => {
        const temp = [];
        layerInfo.map((feature) => {
            temp.push({attributes: feature.attributes, geometry: JSON.stringify(feature.geometry.rings)});
        });
        return temp;
    };

    switchLayers = (newLayer: any) => {
        if (this.state.layer) {
            this.state.layer.queryFeatures().then((result: any) => {
                console.log(result.features);
                this.state.layer.applyEdits({deleteFeatures: result.features});
            });
        }
        if (this.state.layer) {
            this.state.layer.applyEdits({addFeatures: newLayer});
        }
    };

    loadLayer = () => {
        loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
            easternChimpanzeeLayer = new FeatureLayer({
                supportsEditing: true,
                supportsAdd: true,
                source: [],
                fields: fields,
                objectIdField: "ID_NO",
                displayField: "NAME",
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-fill",
                        color: [216, 113, 90, 100],
                        outline: {
                            color: [123, 52, 36, 255],
                            width: 1,
                        },
                    },
                },
                useStandardizedQueries: true,
                geometryType: "polygon",
                minScale: 0,
                maxScale: 0,
                extent: {
                    xmin: -1731734.5940793492,
                    ymin: -935049.44157227,
                    xmax: 4205486.5859548226,
                    ymax: 4202463.7441516332,
                    spatialReference: {
                        wkid: 102100,
                        latestWkid: 3857,
                    },
                },
                allowGeometryUpdates: true,
                hasAttachments: false,
                hasStaticData: false,
                hasM: false,
                hasZ: false,
                hasGeometryProperties: true,
                geometryProperties: {
                    shapeAreaFieldName: "Shape__Area",
                    shapeLengthFieldName: "Shape__Length",
                    units: "esriMeters",
                },
                labelingInfo: [
                    {
                        labelExpressionInfo: {expression: "$feature.POPULATION"},
                        symbol: {
                            type: "text",
                            color: [103, 35, 20, 255],
                            haloSize: 0.4,
                            haloColor: [245, 217, 211, 255],
                        },
                    },
                ],
                popupTemplate: globalVars.ChimpLayerWidgetConfig,
                outFields: ["NAME", "POPULATION", "BINOMIAL", "CITATION", "COMPILER", "ID_NO", "SUBSPECIES", "YEAR"],
                title: "Chimpanzee",
            });
            if (!this.state.layer) {
                this.state.map.add(easternChimpanzeeLayer);
            }
            this.setState({layer: easternChimpanzeeLayer});
        });
    };

    componentDidUpdate(prevProps: any) {
        if (this.props.exportMap[0]) {
            this.state.layer.queryFeatures().then((result: any) => {
                if (this.props.exportMap[1] == "branch") {
                    this.props.publishNewBranch((this.formatLayer(result.features)))
                }
                else {
                    this.props.publishNewModification((this.formatLayer(result.features)))
                }
            });
        }

        if (this.props.homeCommit && !this.state.initalLoad && this.state.layer) {
            this.setState({initalLoad: true});
            this.switchLayers(this.props.homeCommit);
        }
        if (this.props.currentCommit != prevProps.currentCommit) {
            if (this.props.currentCommit) {
                const temp: any = [];
                loadModules(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/Polygon"]).then(([Graphic, GraphicsLayer, Polygon]) => {
                    this.props.currentCommit.features.forEach((feature: any) => {
                        const graphic = new Graphic({
                            geometry: new Polygon(processPolygon(JSON.parse(feature.geometry))),
                            attributes: feature.attributes,
                        });
                        temp.push(graphic);
                    });
                    this.switchLayers(temp);
                });
            } else {
                this.switchLayers(this.props.homeCommit);
            }
        }
        // if the view exists
        if (this.state.map && this.state.view && !this.state.editorLoaded) {
            this.loadLayer();
            // load the editor widget
            loadModules(["esri/widgets/Editor"]).then(([Editor]) => {
                const editor = new Editor({
                    view: this.state.view,
                });
                // add widget to the view
                this.state.view.ui.add(editor, "top-right");
            });
            this.setState({editorLoaded: true});
        }
        if (this.props.mapEditMode && this.state.editorLoaded) {
            document.getElementsByClassName("esri-ui-top-right")[0].style.display = "block";
        } else if (this.state.editorLoaded) {
            document.getElementsByClassName("esri-ui-top-right")[0].style.display = "none";
        }
    }

    render() {
        return (
            <Scene
                onLoad={this.handleMapLoad}
                onFail={this.handleFail}
                mapProperties={{basemap: "national-geographic"}}
                viewProperties={{
                    center: [18, 5],
                    zoom: 1,
                }}
            ></Scene>
        );
    }

    handleMapLoad(map: any, view: any) {
        this.setState({map: map, view: view, status: "loaded"});
        setTimeout(() => {
            this.props.setLoaded(true);
        }, 1500);
    }

    handleFail(e: any) {
        console.error(e);
        this.setState({status: "failed"});
    }
}
