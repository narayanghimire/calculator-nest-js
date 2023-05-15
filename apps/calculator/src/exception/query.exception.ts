export class QueryException extends Error {
  static throwIsNotBase64IncodedString(): never {
    throw new QueryException(
      'Invalid string is given, Please provide base64 encoded string',
    );
  }
  static throwInvalidString(): never {
    throw new QueryException('cannot decode given base64 encoded string');
  }
}
