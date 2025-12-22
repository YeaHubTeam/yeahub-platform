import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

export const handleApiError = <T>(error: unknown, handler: (error: ApiErrorData<T>) => string) => {
	if (error && typeof error === 'object' && 'error' in error) {
		const typedError = error as ApiError<T>;
		return handler(typedError.error.data);
	} else {
		return i18n.t(Translation.ERROR);
		//eslint-disable-next-line no-console
		console.error(error);
	}
};
