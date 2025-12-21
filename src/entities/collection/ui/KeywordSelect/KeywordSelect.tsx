import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionKeywordsQuery } from '../../api/collectionApi';

export type KeywordSelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value?: string;
	onChange: (value?: string) => void;
	disabled?: boolean;
};

export const KeywordSelect = ({ value, onChange, disabled }: KeywordSelectProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const [searchValue, setSearchValue] = useState(value || '');

	const { data: keywordsResponse } = useGetCollectionKeywordsQuery({
		limit: 100,
		title: searchValue,
	});

	const handleChange = (newValue?: string) => {
		if (disabled) return;
		onChange(newValue);
	};

	const emptyKeyword = {
		value: '',
		label: t(Collections.KEYWORD_PLACEHOLDER),
	};

	const handleSearchChange = (val: string) => {
		setSearchValue(val);
	};

	const onClearFilterValue = () => {
		onChange(undefined);
	};

	const options = useMemo(() => {
		const keywords = keywordsResponse?.data || [];

		const filteredKeywords = searchValue
			? keywords.filter((keyword) => keyword.toLowerCase().includes(searchValue.toLowerCase()))
			: keywords;

		return filteredKeywords.map((keyword) => ({
			value: keyword,
			label: keyword,
		}));
	}, [searchValue, keywordsResponse]);

	const selectedKeyword = options.find((option) => option.value === value) || emptyKeyword;
	const notFoundText = t(Collections.KEYWORD_NOT_FOUND);
	const displayValue = options.length === 0 ? notFoundText : searchValue || selectedKeyword.label;

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(Collections.KEYWORD_LABEL)}
			</Text>
			<Dropdown
				size="S"
				label={selectedKeyword.label}
				disabled={false}
				value={displayValue}
				isInput={true}
				inputValue={searchValue}
				onChangeValue={handleSearchChange}
				onChangeFilterValue={onClearFilterValue}
				onSelect={(val) => {
					if (val === 'not-found') return;

					const selected = options.find((opt) => opt.value === val);
					handleChange(String(val));
					setSearchValue(selected?.label ?? '');
				}}
			>
				{options.length === 0 ? (
					<Option
						value="not-found"
						label={searchValue ? notFoundText : t(Collections.KEYWORD_NOT_EXIST)}
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
