import { ClientMiddleware } from '../../../../../src/Calculator/Http/Middlewares/client.middleware';
import { ClientIdentifierException } from '../../../../../src/Calculator/Exception/client.identifier.exception';
import { VALID_CLIENT } from '../../../../../src/Calculator/Constants/constants';

describe('ClientMiddleware', () => {
  let middleware: ClientMiddleware;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    middleware = new ClientMiddleware();
    req = {
      headers: {},
    };
    res = {};
    next = jest.fn();
  });

  it('should call next() if x-client header is present and valid', () => {
    req.headers['x-client'] = VALID_CLIENT;

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw ClientIdentifierException.noHeaderFound() if x-client header is missing', () => {
    expect(() => {
      middleware.use(req, res, next);
    }).toThrow(ClientIdentifierException);
    expect(() => {
      middleware.use(req, res, next);
    }).toThrowError('x-client header is missing');
  });

  it('should throw ClientIdentifierException.invalidHeader() if x-client header is present but invalid', () => {
    req.headers['x-client'] = 'invalid-client';
    expect(() => {
      middleware.use(req, res, next);
    }).toThrow(ClientIdentifierException);
    expect(() => {
      middleware.use(req, res, next);
    }).toThrowError('x-client header is missing');
  });
});
