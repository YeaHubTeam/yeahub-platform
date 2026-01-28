import { screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { simpleStubTestIds } from './constants';
import { SimpleStub, SimpleStubVariant } from './SimpleStub';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;

const render = (variant: SimpleStubVariant, text: string) => {
	renderComponent(<SimpleStub variant={variant} text={text} />);
};

describe('SimpleStub', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseScreenSize.mockReturnValue({ isMobile: false });
	});

	test('renders correctly with text', () => {
		const testText = 'Test stub text';
		render('empty', testText);

		expect(screen.getByText(testText)).toBeInTheDocument();
	});

	test.each([
		['no-authorized', 'auth-icon'],
		['empty', 'clock-icon'],
		['no-access', 'lock-icon'],
	])('renders correct icon for variant %s', (variant) => {
		render(variant as SimpleStubVariant, 'test');

		const icon = document.querySelector('svg');
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute('width');
		expect(icon).toHaveAttribute('height');
	});

	test('renders with icon size 76 on desktop/tablet', () => {
		mockedUseScreenSize.mockReturnValue({ isMobile: false });
		render('empty', 'test');

		const icon = document.querySelector('svg');
		expect(icon).toHaveAttribute('width', '76');
		expect(icon).toHaveAttribute('height', '76');
	});

	test('renders with icon size 44 on mobile', () => {
		mockedUseScreenSize.mockReturnValue({ isMobile: true });
		render('empty', 'test');

		const icon = document.querySelector('svg');
		expect(icon).toHaveAttribute('width', '44');
		expect(icon).toHaveAttribute('height', '44');
	});

	test('applies correct CSS classes', () => {
		render('empty', 'test');

		const icon = document.querySelector('svg');
		expect(icon).toHaveClass('icon');

		const text = screen.getByText('test');
		expect(text).toHaveClass('text');
	});

	test('constants are defined', () => {
		expect(simpleStubTestIds).toBeDefined();
		expect(simpleStubTestIds.simpleStubIcon).toBeDefined();
		expect(simpleStubTestIds.simpleStubText).toBeDefined();
	});
});
