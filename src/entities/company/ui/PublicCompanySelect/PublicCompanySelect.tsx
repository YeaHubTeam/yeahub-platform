import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { useDebounce } from '@/shared/libs';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetPublicCompaniesListQuery } from '../../api/companyApi';

export type PublicCompanySelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value?: string;
	onChange?: (company?: string) => void;
	disabled?: boolean;
};

export const PublicCompanySelect = ({ value, onChange, disabled }: PublicCompanySelectProps) => {
	const { t } = useTranslation([i18Namespace.companies]);

	const [searchValue, setSearchValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	const debouncedSetValue = useDebounce((value: string) => {
		setDebouncedValue(value);
	}, 500);

	const { data, isFetching } = useGetPublicCompaniesListQuery({
		titleOrLegalNameOrDescriptionSearch: debouncedValue,
		page: 1,
		limit: 10,
	});

	const companies = data?.data.filter((company) => company.title) || [];

	const handleChange = (newValue?: string) => {
		if (disabled) return;
		onChange?.(newValue);
	};

	const emptyCompany = {
		value: '',
		label: t(Companies.SELECT_FILTER_CHOOSE),
	};

	const handleSearchChange = (val: string) => {
		setSearchValue(val);
		debouncedSetValue(val);
	};

	const options = useMemo(() => {
		return companies.map((company) => ({
			value: company.id.toString(),
			label: company.title as string,
		}));
	}, [companies]);
	const selectCompany = options.find((option) => option.value === value) || emptyCompany;
	const notFoundText = t(Companies.SELECT_FILTER_NOT_FOUND);
	const displayValue = options.length === 0 ? notFoundText : searchValue || selectCompany.label;

	return (
		<Flex direction="column" align="start" gap="8">
			<Text variant="body2" color="black-700">
				{t(Companies.SELECT_FILTER_TITLE)}
			</Text>
			<Dropdown
				size="S"
				label={selectCompany.label}
				disabled={disabled}
				value={displayValue}
				isInput={true}
				inputValue={searchValue}
				onChangeValue={handleSearchChange}
				onSelect={(val) => {
					const selected = options.find((opt) => opt.value === val);
					handleChange(!val ? undefined : String(val));
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
