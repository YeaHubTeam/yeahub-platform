import { render, screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { Card } from './Card';

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: {
			translation: {
				expand: 'Expand',
				collapse: 'Collapse',
			},
		},
	},
});

const renderWithRouter = (component: React.ReactElement) => {
	return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Card Component', () => {
	test('renders basic card with children', () => {
		renderWithRouter(<Card>Card Content</Card>);
		expect(screen.getByText('Card Content')).toBeInTheDocument();
	});

	test('renders with title', () => {
		renderWithRouter(<Card title="Test Title">Content</Card>);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	test('renders without title and actionRoute', () => {
		const { container } = renderWithRouter(<Card>Content</Card>);

		const header = container.querySelector('.card-header');
		expect(header).not.toBeInTheDocument();

		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	test('renders with action link', () => {
		renderWithRouter(
			<Card actionRoute="/test" actionTitle="Test Action">
				Content
			</Card>,
		);
		const link = screen.getByText('Test Action');
		expect(link).toBeInTheDocument();
		expect(link.closest('a')).toHaveAttribute('href', '/test');
	});

	test('renders disabled action', () => {
		renderWithRouter(
			<Card actionRoute="/test" actionTitle="Test Action" actionDisabled>
				Content
			</Card>,
		);
		const link = screen.getByText('Test Action').closest('a');
		expect(link).toHaveClass('link-disabled');
	});

	test('does not show expand button for short content', () => {
		renderWithRouter(
			<Card expandable>
				<div style={{ height: '100px' }}>Short Content</div>
			</Card>,
		);
		expect(screen.queryByText('Expand')).not.toBeInTheDocument();
	});

	test('applies shadow classes correctly', () => {
		const { container } = renderWithRouter(
			<Card withShadow withOutsideShadow>
				Content
			</Card>,
		);
		expect(container.firstChild).toHaveClass('card-outside-shadow');
		expect(container.querySelector('.content')).toHaveClass('content-shadow');
	});

	test('applies bottom position for action', () => {
		const { container } = renderWithRouter(
			<Card actionRoute="/test" actionTitle="Test" isActionPositionBottom>
				Content
			</Card>,
		);
		expect(container.querySelector('.link')).toHaveClass('link-bottom');
		expect(container.querySelector('.content')).toHaveClass('content-bottom');
	});

	test('centers title when isTitleCenter is true', () => {
		const { container } = renderWithRouter(
			<Card title="Test" isTitleCenter>
				Content
			</Card>,
		);
		expect(container.querySelector('.card-header')).toHaveClass('card-header-title-center');
	});
});
