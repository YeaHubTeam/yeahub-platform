import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ProgrammingLanguages, Tasks } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetLanguagesQuery } from '../../api/programmingLanguageApi';
import { ProgrammingLanguage } from '../../model/types/programmingLanguage';

type ProgrammingLanguageSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: string | string[];
	onChange: (value: string[] | string) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
	selectedLanguageIds?: number[];
	supportedLanguages?: ProgrammingLanguage[];
	width?: number;
};

type LanguageType = {
	id: string;
	title: string;
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

	const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChangeLanguage = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		const strValue = newValue;

		if (hasMultiple) {
			const updates = [...selectedLanguages, strValue];
			setSelectedLanguages(updates);
			onChange(updates);
		} else {
			setSelectedLanguages([strValue]);
			onChange(strValue);
		}
	};

	const handleDeleteLanguage = (id: string) => () => {
		if (disabled) return;
		const updates = selectedLanguages.filter((languageId) => languageId !== id);
		setSelectedLanguages(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return languages
				.map((language) => ({
					label: language.title,
					value: language.id,
					limit: 100,
				}))
				.filter((language) => !selectedLanguages?.includes(language.value));
		} else {
			return languages.map((language) => ({
				label: language.title,
				value: language.id,
				limit: 100,
			}));
		}
	}, [selectedLanguages, languages]);

	const languagesDictionary = useMemo(() => {
		const emptyLanguage: LanguageType = {
			id: '0',
			title: t(Tasks.SELECT_CHOOSE),
		};
		return languages.reduce(
			(acc, language) => {
				acc[language.id] = language;
				return acc;
			},
			{ 0: emptyLanguage } as Record<string, LanguageType>,
		);
	}, [languages]);

	const filteredOptions = options.filter(
		(option) => !selectedLanguageIds?.includes(Number(option.value)),
	);

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					width={width}
					label={
						options.length
							? t(ProgrammingLanguages.SELECT_CHOOSE)
							: t(ProgrammingLanguages.SELECT_EMPTY)
					}
					disabled={disabled}
					value={languagesDictionary[selectedLanguages[0]]?.title ?? ''}
					onSelect={(val) => handleChangeLanguage(String(val))}
				>
					{filteredOptions.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</>
		);
	}

	return (
		<SelectWithChips
			title={t(ProgrammingLanguages.SELECT_SELECTED)}
			options={options}
			onChange={handleChangeLanguage}
			selectedItems={selectedLanguages}
			handleDeleteItem={handleDeleteLanguage}
			itemsDictionary={languagesDictionary}
			placeholder={
				options.length
					? t(ProgrammingLanguages.SELECT_CHOOSE)
					: t(ProgrammingLanguages.SELECT_EMPTY)
			}
			disabled={disabled}
		/>
	);
};
