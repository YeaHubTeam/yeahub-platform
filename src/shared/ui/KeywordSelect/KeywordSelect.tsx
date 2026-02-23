import { BaseQueryFn, TypedUseQuery } from '@reduxjs/toolkit/query/react';
import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Response, useDebounce } from '@/shared/libs';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export type KeywordSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value?: string;
	onChange: (value?: string) => void;
	disabled?: boolean;
	selectedKeywords?: string[];
	showLabel?: boolean;
	showSelected?: boolean;
	getKeywordsQuery: TypedUseQuery<
		Response<string[]>,
		{
			page?: number;
			limit?: number;
			title?: string;
		},
		BaseQueryFn
	>;
};

export const KeywordSelect = ({
	value,
	onChange,
	disabled,
	selectedKeywords = [],
	showLabel = true,
	showSelected = true,
	getKeywordsQuery,
}: KeywordSelectProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const [searchValue, setSearchValue] = useState(value || '');
	const [debouncedValue, setDebouncedValue] = useState('');

	const debouncedSetValue = useDebounce((value: string) => {
		setDebouncedValue(value);
	}, 500);

	const { data: keywordsResponse } = getKeywordsQuery({
		limit: 100,
		title: debouncedValue,
	});

	const handleChange = (newValue?: string) => {
		if (disabled) return;
		onChange(newValue);
	};

	const emptyKeyword = {
		value: '',
		label: t(Translation.KEYWORD_PLACEHOLDER),
	};

	const handleSearchChange = (val: string) => {
		setSearchValue(val);
		debouncedSetValue(val);
	};

	const onClearFilterValue = () => {
		onChange(undefined);
	};

	const options = useMemo(() => {
		const keywords = keywordsResponse?.data || [];

		const availableKeywords = keywords.filter((keyword) => !selectedKeywords.includes(keyword));

		const filteredKeywords = searchValue
			? availableKeywords.filter((keyword) =>
					keyword.toLowerCase().includes(searchValue.toLowerCase()),
				)
			: availableKeywords;

		return filteredKeywords.map((keyword) => ({
			value: keyword,
			label: keyword,
		}));
	}, [searchValue, keywordsResponse, selectedKeywords]);

	const selectedKeyword = options.find((option) => option.value === value) || emptyKeyword;
	const notFoundText = t(Translation.KEYWORD_NOT_FOUND);
	const displayValue =
		options.length === 0
			? notFoundText
			: !showSelected
				? t(Translation.KEYWORD_PLACEHOLDER)
				: searchValue || selectedKeyword.label;

	return (
		<Flex direction="column" align="start" gap="8">
			{showLabel && (
				<Text variant="body2" color="black-700">
					{t(Translation.KEYWORD_LABEL)}
				</Text>
			)}
			<Dropdown
				size="S"
				label={selectedKeyword.label}
				disabled={disabled}
				value={displayValue}
				isInput={true}
				inputValue={searchValue}
				onChangeValue={handleSearchChange}
				onChangeFilterValue={onClearFilterValue}
				onSelect={(val) => {
					if (val === 'not-found') return;

					options.find((opt) => opt.value === val);
					handleChange(String(val));
					setSearchValue('');
				}}
			>
				{options.length === 0 ? (
					<Option
						value="not-found"
						label={searchValue ? notFoundText : t(Translation.KEYWORD_NOT_EXIST)}
						disabled
					/>
				) : (
					options.map((option) => (
						<Option key={option.value} value={option.value} label={option.label} />
					))
				)}
			</Dropdown>
		</Flex>
	);
};
