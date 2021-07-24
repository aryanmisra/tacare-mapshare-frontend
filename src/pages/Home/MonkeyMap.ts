import {useState, useEffect} from 'react';
import {loadModules} from 'esri-loader';

const MyFeatureLayer = (props: any) => {
    const [myFeatureLayer, setMyFeatureLayer] = useState(null);
    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
            // const myFeatureLayer = new FeatureLayer({
            //     url: props.featureLayerProperties.url,
            //     displayField: "FID"
            // });
            const myFeatureLayer = new FeatureLayer({
                url: props.featureLayerProperties.url,
                title: "Monkeys",
                editingEnabled: true,
                // renderer: {
                //     type: "simple-fill",
                //     color: [227, 139, 79, 0.8],  // autocasts as new SimpleRenderer()
                //     // symbol: {
                //     //     type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                //     //     size: 6,
                //     //     color: "black",
                //     //     outline: {  // autocasts as new SimpleLineSymbol()
                //     //         width: 0.5,
                //     //         color: "white"
                //     //     }
                //     // }
                // },
                labelingInfo: [
                    {
                        labelExpressionInfo: {expression: "$feature.ID_NO"},
                        symbol: {
                            type: "text",

                            color: "black",
                            haloSize: 1,
                            haloColor: "white"
                        }
                    }
                ]
            }
            );

            setMyFeatureLayer(myFeatureLayer);
            props.map.add(myFeatureLayer);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.map.remove(myFeatureLayer);
        }
    }, [props]);

    return null;
}

export default MyFeatureLayer;