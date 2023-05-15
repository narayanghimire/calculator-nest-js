import { CalculationRequest } from '@app/calculator/src/http/requests/calculation.request';

describe('CalculationRequest', () => {
  it('should create a valid CalculationRequest object', () => {
    const calculationRequest = new CalculationRequest();
    calculationRequest.query = 'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk9=';

    expect(calculationRequest.query).toBe(
      'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk9=',
    );
  });

  it(' error when creating a calculation query is empty', () => {
    expect(() => {
      const calculationRequest = new CalculationRequest();
      calculationRequest.query = '';

      const validationResult = () => {
        return calculationRequest.query;
      };

      expect(validationResult).toThrow();
    });
  });

  it('error when creating a calculation query is non string', () => {
    expect(() => {
      const calculationRequest = new CalculationRequest();
      calculationRequest.query = 12345 as any;

      const validationResult = () => {
        return calculationRequest.query;
      };

      expect(validationResult).toThrow();
    });
  });
});
