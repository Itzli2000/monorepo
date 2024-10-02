import logger from '../utils/logger';

jest.mock('kleur', () => ({
  __esModule: true,
  default: {
    blue: (msg: string) => msg,
    green: (msg: string) => msg,
    red: (msg: string) => msg,
  },
}));

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => jest.fn());
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('info', () => {
    it('should call console.log with the colored info message', () => {
      const message = 'This is an informational message';
      logger.info(message);
      expect(consoleLogSpy).toHaveBeenCalledWith('\nINFO:', message);
    });
  });

  describe('success', () => {
    it('should call console.log with the colored success message', () => {
      const message = 'Operation was successful!';
      logger.success(message);
      expect(consoleLogSpy).toHaveBeenCalledWith('\nSUCCESS:', message);
    });
  });

  describe('error', () => {
    it('should call console.error with the colored error message when only the message is provided', () => {
      const message = 'An error occurred';
      logger.error(message);
      expect(consoleErrorSpy).toHaveBeenCalledWith('\nERROR:', message);
    });

    it('should call console.error with both the error message and the additional error detail when provided', () => {
      const message = 'An error occurred';
      const errorDetail = 'Error details';
      logger.error(message, errorDetail);
      expect(consoleErrorSpy).toHaveBeenCalledWith('\nERROR:', message);
      expect(consoleErrorSpy).toHaveBeenCalledWith(errorDetail);
    });
  });
});
