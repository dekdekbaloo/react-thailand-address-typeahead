const finder = require('../finder');

describe('Address finder test', () => {
  beforeAll(() => {
    finder.init(require('../../address.json'));
  });
  it('should able to parse JSON to JQL object', () => {
    const result = finder.resolveResultbyField(finder.fieldsEnum.AMPHOE, 'บาง');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return result correctly and include searchStr in target field', () => {
    const result = finder.resolveResultbyField(finder.fieldsEnum.PROVINCE, 'นคร');
    const matching = expect.stringMatching(/นคร/);
    const i = Math.round(Math.random() * result.length);
    expect(result[i].province).toEqual(matching);
  });
});
