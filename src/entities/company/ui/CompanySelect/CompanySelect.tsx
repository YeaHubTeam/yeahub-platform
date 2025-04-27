import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Company } from '@/shared/config/i18n/i18nTranslations';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetCompaniesListQuery } from '../../api/companyApi';

import styles from './CompanySelect.module.css';

type CompanySelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value' | 'onChange'
> & {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export const CompanySelect = ({ onChange, value, disabled }: CompanySelectProps) => {
	const { t } = useTranslation(i18Namespace.company);
	const { data: companies } = useGetCompaniesListQuery({ limit: 100 });

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
			label: company.title,
			value: company.id,
		}));
	}, [companies]);

	const companiesDictionary = useMemo(() => {
		return companies?.data?.reduce(
			(acc, company) => {
				acc[company.id] = { id: company.id, title: company.title, imageSrc: company.imageSrc };
				return acc;
			},
			{} as Record<string, { id: string; title: string; imageSrc?: string | null | undefined }>,
		);
	}, [companies]);

	return (
		<SelectWithChips
			title={t(Company.SELECT_SELECTED)}
			options={options}
			onChange={handleChange}
			selectedItems={value ? [value] : []}
			handleDeleteItem={handleDeleteItem}
			itemsDictionary={companiesDictionary}
			placeholder={options.length ? t(Company.SELECT_CHOOSE) : t(Company.SELECT_EMPTY)}
			disabled={disabled}
			className={styles.select}
		/>
	);
};
