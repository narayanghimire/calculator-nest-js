//  this exception could be used by other modules in future so move it to
// src/exception.
export class ClientIdentifierException extends Error {
  static noHeaderFound(): never {
    throw new ClientIdentifierException('x-client header is missing');
  }

  static invalidHeader(): never {
    throw new ClientIdentifierException('x-client header is missing');
  }
}
