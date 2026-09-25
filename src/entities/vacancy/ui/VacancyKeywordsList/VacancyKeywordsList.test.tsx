import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { VacancyKeywordsList, VacancyKeywordsListTestIds } from './VacancyKeywordsList';

const keywords = ['react', 'typescript', 'redux', 'webpack', 'jest'];

describe('VacancyKeywordsList', () => {
	test('renders wrapper with correct default color class', () => {
		renderComponent(<VacancyKeywordsList keywords={keywords} topCount={2} />);

		const wrapper = screen.getByTestId(VacancyKeywordsListTestIds.wrapper);

		expect(wrapper).toBeInTheDocument();
		expect(wrapper.className).toMatch(/purple/);
	});

	test('renders correct amount of keyword blocks', () => {
		renderComponent(<VacancyKeywordsList keywords={keywords} topCount={2} />);

		const items = screen.getAllByTestId(VacancyKeywordsListTestIds.keyword);
		expect(items).toHaveLength(keywords.length);
	});

	test('renders text for every keyword', () => {
		renderComponent(<VacancyKeywordsList keywords={keywords} topCount={2} />);

		keywords.forEach((keyword) => {
			expect(screen.getByText(keyword)).toBeInTheDocument();
		});
	});

	test('renders empty wrapper without errors when keywords is empty', () => {
		renderComponent(<VacancyKeywordsList keywords={[]} topCount={2} />);

		const wrapper = screen.getByTestId(VacancyKeywordsListTestIds.wrapper);
		const items = screen.queryAllByTestId(VacancyKeywordsListTestIds.keyword);

		expect(wrapper).toBeInTheDocument();
		expect(items).toHaveLength(0);
	});

	describe('accent logic based on topCount', () => {
		test('marks first N items as accent, rest as not accent', () => {
			renderComponent(<VacancyKeywordsList keywords={keywords} topCount={2} />);

			const items = screen.getAllByTestId(VacancyKeywordsListTestIds.keyword);

			expect(items[0]).toHaveClass('accent');
			expect(items[1]).toHaveClass('accent');
			expect(items[2]).not.toHaveClass('accent');
			expect(items[3]).not.toHaveClass('accent');
			expect(items[4]).not.toHaveClass('accent');
		});

		test('marks no items as accent when topCount is 0', () => {
			renderComponent(<VacancyKeywordsList keywords={keywords} topCount={0} />);

			const items = screen.getAllByTestId(VacancyKeywordsListTestIds.keyword);

			items.forEach((item) => {
				expect(item).not.toHaveClass('accent');
			});
		});

		test('marks all items as accent when topCount exceeds keywords length', () => {
			renderComponent(<VacancyKeywordsList keywords={keywords} topCount={100} />);

			const items = screen.getAllByTestId(VacancyKeywordsListTestIds.keyword);

			items.forEach((item) => {
				expect(item).toHaveClass('accent');
			});
		});
	});
});
