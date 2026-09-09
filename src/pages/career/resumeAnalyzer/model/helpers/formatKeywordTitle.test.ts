import { formatKeywordTitle } from './formatKeywordTitle';

describe('formatKeywordTitle', () => {
	it.each([
		['git', 'Git'],
		['javascript', 'JavaScript'],
		['ci/cd', 'CI/CD'],
		['rest api', 'REST API'],
		['sql', 'SQL'],
		['next.js', 'Next.js'],
	])('formats %s as %s', (sourceTitle, expectedTitle) => {
		expect(formatKeywordTitle(sourceTitle)).toBe(expectedTitle);
	});

	it('keeps an unknown title unchanged', () => {
		expect(formatKeywordTitle('Новый навык')).toBe('Новый навык');
	});
});
