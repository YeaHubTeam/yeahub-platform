import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { KeywordsListTestIds } from './KeywordsList';
import { KeywordsList } from './KeywordsList';
import { KeywordsListSkeleton } from './KeywordsList.skeleton';

const keywords = ['react', 'solid', 'event loop'];
const path = '/search?tag=';

describe('KeywordsList basic rendering', () => {
	beforeEach(() => {
		renderComponent(<KeywordsList keywords={keywords} path={path} />);
	});

	test('renders wrapper with correct props', () => {
		const wrapper = screen.getByTestId(KeywordsListTestIds.wrapper);

		expect(wrapper).toBeInTheDocument();
		// Flex превращается в div, но атрибуты data-* сохраняются
		expect(wrapper).toHaveAttribute('data-testId', KeywordsListTestIds.wrapper);
		// classNames от Flex содержат wrap и gap — можно проверить часть класса
		expect(wrapper.className).toMatch(/wrap/);
	});

	test('renders right amount of Text elements', () => {
		const texts = screen.getAllByTestId(KeywordsListTestIds.text);
		expect(texts).toHaveLength(keywords.length);
	});

	test('Text contains correct hashtag and link', () => {
		expect(screen.getByText('#react')).toBeInTheDocument();
		const links = screen.getAllByRole('link');

		expect(links[0]).toHaveAttribute('href', `${path}react`);
		expect(links[2]).toHaveAttribute('href', `${path}${encodeURIComponent('event loop')}`);
	});

	test('renders correct amount of links', () => {
		expect(screen.getAllByRole('link')).toHaveLength(keywords.length);
	});

	test('shows correct hashtag text', () => {
		expect(screen.getByText('#react')).toBeInTheDocument();
		expect(screen.getByText('#solid')).toBeInTheDocument();
		expect(screen.getByText('#event loop')).toBeInTheDocument();
	});

	test('builds correct links', () => {
		const links = screen.getAllByRole('link');
		expect(links[0]).toHaveAttribute('href', `${path}react`);
		expect(links[2]).toHaveAttribute('href', `${path}${encodeURIComponent('event loop')}`);
	});
});

describe('KeywordsListSkeleton', () => {
	test('renders exactly two TextSkeleton placeholders', () => {
		const { container } = renderComponent(<KeywordsListSkeleton />);

		const skeletons = container.querySelectorAll('div[class*="skeleton"]');

		expect(skeletons.length).toBe(2);
	});
});
