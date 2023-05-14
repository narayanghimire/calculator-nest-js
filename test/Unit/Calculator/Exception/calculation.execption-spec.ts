import { CalculationException } from '../../../../src/Calculator/Exception/calculation.exception';

describe('CalculationException', () => {
  it('should throw CalculationException', () => {
    expect(() => CalculationException.throwCalculationException()).toThrowError(
      'cannot perform calculation on given string',
    );
  });

  it('should  throwCannotSaveCalculatedValueException', () => {
    expect(() =>
      CalculationException.throwCannotSaveCalculatedValueException(),
    ).toThrowError('unable to save calculated value in database');
  });

  it('should throw throwCalculationHistoryException', () => {
    expect(() =>
      CalculationException.throwCalculationHistoryException(),
    ).toThrowError('unable to get calculation history from database');
  });
});
