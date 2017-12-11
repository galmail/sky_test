import { getTemperatures } from './service';

describe('Testing the Service', () => {

  it('expect getTemperatures to be loading when called', () => {
    const temp = getTemperatures();
    expect(temp.type).toBe('TEMPERATURES_LOADING');
    expect(temp.payload).not.toBe(null);
  });

});
