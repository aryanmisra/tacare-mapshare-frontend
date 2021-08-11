import React, { useState, useEffect } from "react";
import { loadModules } from "esri-loader";
import { Scene } from "@esri/react-arcgis";
// import Feature from "esri/widgets/Feature";
// import { resourceLimits } from "worker_threads";
import * as globalVars from "../../globalVars"

interface globeState {
  status: string;
  map: any | null;
  view: any | null;
  editorLoaded: boolean;
}

let easternChimpanzeeLayer:any;
let graphics:any = [];


const EastChimpanzeeFeatureLayer = (props: any) => {
    const [layer, setLayer] = useState(null);

    useEffect(() => {
        loadModules(["esri/Graphic", "esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer])=>{
            const graphicsLayer = new GraphicsLayer();
            props.map.add(graphicsLayer);
            graphics = []
            // for (let i=0;i<3;i++){
                const polygon = {
                    type: "polygon",
                    rings: [
                        [-119.8984489994, 36.0137559967283], //Longitude, latitude
                        [-119.806796597377, 34.0215816298725], //Longitude, latitude
                        [-118.791432890735, 34.0163883241613], //Longitude, latitude
                        [-118.79596686535, 34.008564864635],   //Longitude, latitude
                        [-118.808558110679, 34.0035027131376]  //Longitude, latitude
                    ]
                 };
                 const simpleFillSymbol = {
                    type: "simple-fill",
                    color: [0, 0, 0, 0.8],  // Orange, opacity 80%
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                 };
                
                //  const popupTemplate = {
                //     title: "{Name}",
                //     content: "{Description}"
                //  }
                 const attributes = {
                    ASSESSMENT:"ASSESSMENT",
                    BINOMIAL:"BINOMIAL",
                    CITATION:"WWO",
                    COMPILER:"COMPILER",
                    ID_NO:1, 
                    SUBSPECIES:"western chimp", 
                    YEAR:"2019"
                 }
                
                 const polygonGraphic = new Graphic({
                    geometry: polygon,                
                    attributes: attributes,                
                 });
                 graphics = [polygonGraphic]
        }).then(()=>{
            const fields = [
                {
                  name: "ASSESSMENT",
                  alias: "ASSESSMENT",
                  type: "string"
                }, {
                  name: "BINOMIAL",
                  alias: "BINOMIAL",
                  type: "string"
                },
                {
                    name: "CITATION",
                    alias: "CITATION",
                    type: "string"
                  }, {
                    name: "COMPILER",
                    alias: "COMPILER",
                    type: "string"
                  },
                  {
                    name: "ID_NO",
                    alias: "ID_NO",
                    type: "oid"
                  }, {
                    name: "SUBSPECIES",
                    alias: "SUBSPECIES",
                    type: "string"
                  },
                  {
                    name: "YEAR",
                    alias: "YEAR",
                    type: "integer"
                  }];
            loadModules(["esri/layers/FeatureLayer"])
            .then(([FeatureLayer]) => {
                easternChimpanzeeLayer = new FeatureLayer({
                    supportsEditing: true,
                    supportsAdd: true,
                    source: graphics,
                    fields: fields, 
                    objectIdField: "ID_NO", 
                    renderer: {
                        type:"simple",
                        symbol:{
                            type:"simple-fill",
                            color:[76,129,205,191], 
                            outline: {
                                color: [0,0,0,255],
                                width: 0.75
                            }}},
                    spatialReference: {wkid: 4326},
                    labelingInfo: [
                        {
                            labelExpressionInfo: { expression: "$feature.ID_NO" },
                            symbol: {
                                type: "text",
                                color: "black",
                                haloSize: 0.7,
                                haloColor: "white",
                            },
                        },
                    ],
                    geometryType: "polygon",
                    // url: props.featureLayerProperties.url,
                    popupTemplate: globalVars.ChimpLayerWidgetConfig,
                    outFields: ["ASSESSMENT","BINOMIAL","CITATION","COMPILER","ID_NO", "SUBSPECIES", "YEAR",],
                    title: "Chimpanzee",
                    
                });
                setLayer(easternChimpanzeeLayer);
                if (!layer) {
                    console.log(props.map)
                    props.map.add(easternChimpanzeeLayer);
                }
            })
            .catch((err) => console.error(err));
        })

        // return function cleanup() {
        //     props.map.remove(layer);
        // };
    }, []);

    return null;
};

export default class GlobeMap extends React.Component<any, globeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: "loading",
            map: null,
            view: null,
            editorLoaded:false,
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleFail = this.handleFail.bind(this);
    }

    componentDidUpdate() {
      // if the view exists
      if (this.state.view && !this.state.editorLoaded) {
        // load the editor widget
        loadModules(["esri/widgets/Editor"]).then(([Editor]) => {
          const editor = new Editor({
            view: this.state.view
          });
          // add widget to the view
            this.state.view.ui.add(editor, "top-right");
        })
        // add a layer click listener 
        this.state.view.on("click", (event:any) => {
          const opts = {
            include: easternChimpanzeeLayer
          }
          this.state.view.hitTest(event, opts).then(function(response:any) {
            if (response.results.length) {
              // attributes of a clicked layer can be accessed here
              console.log(response.results[0].graphic.attributes)
            }
          });
        });
        this.setState({editorLoaded:true})
      }
        if (this.props.mapEditMode && this.state.editorLoaded) {
            console.log(document.getElementsByClassName("esri-ui-top-right")[0].style.display="auto")
        }
        else if (this.state.editorLoaded){
            console.log(document.getElementsByClassName("esri-ui-top-right")[0].style.display="none")
        }
    }

    render() {
        return (
            <Scene
                onLoad={this.handleMapLoad}
                onFail={this.handleFail}
                mapProperties={{ basemap: "national-geographic", }}
                viewProperties={{
                    center: [18, 5],
                    zoom: 1,
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
        setTimeout(() => {
            this.props.setLoaded(true)
        }, 1500);
    }

    handleFail(e: any) {
        console.error(e);
        this.setState({ status: "failed" });
    }
}