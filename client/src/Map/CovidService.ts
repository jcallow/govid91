

export interface CovidData {
    id: string,
    displayName: string,
    areas: Array<CovidData>,
    totalConfirmed: number,
    totalDeaths: number,
    totalRecovered: number,
    lastUpdated: Date,
    lat: number,
    long: number,
    parentId: string
}

export class CovidService {

    fetchCovidData(): Promise<CovidData> {
        return fetch("http://localhost:44000/covid")
            .then(res => res.json())
            .then((data) => {
                return <CovidData> data;
            })
    }

}