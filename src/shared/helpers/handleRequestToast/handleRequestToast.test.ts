import '../../config/jest/jestI18n';
import { toast } from '../../ui/Toast/Toast';

import { handleRequestToast } from './handleRequestToast';

jest.mock('../../ui/Toast/Toast', () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));
jest.mock('../../config/jest/jestI18n', () => ({
	t: jest.fn((key) => key),
}));

describe('handleRequestToast', () => {
	const mockOnSuccess = jest.fn();
	const mockOnError = jest.fn();
	const successMessage = 'request.success';
	const failedMessage = 'request.failed';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should show success toast and call onSuccess callback', () => {
		handleRequestToast({
			onSuccess: mockOnSuccess,
			onError: mockOnError,
			successMessage,
			failedMessage,
		});

		expect(toast.success).toHaveBeenCalledWith(successMessage);
		expect(mockOnSuccess).toHaveBeenCalled();
		expect(toast.error).not.toHaveBeenCalled();
		expect(mockOnError).not.toHaveBeenCalled();
	});

	it('should show error toast and call onError callback on failure', () => {
		jest.spyOn(toast, 'success').mockImplementation(() => {
			throw new Error('Toast error');
		});

		handleRequestToast({
			onSuccess: mockOnSuccess,
			onError: mockOnError,
			successMessage,
			failedMessage,
		});

		expect(toast.error).toHaveBeenCalledWith(failedMessage);
		expect(mockOnError).toHaveBeenCalled();
		expect(mockOnSuccess).not.toHaveBeenCalled();
	});

	it('should log error to console when toast fails', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		jest.spyOn(toast, 'success').mockImplementation(() => {
			throw new Error('Toast error');
		});

		handleRequestToast({
			onSuccess: mockOnSuccess,
			onError: mockOnError,
			successMessage,
			failedMessage,
		});

		expect(consoleSpy).toHaveBeenCalled();
		consoleSpy.mockRestore();
	});
});
