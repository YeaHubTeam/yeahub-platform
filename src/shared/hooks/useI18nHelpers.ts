import { TFunction, TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

export const useI18nHelpers = (ns?: string | string[]) => {
	const { t }: { t: TFunction } = useTranslation(ns);

	const tWithNs = (
		key: string,
		options?: Omit<TOptions, 'defaultValue'>,
		defaultValue?: string | null,
	) => {
		return t(key, { ...options, defaultValue });
	};

	const tWithPlural = (
		key: string,
		count: number,
		defaultValue?: string,
		options?: Omit<TOptions, 'defaultValue' | 'count'>,
	) => t(key, { ...options, count, defaultValue });

	const tWithContext = (key: string) => {
		const [context, ...rest] = key.split('.');
		const newKey = [...rest].join('.');
		return t(newKey, { context });
	};

	return {
		t: tWithNs,
		tWithPlural,
		tWithContext,
	};
};
