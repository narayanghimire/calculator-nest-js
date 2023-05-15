export class CalculationException extends Error {
  static throwCalculationException(): never {
    throw new CalculationException(
      'cannot perform calculation on given string',
    );
  }

  static throwCannotSaveCalculatedValueException() {
    throw new CalculationException(
      'unable to save calculated value in database',
    );
  }

  static throwCalculationHistoryException(): never {
    throw new CalculationException(
      'unable to get calculation history from database',
    );
  }
}
