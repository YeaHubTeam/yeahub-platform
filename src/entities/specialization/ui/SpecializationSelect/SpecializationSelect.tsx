import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';
import { Specialization } from '../../model/types/specialization';

import styles from './SpecializationSelect.module.css';

type SpecializationSelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value' | 'onChange'
> & {
	value: number[];
	onChange: (value: number[] | number) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

export const SpecializationSelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
}: SpecializationSelectProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { data: specializations } = useGetSpecializationsListQuery({ limit: 100 });

	const [selectedSpecializations, setSelectedSpecializations] = useState<number[]>(value);

	const handleChange = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		if (hasMultiple) {
			const updates = [...(selectedSpecializations || []), +newValue];
			setSelectedSpecializations(updates);
			onChange(updates);
		} else {
			onChange(+newValue);
		}
	};

	const handleDeleteSpecialization = (id: number) => () => {
		if (disabled) return;
		const updates = selectedSpecializations.filter((specializationId) => specializationId !== id);
		setSelectedSpecializations(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (specializations?.data || [])
				.map((specialization) => ({
					label: specialization.title,
					value: specialization.id.toString(),
					limit: 100,
				}))
				.filter((specialization) => !selectedSpecializations?.includes(+specialization.value));
		} else {
			return (specializations?.data || []).map((specialization) => ({
				label: specialization.title,
				value: specialization.id.toString(),
				limit: 100,
			}));
		}
	}, [selectedSpecializations, specializations]);

	const specializationsDictionary = useMemo(() => {
		return specializations?.data?.reduce(
			(acc, specialization) => {
				acc[specialization.id] = specialization;
				return acc;
			},
			{} as Record<number, Specialization>,
		);
	}, [specializations]);

	if (!hasMultiple) {
		return (
			<Select
				onChange={handleChange}
				options={options}
				value={value[0] === 0 ? undefined : `${value}`}
				type="default"
				placeholder={
					options.length ? t(Specializations.SELECT_CHOOSE) : t(Specializations.SELECT_EMPTY)
				}
				className={styles.select}
				disabled={disabled}
			/>
		);
	}

	return (
		<SelectWithChips
			title={t(Specializations.SELECT_SELECTED)}
			options={options}
			onChange={handleChange}
			selectedItems={selectedSpecializations}
			handleDeleteItem={handleDeleteSpecialization}
			itemsDictionary={specializationsDictionary}
			placeholder={
				options.length ? t(Specializations.SELECT_CHOOSE) : t(Specializations.SELECT_EMPTY)
			}
			disabled={disabled}
		/>
	);
};
