import { ComponentProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { Dropdown } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetCompaniesListQuery } from '../../api/companyApi';

import styles from './CompanySelect.module.css';

type CompanySelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export const CompanySelect = ({ onChange, value, disabled }: CompanySelectProps) => {
	const { t } = useTranslation(i18Namespace.companies);
	const { data: companies } = useGetCompaniesListQuery({ limit: 200 });

	const handleChange = (newValue: string | undefined) => {
		if (!newValue || disabled) return;
		onChange(newValue);
	};

	const handleDeleteItem = (_id: string) => {
		return () => {
			if (disabled) return;
			onChange('');
		};
	};

	const options = useMemo(() => {
		return (companies?.data || []).map((company) => ({
			label: company.title ?? '',
			value: String(company.id),
		}));
	}, [companies]);

	const companiesDictionary = useMemo(() => {
		return companies?.data?.reduce(
			(acc, company) => {
				acc[company.id] = {
					id: company.id,
					title: company.title ?? '',
					imageSrc: company.imageSrc,
				};
				return acc;
			},
			{} as Record<
				string,
				{ id: string | number; title: string; imageSrc?: string | null | undefined }
			>,
		);
	}, [companies]);

	return (
		<SelectWithChips
			title={t(Companies.SELECT_SELECTED)}
			options={options}
			onChange={handleChange}
			selectedItems={value ? [value] : []}
			handleDeleteItem={handleDeleteItem}
			itemsDictionary={companiesDictionary}
			placeholder={options.length ? t(Companies.SELECT_CHOOSE) : t(Companies.SELECT_EMPTY)}
			disabled={disabled}
			className={styles.select}
		/>
	);
};
