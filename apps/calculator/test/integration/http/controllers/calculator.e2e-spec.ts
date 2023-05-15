import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import * as supertest from 'supertest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { VALID_CLIENT } = require('@app/common/middlewares/valid.client.js');


describe('CalculatorService (e2e)', () => {
  let app: INestApplication;
  let agent: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
    agent = supertest(app.getHttpServer());
  });

  it('/calculus (GET)', () => {
    const query = 'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=';
    return agent
      .get(`/calculus?query=${query}`)
      .set('x-client', VALID_CLIENT)
      .expect(200)
      .expect((res) => {
        expect(res.body.error).toBe(false);
        expect(res.body.result).toBeCloseTo(-132.88888888888889, 5);
      });
  });

  it('/calculus/history (GET)', () => {
    return agent
      .get(`/calculus/history`)
      .set('x-client', VALID_CLIENT)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((item) => {
          expect(item).toHaveProperty('query');
          expect(item).toHaveProperty('result');
        });
      });
  });

  it('/calculus (GET) with invalid query should throw CalculationException', async () => {
    const invalidQuery = 'Invalid String';
    agent
      .get(`/calculus?query=${invalidQuery}`)
      .set('x-client', VALID_CLIENT)
      .expect(400)
      .expect((response) => {
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe(
          'cannot perform calculation on given string',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
