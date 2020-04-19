import React, { useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCountryCasesData } from '../../../actions/cases-data-actions'
import { Button } from 'antd';

const InfectionMap = (props) => {

  const { countryCases } = useSelector(state => ({
    ...state.casesReducer
  }));
  const dispatch = useDispatch();
  useEffect((props) => {
    dispatch(getCountryCasesData(false));
  },[])
  return (

    <>
      {countryCases && <div>{countryCases[0].country}</div>}
    </>
  )
}

export default InfectionMap;