import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useScreenSize, renderComponent } from '@/shared/libs';

import { mockSpecialization } from './mockSpecialization';
import { SpecializationBlock } from './SpecializationBlock';

jest.mock('@/shared/libs/dom', () => ({
	useScreenSize: jest.fn(),
}));

const mockUseScreenSize = require('@/shared/libs/dom').useScreenSize;

const createScreenSizeMock = (overrides: Partial<ReturnType<typeof useScreenSize>> = {}) => {
	return {
		isDesktop: false,
		isTablet: false,
		isSmallScreen: false,
		isLaptop: false,
		isMobileM: false,
		isDesktopS: false,
		isLargeScreen: false,
		isMobile: false,
		isMobileS: false,
		...overrides,
	};
};

describe('SpecializationBlock', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render correctly', () => {
		mockUseScreenSize.mockReturnValue(createScreenSizeMock({ isDesktop: true }));
		renderComponent(<SpecializationBlock />);

		const container = screen.getByTestId('SpecializationBlock');
		expect(container).toBeInTheDocument();
	});

	test('renders correct number of cards on desktop', () => {
		mockUseScreenSize.mockReturnValue(createScreenSizeMock({ isDesktop: true }));
		renderComponent(<SpecializationBlock />);

		const list = screen.getByTestId('SpecializationsCardList');
		expect(list.children).toHaveLength(mockSpecialization.length);
	});

	test('renders button on mobile devices and shows all cards after click', async () => {
		const user = userEvent.setup();

		mockUseScreenSize.mockReturnValue(createScreenSizeMock({ isMobile: true }));
		renderComponent(<SpecializationBlock />);

		const list = screen.getByTestId('SpecializationsCardList');
		expect(list.children).toHaveLength(4);

		const button = screen.getByTestId('SpecializationButton');
		expect(button).toBeInTheDocument();

		await user.click(button);

		expect(list.children).toHaveLength(mockSpecialization.length);
		expect(screen.queryByTestId('SpecializationButton')).not.toBeInTheDocument();
	});

	test('renders button on laptop devices and shows all cards after click', async () => {
		const user = userEvent.setup();

		mockUseScreenSize.mockReturnValue(createScreenSizeMock({ isLaptop: true }));
		renderComponent(<SpecializationBlock />);

		const list = screen.getByTestId('SpecializationsCardList');
		expect(list.children).toHaveLength(6);

		const button = screen.getByTestId('SpecializationButton');
		expect(button).toBeInTheDocument();

		await user.click(button);

		expect(list.children).toHaveLength(mockSpecialization.length);
		expect(screen.queryByTestId('SpecializationButton')).not.toBeInTheDocument();
	});

	test('does not render button on desktop devices', () => {
		mockUseScreenSize.mockReturnValue(createScreenSizeMock({ isDesktop: true }));
		renderComponent(<SpecializationBlock />);

		const button = screen.queryByTestId('SpecializationButton');
		expect(button).not.toBeInTheDocument();
	});
});
