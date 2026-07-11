import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ProgrammingLanguages } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetLanguagesQuery } from '../../api/programmingLanguageApi';
import { ProgrammingLanguage } from '../../model/types/programmingLanguage';

export type ProgrammingLanguageSelectProps = Pick<
	EntitySelectProps<string>,
	'value' | 'onChange' | 'hasMultiple' | 'disabled' | 'width'
> & {
	selectedLanguageIds?: number[];
	supportedLanguages?: ProgrammingLanguage[];
};

export const ProgrammingLanguageSelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
	selectedLanguageIds,
	supportedLanguages,
	width,
}: ProgrammingLanguageSelectProps) => {
	const { t } = useTranslation(i18Namespace.programmingLanguage);

	const { data } = useGetLanguagesQuery(undefined, { skip: !!supportedLanguages });

	const languages = (supportedLanguages || data || [])?.map((language) => ({
		id: String(language.id),
		title: language.name,
	}));

	const excludeIds = useMemo(
		() => languages.filter((l) => selectedLanguageIds?.includes(Number(l.id))).map((l) => l.id),
		[languages, selectedLanguageIds],
	);

	return (
		<EntitySelect
			width={width}
			items={languages || []}
			excludeIds={hasMultiple ? undefined : excludeIds}
			value={value}
			onChange={onChange}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(ProgrammingLanguages.SELECT_CHOOSE)}
			emptyTranslationKey={t(ProgrammingLanguages.SELECT_EMPTY)}
			selectedTranslationKey={t(ProgrammingLanguages.SELECT_SELECTED)}
		/>
	);
};
