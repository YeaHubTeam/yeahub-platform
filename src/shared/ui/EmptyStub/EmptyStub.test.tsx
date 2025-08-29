import { fireEvent, screen } from '@testing-library/react';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';
import { emptyStubTestIds } from '@/shared/ui/EmptyStub/constants';

import { EmptyStub, EmptyStubProps } from './EmptyStub';

jest.mock('@/shared/hooks/useScreenSize', () => ({
	useScreenSize: jest.fn(),
}));

const mockedUseScreenSize = useScreenSize as jest.Mock;

const render = (props?: EmptyStubProps) => {
	renderComponent(<EmptyStub {...props} />);
};

describe('EmptyStub', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseScreenSize.mockReturnValue({ isMobileS: false });
	});

	test('render button', () => {
		render();

		const Button = screen.getByTestId(emptyStubTestIds.emptyStubButton);

		expect(Button).toBeInTheDocument();
		expect(Button).toHaveClass('button', 'button-large');
		expect(Button).toHaveTextContent(Translation.STUB_FILTER_SUBMIT);
	});
	test('button click triggers resetFilters callback', () => {
		const mockResetFilters = jest.fn();

		render({ resetFilters: mockResetFilters });

		const Button = screen.getByTestId(emptyStubTestIds.emptyStubButton);
		fireEvent.click(Button);

		expect(mockResetFilters).toHaveBeenCalledTimes(1);
	});
	test('render on desktop/tablet/mobile screen size', () => {
		render();

		const Text = screen.getByTestId(emptyStubTestIds.emptyStubText);

		expect(Text).toBeInTheDocument();
		expect(Text).toHaveClass('body5-accent', 'text');
	});
	test('render on mobileS screen size', () => {
		mockedUseScreenSize.mockReturnValue({ isMobileS: true });

		render();

		const Text = screen.getByTestId(emptyStubTestIds.emptyStubText);

		expect(Text).toBeInTheDocument();
		expect(Text).toHaveClass('body2-accent', 'text');
	});
	test('render without text prop)', () => {
		render();

		const Text = screen.getByTestId(emptyStubTestIds.emptyStubText);

		expect(Text).toHaveTextContent(Translation.STUB_FILTER_TITLE);
	});
	test('render with text prop', () => {
		render({ text: 'hello' });

		const Text = screen.getByTestId(emptyStubTestIds.emptyStubText);

		expect(Text).toHaveTextContent(Translation.STUB_FILTER_TITLE);
	});
});
