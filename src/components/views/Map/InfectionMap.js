import React, {setState, useState, useEffect} from 'react';

const InfectionMap = () =>{
  [worldCases, setWorldCases]= useState([]);

  useEffect((props)=>{
    getCases
  },[])


  async function getCases() {
    const cases = await getCaseTable(false)
    const data = _.map(cases, r => {
      return {
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
        long:r.countryInfo.long
      };
    });
    setWorldCases(data);
  }

  return(
    <></>
  )
}

export default InfectionMap;