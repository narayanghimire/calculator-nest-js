import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from '../../../src/Services/calculator.service';
import { CalculationException } from '../../../src/Exception/calculation.exception';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN, LOGGER_TOKEN,
} from '../../../src/Constants/constants';


describe('CalculatorService', () => {
  let service: CalculatorService;
  let mockCalculationRepo;
  let mockPersistenceRepo;
  let mockLogger;

  beforeEach(async () => {
    mockCalculationRepo = { calculate: jest.fn() };
    mockPersistenceRepo = {
      saveCalculation: jest.fn(),
      getLastFiveCalculationsHistory: jest.fn(),
    };
    mockLogger = { error: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculatorService,
        {
          provide: CALCULATION_REPOSITORY_TOKEN,
          useValue: mockCalculationRepo,
        },
        {
          provide: CALCULATION_REPOSITORY_PERSIST_TOKEN,
          useValue: mockPersistenceRepo,
        },
        {
          provide: LOGGER_TOKEN,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  describe('calculate', () => {
    it('should return the calculation result if calculation is successful', async () => {
      const query = '2+2';
      mockCalculationRepo.calculate.mockReturnValue(4);
      const result = await service.calculate(query);
      expect(result.getError()).toBe(false);
      expect(result.getResult()).toBe(4);
    });

    it('should throw a CalculationException if calculation fails', async () => {
      const query = '2+2';
      const error = new Error('testing error');
      mockCalculationRepo.calculate.mockImplementation(() => {
        throw error;
      });
      await expect(service.calculate(query)).rejects.toThrow(
        CalculationException,
      );
      expect(mockLogger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('persistCalculation', () => {
    it('should not throw an error if persist is successful', async () => {
      const query = '2+2';
      const result = 4;
      await expect(
        service.persistCalculation(query, result),
      ).resolves.not.toThrow();
    });

    it('should throw a CalculationException if persist fails', async () => {
      const query = '2+2';
      const result = 4;
      const error = new Error('testing error');
      mockPersistenceRepo.saveCalculation.mockImplementation(() => {
        throw error;
      });
      await expect(service.persistCalculation(query, result)).rejects.toThrow(
        CalculationException,
      );
      expect(mockLogger.error).toHaveBeenCalledWith(error);
    });
  });

  describe('getQueryCalculationHistory', () => {
    it('should return the calculation history if retrieval is successful', async () => {
      const history = [{ query: '2+2', result: 4 }];
      mockPersistenceRepo.getLastFiveCalculationsHistory.mockReturnValue(
        history,
      );
      const result = await service.getQueryCalculationHistory();
      expect(result).toBe(history);
    });

    it('should throw a CalculationException if history  fails', async () => {
      const error = new Error();
      mockPersistenceRepo.getLastFiveCalculationsHistory.mockImplementation(
        () => {
          throw error;
        },
      );
      await expect(service.getQueryCalculationHistory()).rejects.toThrow(
        CalculationException,
      );
      expect(mockLogger.error).toHaveBeenCalledWith(error);
    });
  });
});
