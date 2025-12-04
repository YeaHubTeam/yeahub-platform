import { screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';

import { Landing } from '@/shared/config';
import { renderComponent } from '@/shared/libs/jest';

import { CookiesWarning } from './CookiesWarning';

jest.mock('@/shared/libs', () => ({
	getJSONFromLS: jest.fn(() => null),
	setToLS: jest.fn(),
}));

describe('CookiesWarning', () => {
	let renderResult: RenderResult;

	beforeEach(() => {
		document.body.innerHTML = '';
		jest.clearAllMocks();

		renderResult = renderComponent(<CookiesWarning />);
	});

	test('should render main wrapper and portal', () => {
		const wrapper = screen.getByTestId('CookiesWarning');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('wrapper');
		expect(screen.getByRole('alert')).toBe(wrapper);
		expect(document.getElementById('cookie-root')).not.toBeNull();
	});

	test('should render inner container', () => {
		const inner = document.querySelector('.cookie-wrapper');
		expect(inner).toBeInTheDocument();
	});

	test('should render text and link with correct translations', () => {
		const textBlock = document.querySelector('.text');
		expect(textBlock).toBeInTheDocument();
		expect(textBlock).toHaveTextContent(Landing.COOKIES_TEXT);

		const linkText = document.querySelector('.link');
		expect(linkText).toBeInTheDocument();
		expect(linkText).toHaveTextContent(Landing.COOKIES_LINK);

		const link = screen.getByRole('link', { name: Landing.COOKIES_LINK });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute(
			'href',
			'https://docs.google.com/document/d/19JvySToaMm3pkohGkHwqhJjGl3IzldIc3qnQpAoVFVc/edit?tab=t.0#heading=h.gjdgxs',
		);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	test('should render Agree button with correct classes and text', () => {
		const button = screen.getByTestId('CookiesWarning_AgreeButton');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('btn');
		expect(button.className).toMatch(/button-primary/);
		expect(button).toHaveTextContent(Landing.COOKIES_AGREE);
	});

	test('should save agreement to LS and remove banner and portal when Agree is clicked', async () => {
		const { setToLS } = require('@/shared/libs');

		fireEvent.click(screen.getByTestId('CookiesWarning_AgreeButton'));

		expect(setToLS).toHaveBeenCalledWith('YH-cookie-modal', 'true');

		await waitFor(() => {
			expect(screen.queryByTestId('CookiesWarning')).toBeNull();
			expect(document.getElementById('cookie-root')).toBeNull();
		});
	});

	test('should not render banner if agreement already exists in LS', () => {
		const { getJSONFromLS } = require('@/shared/libs');
		getJSONFromLS.mockReturnValue(true);

		renderResult.unmount();
		renderResult = renderComponent(<CookiesWarning />);

		expect(screen.queryByTestId('CookiesWarning')).toBeNull();
		expect(document.getElementById('cookie-root')).toBeNull();
	});

	test('should remove portal on unmount', () => {
		renderResult.unmount();

		expect(document.getElementById('cookie-root')).toBeNull();
	});

	test('should render banner when LS flag is null', () => {
		const { getJSONFromLS } = require('@/shared/libs');
		getJSONFromLS.mockReturnValue(null);

		renderResult.unmount();
		renderResult = renderComponent(<CookiesWarning />);

		const wrapper = screen.getByTestId('CookiesWarning');
		expect(wrapper).toBeInTheDocument();
		expect(document.getElementById('cookie-root')).not.toBeNull();
	});
});
