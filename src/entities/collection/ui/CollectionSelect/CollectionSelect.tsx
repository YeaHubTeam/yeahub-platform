import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { useDebounce } from '@/shared/libs';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionsListQuery } from '../../api/collectionApi';

export type CollectionSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: string;
	onChange: (collection: string) => void;
	disabled?: boolean;
};

export const CollectionSelect = ({ value, onChange, disabled }: CollectionSelectProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const [searchValue, setSearchValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	const debouncedSetValue = useDebounce((value: string) => {
		setDebouncedValue(value);
	}, 500);

	const { data, isFetching } = useGetCollectionsListQuery({
		titleOrDescriptionSearch: debouncedValue,
		page: 1,
		limit: 10,
	});

	const collections = data?.data.filter((collection) => collection.title) || [];

	const handleChange = (newValue: string) => {
		if (disabled) return;
		onChange(newValue);
	};

	const emptyCompany = {
		value: '',
		label: t(Collections.SELECT_CHOOSE),
	};

	const handleSearchChange = (val: string) => {
		setSearchValue(val);
		debouncedSetValue(val);
	};

	const options = useMemo(() => {
		return collections.map((collection) => ({
			value: collection.id.toString(),
			label: collection.title as string,
		}));
	}, [collections]);

	const selectCompany = options.find((option) => option.value === value) || emptyCompany;
	const notFoundText = t(Collections.SELECT_EMPTY);
	const displayValue = options.length === 0 ? notFoundText : searchValue || selectCompany.label;

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(Collections.SELECT_TITLE)}
			</Text>
			<Dropdown
				size="L"
				label={selectCompany.label}
				disabled={disabled}
				value={displayValue}
				isInput={true}
				inputValue={searchValue}
				onChangeValue={handleSearchChange}
				onSelect={(val) => {
					const selected = options.find((opt) => opt.value === val);
					handleChange(!val ? '' : String(val));
					!selected?.label ? handleSearchChange('') : '';
					setSearchValue(selected?.label ?? '');
				}}
			>
				{options.length === 0 ? (
					<Option value="not-found" label={notFoundText} disabled />
				) : (
					options.map((option) => (
						<Option
							value={option.value}
							label={option.label}
							key={option.value}
							disabled={isFetching}
						/>
					))
				)}
			</Dropdown>
		</Flex>
	);
};
