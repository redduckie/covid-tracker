import { types } from './action-types';
import { getCountryCases, getCountryHistorical } from '../apis/api';
import _ from 'lodash';
import moment from 'moment';

export {
    getCountryCasesData
    , getHistoricalCasesData
};


function getCountryCasesData(yesterday) {
    return function action(dispatch) {
        const cases = getCountryCases(yesterday);
        cases.then(res => {
            dispatch(countryCasesSuccess(_.map(res, r =>
                ({
                    country: r.country,
                    active: r.active,
                    total: r.cases,
                    new: r.todayCases,
                    recovered: r.recovered,
                    deaths: r.deaths,
                    newDeath: r.todayDeaths,
                    tests: r.tests,
                    flag: r.countryInfo.flag,
                    iso2: r.countryInfo.iso2,
                    iso3: r.countryInfo.iso3,
                    lat: r.countryInfo.lat,
                    long: r.countryInfo.long
                }
                ))))
        });

    }

}

function getHistoricalCasesData(country) {
    return function action(dispatch) {
        const historicalData = getCountryHistorical(country);

        historicalData.then(res => {
            dispatch(historicalCasesSuccess(_(res).map(h => ({
                cases: h.Cases,
                status: h.Status,
                date: h.Date,
                confirmed: h.Status === "confirmed" ? h.Cases : null,
                deaths: h.Status == "deaths" ? h.Cases : null,
                recovered: h.Status == "recovered" ? h.Cases : null
            })).orderBy('date').groupBy('date').map((casesData, date) => ({
                reportDate: moment(date).format("MMM DD"),
                confirmed: _.sumBy(casesData, 'confirmed'),
                deaths: _.sumBy(casesData, 'deaths'),
                deathPercent: (_.sumBy(casesData, "deaths") / _.sumBy(casesData, "confirmed") * 100),
                recovered: _.sumBy(casesData, 'recovered'),
                active: _.sumBy(casesData, 'confirmed') - _.sumBy(casesData, 'recovered') - _.sumBy(casesData, 'deaths')
            })).value()))
        });
    }
}

const countryCasesSuccess = (data) => {
    return { type: types.COUNTRIES, data };
}

function historicalCasesSuccess(data) {
    return { type: types.HISTORICAL, data };
}