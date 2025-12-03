import { render, screen, waitFor } from '@testing-library/react';

import { getFromLS, setToLS, removeFromLS } from '@/shared/libs';

import { Timer } from './Timer';

jest.mock('@/shared/libs', () => ({
	getFromLS: jest.fn(),
	setToLS: jest.fn(),
	removeFromLS: jest.fn(),
}));

describe('Timer Component', () => {
	const mockSetIsDisabled = jest.fn();
	const mockSetIsVisible = jest.fn();
	const mockDuration = 10;
	const mockIsTimerStartedKey = 'isTimerStartedKey';
	const mockTimerStartTimeKey = 'timerStartTimeKey';

	const defaultProps = {
		duration: mockDuration,
		setIsDisabled: mockSetIsDisabled,
		setIsVisible: mockSetIsVisible,
		isTimerStartedKey: mockIsTimerStartedKey,
		timerStartTimeKey: mockTimerStartTimeKey,
		isVisible: true,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should start timer when timer is visible and not already started', () => {
		(getFromLS as jest.Mock).mockReturnValue(null);

		render(<Timer {...defaultProps} />);

		expect(getFromLS).toHaveBeenCalledWith(mockIsTimerStartedKey);
		expect(setToLS).toHaveBeenCalledWith(mockTimerStartTimeKey, expect.any(Number));
		expect(setToLS).toHaveBeenCalledWith(mockIsTimerStartedKey, true);
		expect(mockSetIsDisabled).toHaveBeenCalledWith(true);
	});

	it('should render the timer with the correct time left if timer is already started', () => {
		const mockStartTime = Date.now() - 3000;
		(getFromLS as jest.Mock).mockReturnValue(mockStartTime.toString());

		render(<Timer {...defaultProps} />);

		expect(getFromLS).toHaveBeenCalledWith(mockTimerStartTimeKey);
		expect(screen.getByText('7')).toBeInTheDocument();
	});

	it('should clear the interval and localStorage when timer reaches 0', async () => {
		jest.useFakeTimers();

		(getFromLS as jest.Mock).mockReturnValue(Date.now().toString());
		(getFromLS as jest.Mock).mockReturnValueOnce(Date.now().toString()).mockReturnValue(true); // Исправлено
		render(<Timer {...defaultProps} duration={1} />);

		expect(screen.getByText('1')).toBeInTheDocument();

		jest.advanceTimersByTime(1000);

		await waitFor(() => {
			expect(removeFromLS).toHaveBeenCalledWith(mockTimerStartTimeKey);
			expect(removeFromLS).toHaveBeenCalledWith(mockIsTimerStartedKey);
			expect(mockSetIsDisabled).toHaveBeenCalledWith(false);
			expect(mockSetIsVisible).toHaveBeenCalledWith(false);
		});

		jest.useRealTimers();
	});

	it('should render timer plug if timeLeft is 0 and timer is started', () => {
		(getFromLS as jest.Mock).mockReturnValue(Date.now().toString());

		render(<Timer {...defaultProps} duration={0} />);

		const timerPlug = screen.getByTestId('timer-plug');
		expect(timerPlug).toBeInTheDocument();
	});

	it('should decrease the timer every second when timer is visible and running', async () => {
		jest.useFakeTimers();

		(getFromLS as jest.Mock).mockReturnValue(Date.now().toString());

		render(<Timer {...defaultProps} duration={5} />);

		expect(screen.getByText('5')).toBeInTheDocument();

		jest.advanceTimersByTime(1000);

		await waitFor(() => {
			expect(screen.getByText('4')).toBeInTheDocument();
		});

		jest.useRealTimers();
	});

	it('should render the timer with time remaining if the timer has already started', () => {
		const pastTime = Date.now() - 2000;
		(getFromLS as jest.Mock).mockImplementation((key) => {
			if (key === mockTimerStartTimeKey) {
				return pastTime.toString();
			} else if (key === mockIsTimerStartedKey) {
				return true;
			}
			return null;
		});

		render(<Timer {...defaultProps} duration={5} />);

		expect(screen.getByText('3')).toBeInTheDocument();
	});
});
