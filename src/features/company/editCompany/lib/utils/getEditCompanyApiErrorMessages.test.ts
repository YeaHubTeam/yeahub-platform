import { Translation } from '@/shared/config';

import { getEditCompanyApiErrorMessages } from './getEditCompanyApiErrorMessages';

describe('getEditCompanyApiErrorMessages', () => {
	test('показывает ошибку формата изображения для HTTP 400', () => {
		const error = {
			error: {
				status: 400,
				data: {
					message: 'storage.image.invalid_format',
					statusCode: 400,
				},
			},
			isUnhandledError: false,
			meta: { response: { status: 400 } },
		};

		expect(getEditCompanyApiErrorMessages(error)).toEqual([
			Translation.TOAST_COMPANIES_EDIT_IMAGE_INVALID_FORMAT,
		]);
	});

	test('показывает общее сообщение при отсутствии сети', () => {
		const error = {
			error: {
				status: 'FETCH_ERROR',
				error: 'Failed to fetch',
			},
		};

		expect(getEditCompanyApiErrorMessages(error)).toEqual([
			Translation.TOAST_COMPANIES_EDIT_FAILED,
		]);
	});

	test('показывает общее сообщение для неизвестного кода', () => {
		expect(
			getEditCompanyApiErrorMessages({
				error: { data: { message: 'unknown.error' } },
			}),
		).toEqual([Translation.TOAST_COMPANIES_EDIT_FAILED]);
	});
});

describe('документированные ошибки и некорректные ответы', () => {
	test.each([
		['auth.auth.unauthorized', Translation.TOAST_COMPANIES_EDIT_AUTH_UNAUTHORIZED],
		['auth.user.verified', Translation.TOAST_COMPANIES_EDIT_AUTH_USER_VERIFIED],
		['auth.roles.author_can_change_only_own', Translation.TOAST_COMPANIES_EDIT_AUTH_ONLY_OWN],
		['company.company.not_found', Translation.TOAST_COMPANIES_EDIT_NOT_FOUND],
		['tinify.tinify.compress_failed', Translation.TOAST_COMPANIES_EDIT_TINIFY_COMPRESS_FAILED],
		['storage.image.too_large', Translation.TOAST_COMPANIES_EDIT_IMAGE_TOO_LARGE],
		['tinify.tinify.resize_failed', Translation.TOAST_COMPANIES_EDIT_TINIFY_RESIZE_FAILED],
	])('%s', (message, expected) => {
		expect(getEditCompanyApiErrorMessages({ error: { data: { message } } })).toEqual([expected]);
	});

	test.each([
		undefined,
		null,
		{},
		{ error: null },
		{ error: { data: null } },
		{ error: { data: [] } },
	])('безопасно обрабатывает %p', (error) => {
		expect(getEditCompanyApiErrorMessages(error)).toEqual([
			Translation.TOAST_COMPANIES_EDIT_FAILED,
		]);
	});

	test('различает причины 403 и убирает повторяющиеся сообщения', () => {
		const data = [
			{ message: 'auth.user.verified', statusCode: 403 },
			{ message: 'auth.roles.author_can_change_only_own', statusCode: 403 },
			{ message: 'auth.user.verified', statusCode: 403 },
		];

		expect(getEditCompanyApiErrorMessages({ error: { status: 403, data } })).toEqual([
			Translation.TOAST_COMPANIES_EDIT_AUTH_USER_VERIFIED,
			Translation.TOAST_COMPANIES_EDIT_AUTH_ONLY_OWN,
		]);
	});
});
