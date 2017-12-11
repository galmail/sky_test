import api from '../data';

export const getTemperatures = () => ({
    type: 'TEMPERATURES_LOADING',
    payload: api.getTemperatures()
});
