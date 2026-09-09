import { fireEvent, screen, within } from '@testing-library/react';

import { i18nForJest } from '@/shared/config';
import { renderComponent } from '@/shared/libs';

import type { Keyword, Keywords } from '../../model/types/resumeAnalyzer';

import { ResumeAnalyzerKeywordsCard } from './ResumeAnalyzerKeywordsCard';

const createKeywords = (prefix: string, count: number): Keyword[] =>
	Array.from({ length: count }, (_, index) => ({
		title: `${prefix}-${index + 1}`,
		percent: 10,
	}));

const keywords: Keywords = {
	coveragePercent: 26,
	matchedKeywords: createKeywords('matched', 10),
	missingKeywords: createKeywords('missing', 9),
	optionalKeywords: createKeywords('optional', 6),
	criticalKeywords: createKeywords('critical', 6),
	totalVacancyKeywords: 50,
	totalMatched: 13,
	recommendations: [],
};

beforeAll(() => {
	i18nForJest.addResourceBundle(
		'ru',
		'resume',
		{
			analysis: {
				keywords: {
					title: 'Ключевые слова',
					matched_total: '{{matched}}/{{total}} совпало',
					matched: 'Найденные',
					missing: 'Пропущенные',
					optional: 'Дополнительные',
					critical: 'Критичные',
				},
			},
		},
		true,
		true,
	);
});

describe('ResumeAnalyzerKeywordsCard', () => {
	test('shows totals and limits keyword groups in collapsed state', () => {
		renderComponent(<ResumeAnalyzerKeywordsCard keywords={keywords} />);

		expect(screen.getByText('13/50 совпало')).toBeInTheDocument();
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-matched')).toHaveLength(8);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-missing')).toHaveLength(8);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-optional')).toHaveLength(5);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-critical')).toHaveLength(5);
		expect(
			screen.getByTestId('ResumeAnalyzerKeywordsCardList-Remainder-matched'),
		).toHaveTextContent('+2');
		expect(
			screen.getByTestId('ResumeAnalyzerKeywordsCardList-Remainder-missing'),
		).toHaveTextContent('+1');
	});

	test('expands and collapses all keyword groups with one button', () => {
		renderComponent(<ResumeAnalyzerKeywordsCard keywords={keywords} />);
		const toggle = screen.getByTestId('ShowToggleButton');

		fireEvent.click(toggle);

		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-matched')).toHaveLength(10);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-missing')).toHaveLength(9);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-optional')).toHaveLength(6);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-critical')).toHaveLength(6);
		expect(
			screen.queryByTestId('ResumeAnalyzerKeywordsCardList-Remainder-matched'),
		).not.toBeInTheDocument();
		expect(toggle).toHaveAttribute('aria-expanded', 'true');

		fireEvent.click(toggle);
		expect(screen.getAllByTestId('ResumeAnalyzerKeywordsCardList-Item-matched')).toHaveLength(8);
		expect(toggle).toHaveAttribute('aria-expanded', 'false');
	});

	test('does not show toggle when every group fits its limit', () => {
		const shortKeywords: Keywords = {
			...keywords,
			matchedKeywords: keywords.matchedKeywords.slice(0, 8),
			missingKeywords: keywords.missingKeywords.slice(0, 8),
			optionalKeywords: keywords.optionalKeywords.slice(0, 5),
			criticalKeywords: keywords.criticalKeywords.slice(0, 5),
		};

		renderComponent(<ResumeAnalyzerKeywordsCard keywords={shortKeywords} />);
		expect(screen.queryByTestId('ShowToggleButton')).not.toBeInTheDocument();
	});

	test('keeps the critical group title without a count', () => {
		renderComponent(<ResumeAnalyzerKeywordsCard keywords={keywords} />);
		const criticalGroup = screen.getByTestId('ResumeAnalyzerKeywordsCardList-critical');

		expect(within(criticalGroup).getByText('Критичные')).toBeInTheDocument();
		expect(within(criticalGroup).queryByText('Критичные (6)')).not.toBeInTheDocument();
	});
});
