import { Translation } from '@/shared/config';

import { CompanyEditError } from '../../model/types/companyEditPageTypes';

const errorMessages: Record<CompanyEditError, Translation> = {
	'storage.image.invalid_format': Translation.TOAST_COMPANIES_EDIT_IMAGE_INVALID_FORMAT,
	'auth.auth.unauthorized': Translation.TOAST_COMPANIES_EDIT_AUTH_UNAUTHORIZED,
	'auth.user.verified': Translation.TOAST_COMPANIES_EDIT_AUTH_USER_VERIFIED,
	'auth.roles.author_can_change_only_own': Translation.TOAST_COMPANIES_EDIT_AUTH_ONLY_OWN,
	'company.company.not_found': Translation.TOAST_COMPANIES_EDIT_NOT_FOUND,
	'tinify.tinify.compress_failed': Translation.TOAST_COMPANIES_EDIT_TINIFY_COMPRESS_FAILED,
	'storage.image.too_large': Translation.TOAST_COMPANIES_EDIT_IMAGE_TOO_LARGE,
	'tinify.tinify.resize_failed': Translation.TOAST_COMPANIES_EDIT_TINIFY_RESIZE_FAILED,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const getErrorData = (error: unknown): unknown => {
	if (!isRecord(error) || !isRecord(error.error)) return undefined;

	return error.error.data;
};

const getErrorMessage = (data: unknown): Translation => {
	if (!isRecord(data) || typeof data.message !== 'string') {
		return Translation.TOAST_COMPANIES_EDIT_FAILED;
	}

	return Object.prototype.hasOwnProperty.call(errorMessages, data.message)
		? errorMessages[data.message as CompanyEditError]
		: Translation.TOAST_COMPANIES_EDIT_FAILED;
};

export const getEditCompanyApiErrorMessages = (error: unknown): Translation[] => {
	const data = getErrorData(error);
	const errors = Array.isArray(data) ? data : [data];
	const messages = errors.map(getErrorMessage);

	return messages.length
		? messages.filter((message, index) => messages.indexOf(message) === index)
		: [Translation.TOAST_COMPANIES_EDIT_FAILED];
};
