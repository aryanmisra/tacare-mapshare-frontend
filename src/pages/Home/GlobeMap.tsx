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

const EastChimpanzeeFeatureLayer = (props: any) => {
    const [layer, setLayer] = useState(null);

    useEffect(() => {
        loadModules(["esri/layers/FeatureLayer"])
            .then(([FeatureLayer]) => {
                easternChimpanzeeLayer = new FeatureLayer({
                    url: props.featureLayerProperties.url,
                    popupTemplate: globalVars.ChimpLayerWidgetConfig,
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
      if (this.state.view) {
        // load the editor widget
        loadModules(["esri/widgets/Editor"]).then(([Editor]) => {
          const editor = new Editor({
            view: this.state.view
          });
          // add widget to the view
          if (!this.state.editorLoaded) {
            this.state.view.ui.add(editor, "top-right");
            this.setState({editorLoaded:true})
          }
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
        }, 0);
    }

    handleFail(e: any) {
        console.error(e);
        this.setState({ status: "failed" });
    }
}