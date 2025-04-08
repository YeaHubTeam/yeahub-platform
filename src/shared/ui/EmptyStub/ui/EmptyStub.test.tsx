import { fireEvent, screen } from '@testing-library/react';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

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

	test('render on desktop/tablet/mobile screen size', () => {
		render();

		const Text = screen.getByTestId('Text');
		const Button = screen.getByTestId('Button');

		expect(Text).toBeInTheDocument();
		expect(Text).toHaveClass('body5-accent', 'text');
		expect(Button).toBeInTheDocument();
		expect(Button).toHaveClass('button', 'button-large');
	});
	test('render on mobileS screen size', () => {
		mockedUseScreenSize.mockReturnValue({ isMobileS: true });

		render();

		const Text = screen.getByTestId('Text');
		const Button = screen.getByTestId('Button');

		expect(Text).toBeInTheDocument();
		expect(Text).toHaveClass('body2-accent', 'text');
		expect(Button).toBeInTheDocument();
		expect(Button).toHaveClass('button', 'button-large');
	});
	test('button click triggers resetFilters callback', () => {
		const mockResetFilters = jest.fn();

		render({ resetFilters: mockResetFilters });

		const button = screen.getByTestId('Button');
		fireEvent.click(button);

		expect(mockResetFilters).toHaveBeenCalledTimes(1);
	});
	test('render without text prop)', () => {
		render();

		const Text = screen.getByTestId('Text');
		const Button = screen.getByTestId('Button');

		expect(Text).toHaveTextContent('Test text');
		expect(Button).toHaveTextContent('Test button');
	});
	test('render with text prop', () => {
		render({ text: 'hello' });

		const Text = screen.getByTestId('Text');
		const Button = screen.getByTestId('Button');

		expect(Text).toHaveTextContent('Test text “hello”');
		expect(Button).toHaveTextContent('Test button');
	});
});
