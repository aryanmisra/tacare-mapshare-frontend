import React, { useState, useEffect, ReactElement } from "react";
import { loadModules } from "esri-loader";
import { Scene } from "@esri/react-arcgis";
import Feature from "esri/widgets/Feature";
import { resourceLimits } from "worker_threads";

const EastChimpanzeeFeatureLayer = (props: any) => {
    const [layer, setLayer] = useState(null);
    useEffect(() => {
        loadModules(["esri/layers/FeatureLayer"])
            .then(([FeatureLayer]) => {
                const easternChimpanzeeLayer = new FeatureLayer({
                    url: props.featureLayerProperties.url,
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
        this.handlePointerMove = this.handlePointerMove.bind(this);
    }

    render() {
        return (
            <Scene
                onPointerMove={this.handlePointerMove}
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
    handlePointerMove(e: any) {
        this.state.view.hitTest(e).then((e) => {
            e.results.length > 0 &&
                e.results.forEach((result: any) => {
                    console.log(result.graphic);
                });
        });
    }
}
