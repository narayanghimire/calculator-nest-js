import { ClientIdentifierException } from '../../../src/exception/client.identifier.exception';

describe('ClientIdentifierException', () => {
  it('should throw  noHeaderFound', () => {
    expect(() => ClientIdentifierException.noHeaderFound()).toThrowError(
      'x-client header is missing',
    );
  });

  it('should throw invalidHeader', () => {
    expect(() => ClientIdentifierException.invalidHeader()).toThrowError(
      'x-client header is missing',
    );
  });
});
