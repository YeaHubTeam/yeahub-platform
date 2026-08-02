import { Translation } from '@/shared/config';

import { handleApiError } from './handleApiError';

describe('handleApiError', () => {
	const mockHandler = jest.fn().mockReturnValue('Handled result string');

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call handler with error data when valid API error is provided', () => {
		const mockApiError = { error: { data: { message: 'invalid api call' } } };

		const result = handleApiError(mockApiError, mockHandler);

		expect(result).toBe('Handled result string');
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
	test('should return default i18n translation when error is null', () => {
		expect(handleApiError(null, mockHandler)).toBe(Translation.ERROR);
		expect(mockHandler).not.toHaveBeenCalled();
	});
});
