import React from "react";

import {CovidData, CovidService} from "./CovidService";
import ReactGlobe, {MarkerOptions, MarkerType} from "react-globe";

import {Marker} from "react-globe"

interface MapComponentState {
    covidData: CovidData,
    loaded: boolean
}

interface MapComponentProps {
    covidService: CovidService
}

interface CovidMarker extends Marker {
    deaths: number
}

export const covidMarkerOptions: MarkerOptions = {
    activeScale: 1.02,
    enableGlow: false,
    enableTooltip: true,
    enterAnimationDuration: 2000,
    enterEasingFunction: ['Linear', 'None'],
    exitAnimationDuration: 1000,
    exitEasingFunction: ['Cubic', 'Out'],
    getTooltipContent: marker => JSON.stringify(marker.deaths),
    glowCoefficient: 0,
    glowPower: 3,
    glowRadiusScale: 2,
    offsetRadiusScale: 0,
    radiusScaleRange: [0.1, 1],
    type: MarkerType.Bar,
};


export class MapComponent extends React.Component<MapComponentProps, MapComponentState> {

    constructor(props: MapComponentProps) {
        super(props);
        this.state = {
            loaded: false,
            covidData: {} as CovidData
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.props.covidService.fetchCovidData().then((data) => {
                console.log("updated");
                this.setState(
                    {
                        loaded: true,
                        covidData: data
                    }
                )
            });
        }, 1000*60)
    }

    render() {
        if (!this.state.loaded) {
            this.props.covidService.fetchCovidData().then((data) => {
                this.setState(
                    {
                        loaded: true,
                        covidData: data
                    }
                )
            })
            return <div>loading</div>
        } else {

            const entries = new Array<Marker>();

            for (let i = 0; i < this.state.covidData.areas.length; i++) {
                let country: CovidData = this.state.covidData.areas[i];
                for (let j = 0; j < country.areas.length; j++) {
                    let area = country.areas[j];
                    let marker: CovidMarker = {
                        id: 1,
                        city: area.displayName,
                        color: 'red',
                        coordinates: [area.lat, area.long],
                        value: area.totalConfirmed,
                        deaths: area.totalDeaths
                    }
                    if (marker.value != undefined && marker.value > 0) entries.push(marker)

                }
            }

            return (
                <ReactGlobe
                    globeOptions={{


                    }}
                    markers={entries}
                    markerOptions={covidMarkerOptions}
                    />
            );
        }
    }
}

