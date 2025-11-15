import { ROUTES } from '@/shared/config/router/routes';

import { getQuestionRoute } from './getQuestionRoute';

describe('getQuestionRoute', () => {
	const testId = '123';

	it('returns correct admin question route', () => {
		const result = getQuestionRoute.admin(testId);
		const expected = ROUTES.admin.questions.details.page.replace(':questionId', testId);
		expect(result).toBe(expected);
	});

	it('returns correct platform question route', () => {
		const result = getQuestionRoute.platform(testId);
		const expected = ROUTES.wiki.questions.detail.page.replace(':questionId', testId);
		expect(result).toBe(expected);
	});

	it('returns correct landing question route', () => {
		const result = getQuestionRoute.landing(testId);
		const expected = ROUTES.questions.detail.page.replace(':questionId', testId);
		expect(result).toBe(expected);
	});

	it('works with number id', () => {
		const id = 123;
		const result = getQuestionRoute.admin(id);
		const expected = ROUTES.admin.questions.details.page.replace(':questionId', id.toString());
		expect(result).toBe(expected);
	});
});
