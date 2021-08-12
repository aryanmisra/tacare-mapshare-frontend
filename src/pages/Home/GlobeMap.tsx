import React, {useState, useEffect} from "react";
import {loadModules} from "esri-loader";
import {Scene} from "@esri/react-arcgis";
import {conservationState} from "../../store";
import {useRecoilValue} from "recoil";
// import Feature from "esri/widgets/Feature";
// import { resourceLimits } from "worker_threads";
import {polygon1, polygon2, polygon3, polygon4} from "./polygons";
import * as globalVars from "../../globalVars"

interface globeState {
    status: string;
    map: any | null;
    view: any | null;
    editorLoaded: boolean;
    layer:any;
}

function getDepth(arr:any[], depth:number):any {
    if (!arr[0]) {
        return depth
    }
    else {
        return getDepth(arr[0], depth + 1)
    }
}

function processPolygon(arr:any[]):any {
    if (getDepth(arr, 0) == 3) {
        return arr
    }
    const temp = []
    for (let i =0;i<arr.length;i++) {
        temp.push(...arr[i])
    }
    return processPolygon(temp)
}

let easternChimpanzeeLayer: any;
let graphics: any = [];
const fields = [
    {
        name: "ID_NO",
        alias: "ID_NO",
        type: "oid"
    }, {
        name: "POPULATION",
        alias: "POPULATION",
        type: "string"
    }, {
        name: "SUBSPECIES",
        alias: "SUBSPECIES",
        type: "string"
    },{
        name: "BINOMIAL",
        alias: "BINOMIAL",
        type: "string"
    },{
        name: "CITATION",
        alias: "CITATION",
        type: "string"
    }, {
        name: "COMPILER",
        alias: "COMPILER",
        type: "string"
    },
    {
        name: "YEAR",
        alias: "YEAR",
        type: "integer"
    }];


