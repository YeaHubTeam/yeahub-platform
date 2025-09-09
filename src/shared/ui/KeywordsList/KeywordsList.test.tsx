import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { KeywordsList } from './KeywordsList';
import { KeywordsListSkeleton } from './KeywordsList.skeleton';

const keywords = ['react', 'solid', 'event loop'];
const path = '/search?tag=';

const setup = () =>
	render(
		<MemoryRouter>
			<KeywordsList keywords={keywords} path={path} />
		</MemoryRouter>,
	);

test('renders without crashing', () => {
	setup();
	expect(screen.getAllByRole('link').length).toBe(keywords.length);
});

test('shows correct hashtag text', () => {
	setup();
	expect(screen.getByText('#react')).toBeInTheDocument();
	expect(screen.getByText('#solid')).toBeInTheDocument();
	expect(screen.getByText('#event loop')).toBeInTheDocument();
});

test('builds correct links', () => {
	setup();
	const links = screen.getAllByRole('link');
	expect(links[0]).toHaveAttribute('href', `${path}react`);
	expect(links[2]).toHaveAttribute('href', `${path}${encodeURIComponent('event loop')}`);
});

describe('KeywordsListSkeleton', () => {
	test('renders exactly two TextSkeleton placeholders', () => {
		const { container } = render(<KeywordsListSkeleton />);

		const skeletons = container.querySelectorAll('div[class*="skeleton"]');

		expect(skeletons.length).toBe(2);
	});
});
