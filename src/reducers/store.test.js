import { reducer } from './store';

describe('Testing the Store', () => {

  it('should set temperatures in the store', () => {
    const tempObj = {
      "1512000000": 18.7,
      "1512003600": 18.9,
      "1512007200": 19.2,
      "1512010800": 25
    };

    const updatedStore = reducer({}, { type: 'TEMPERATURES_LOADING_FULFILLED', payload: tempObj });
    expect(updatedStore.temperatures.length).toEqual(Object.keys(tempObj).length);
    const firstTemp = updatedStore.temperatures[0];
    expect(firstTemp.date.getTime() / 1000).toEqual(1512000000);
    expect(firstTemp.value).toBe(18.7);

  });






});