export default class GlobeMap extends React.Component<any, globeState> {
    constructor (props: any) {
        super(props);
        this.state = {
            status: "loading",
            map: null,
            view: null,
            editorLoaded: false,
            layer:null,
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleFail = this.handleFail.bind(this);
    }

    switchLayers = (newLayer:any) => {
        this.state.layer.queryFeatures().then((result: any) => {
            this.state.layer.applyEdits({deleteFeatures:result.features})
        });
        if (this.state.layer) {
            this.state.layer.applyEdits({addFeatures:newLayer})
        }
    }

    loadLayer = () => {
        loadModules(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/Polygon"]).then(([Graphic, GraphicsLayer, Polygon]) => {
            const graphicsLayer = new GraphicsLayer();
            this.state.map.add(graphicsLayer);
            const polygonGraphic1 = new Graphic({
                geometry: new Polygon(processPolygon(polygon1)),
                attributes: {
                    ID_NO: 15933,
                    POPULATION: 12000,
                    SUBSPECIES: "ellioti",
                    BINOMIAL: "Pan troglodytes",
                    CITATION: "IUCN (International Union for Conservation of Nature)",
                    COMPILER: "IUCN SSC A.P.E.S. Database",
                    YEAR: "2018"
                },
            });
            const polygonGraphic2 = new Graphic({
                geometry: new Polygon(processPolygon(polygon2)),
                attributes: {
                    ID_NO: 12943,
                    POPULATION: 2400,
                    SUBSPECIES: "troglodytes",
                    BINOMIAL: "Pan troglodytes",
                    CITATION: "IUCN (International Union for Conservation of Nature)",
                    COMPILER: "UNEP-WCMC, Lilian Pintea, Jane Goodall Institute",
                    YEAR: "2018"
                },
            });
            const polygonGraphic3 = new Graphic({
                geometry: new Polygon(processPolygon(polygon3)),
                attributes: {
                    ID_NO: 95441,
                    POPULATION: 105,
                    SUBSPECIES: "schweinfurthii",
                    BINOMIAL: "Pan troglodytes",
                    CITATION: "IUCN (International Union for Conservation of Nature)",
                    COMPILER: "Lilian Pintea, Jane Goodall Institute, IUCN SSC A.P.E.S. Database",
                    YEAR: "2018"
                },
            });
            const polygonGraphic4 = new Graphic({
                geometry: new Polygon(processPolygon(polygon4)),
                attributes: {
                    ID_NO: 61445,
                    POPULATION: 10000,
                    SUBSPECIES: "verus",
                    BINOMIAL: "Pan troglodytes",
                    CITATION: "IUCN (International Union for Conservation of Nature)",
                    COMPILER: "IUCN SSC A.P.E.S. Database",
                    YEAR: "2018"
                },
            });
            graphics = [polygonGraphic1, polygonGraphic2, polygonGraphic3, polygonGraphic4]
        }).then(() => {

            loadModules(["esri/layers/FeatureLayer"])
                .then(([FeatureLayer]) => {
                    easternChimpanzeeLayer = new FeatureLayer({
                        supportsEditing: true,
                        supportsAdd: true,
                        source: [graphics[2], graphics[3]],
                        fields: fields,
                        objectIdField: "ID_NO",
                        renderer: {
                            type: "simple",
                            symbol: {
                                type: "simple-fill",
                                color: [76, 129, 205, 191],
                                outline: {
                                    color: [0, 0, 0, 255],
                                    width: 0.75
                                }
                            }
                        },
                        useStandardizedQueries : true, 
                        geometryType : "polygon", 
                        minScale : 0, 
                        maxScale : 0, 
                        extent : {
                            xmin : -1731734.5940793492, 
                            ymin : -935049.44157227, 
                            xmax : 4205486.5859548226, 
                            ymax : 4202463.7441516332, 
                            spatialReference : {
                                wkid : 102100, 
                                latestWkid : 3857
                            }
                        }, 
                        allowGeometryUpdates : true, 
                        hasAttachments : false, 
                        hasStaticData : false,
                        hasM : false, 
                        hasZ : false, 
                        hasGeometryProperties : true, 
                        geometryProperties : 
                        {
                            shapeAreaFieldName : "Shape__Area", 
                            shapeLengthFieldName : "Shape__Length", 
                            units : "esriMeters"
                        }, 
                        labelingInfo: [
                            {
                                labelExpressionInfo: {expression: "$feature.POPULATION"},
                                symbol: {
                                    type: "text",
                                    color: "black",
                                    haloSize: 0.7,
                                    haloColor: "white",
                                },
                            },
                        ],
                        popupTemplate: globalVars.ChimpLayerWidgetConfig,
                        outFields: ["POPULATION", "BINOMIAL", "CITATION", "COMPILER", "ID_NO", "SUBSPECIES", "YEAR",],
                        title: "Chimpanzee",

                    });
                    if (!this.state.layer) {
                        this.state.map.add(easternChimpanzeeLayer);
                    }
                    this.setState({layer:easternChimpanzeeLayer});
                    setTimeout(() => {
                        this.switchLayers([graphics[0], graphics[1]])
                    }, 2000);
                })
        });
    }

    componentDidUpdate() {
        // if the view exists
        if (this.state.map && this.state.view && !this.state.editorLoaded) {
            this.loadLayer()
            // load the editor widget
            loadModules(["esri/widgets/Editor"]).then(([Editor]) => {
                const editor = new Editor({
                    view: this.state.view,
                });
                // add widget to the view
                this.state.view.ui.add(editor, "top-right");
            });
            // add a layer click listener
            this.state.view.on("click", (event: any) => {
                const opts = {
                    include: easternChimpanzeeLayer,
                };
                this.state.view.hitTest(event, opts).then(function (response: any) {
                    if (response.results.length) {
                        // attributes of a clicked layer can be accessed here
                        // console.log(response.results[0].graphic.attributes);
                    }
                });
            });
            this.setState({editorLoaded: true});
        }
        if (this.props.mapEditMode && this.state.editorLoaded) {
            document.getElementsByClassName("esri-ui-top-right")[0].style.display = "auto";
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
            >
            </Scene>
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
