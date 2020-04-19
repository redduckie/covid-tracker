import { types } from '../actions/action-types';

export const casesReducer = (state = {}, action) => {
    switch (action.type) {
        case types.COUNTRIES:
            return {
                ...state,
                countryCases: action.data
            };
        case types.HISTORICAL:
            return {
                ...state,
                historicalCases: action.data
            };
        default:
            return state;
    }
}