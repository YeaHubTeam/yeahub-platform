import { screen } from '@testing-library/react';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { Card } from './Card';

describe('Card', () => {
	test('renders basic card with children', () => {
		renderComponent(<Card>Card Content</Card>);
		expect(screen.getByText('Card Content')).toBeInTheDocument();
	});

	test('renders with title', () => {
		renderComponent(<Card title="Test Title">Content</Card>);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	test('renders without title and actionRoute', () => {
		const { container } = renderComponent(<Card>Content</Card>);

		const header = container.querySelector('.card-header');
		expect(header).not.toBeInTheDocument();

		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	test('renders with action link', () => {
		renderComponent(
			<Card actionRoute="/test" actionTitle="Test Action">
				Content
			</Card>,
		);
		const link = screen.getByTestId('Card_Link');
		expect(link).toBeInTheDocument();
		expect(link.closest('a')).toHaveAttribute('href', '/test');
	});

	test('renders disabled action', () => {
		renderComponent(
			<Card actionRoute="/test" actionTitle="Test Action" actionDisabled>
				Content
			</Card>,
		);
		const link = screen.getByText('Test Action').closest('a');
		expect(link).toHaveClass('link-disabled');
	});

	test('does not show expand button for short content', () => {
		renderComponent(
			<Card expandable>
				<div style={{ height: '100px' }}>Short Content</div>
			</Card>,
		);
		expect(screen.queryByText(Translation.EXPAND)).not.toBeInTheDocument();
	});

	test('applies shadow classes correctly', () => {
		const { container } = renderComponent(
			<Card withShadow withOutsideShadow>
				Content
			</Card>,
		);
		expect(container.firstChild).toHaveClass('card-outside-shadow');
		expect(container.querySelector('.content')).toHaveClass('content-shadow');
	});

	test('applies bottom position for action', () => {
		const { container } = renderComponent(
			<Card actionRoute="/test" actionTitle="Test" isActionPositionBottom>
				Content
			</Card>,
		);
		expect(container.querySelector('.link')).toHaveClass('link-bottom');
		expect(container.querySelector('.content')).toHaveClass('content-bottom');
	});

	test('centers title when isTitleCenter is true', () => {
		renderComponent(
			<Card title="Test" isTitleCenter>
				Content
			</Card>,
		);
		expect(screen.getByTestId('Card_Header')).toHaveClass('card-header-title-center');
	});
});
