import { useMemo, useState } from 'react';
import { Select, Chip, Text } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Specialization as SpecializationI18 } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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
};

export const SpecializationSelect = ({
	onChange,
	value,
	hasMultiple,
}: SpecializationSelectProps) => {
	console.log(value);

	const { t } = useI18nHelpers(i18Namespace.specialization);
	const { data: specializations } = useGetSpecializationsListQuery({});

	const [selectedSpecializations, setSelectedSpecializations] = useState<number[]>(value);

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;

		if (hasMultiple) {
			const updates = [...(selectedSpecializations || []), +newValue];
			setSelectedSpecializations(updates);
			onChange(updates);
		} else {
			onChange(+newValue);
		}
	};

	const handleDeleteSpecialization = (id: number) => () => {
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
				value={value || value === 0 ? `${value}` : undefined}
				type="default"
				placeholder={
					options.length
						? t(SpecializationI18.SKILLFORM_SPECIALIZATIONSELECT)
						: t(SpecializationI18.SKILLFORM_EMPTYSPECIALIZATIONSELECT)
				}
				className={styles.select}
			/>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Select
				onChange={handleChange}
				options={options}
				type="default"
				placeholder={
					options.length
						? t(SpecializationI18.SKILLFORM_SPECIALIZATIONSELECT)
						: t(SpecializationI18.SKILLFORM_EMPTYSPECIALIZATIONSELECT)
				}
				className={styles.select}
			/>
			{Boolean(selectedSpecializations?.length) && (
				<>
					<Text title={t(SpecializationI18.SKILLFORM_SELECTED_SPECIALIZATIONS)} />
					<div className={styles.selection}>
						{selectedSpecializations.map((id) => (
							<Chip
								key={id}
								label={specializationsDictionary?.[id]?.title}
								theme="primary"
								onDelete={handleDeleteSpecialization(id)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
