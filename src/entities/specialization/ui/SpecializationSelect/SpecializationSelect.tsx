import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';
import { Specialization } from '../../model/types/specialization';

export type SpecializationSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: number | number[];
	onChange: (value: number[] | number) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

export const SpecializationSelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
	prefix,
	className,
}: SpecializationSelectProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { data: specializations } = useGetSpecializationsListQuery({ limit: 100 });

	const [selectedSpecializations, setSelectedSpecializations] = useState<number[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChange = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		const numValue = +newValue;

		if (hasMultiple) {
			const updates = [...selectedSpecializations, numValue];
			setSelectedSpecializations(updates);
			onChange(updates);
		} else {
			setSelectedSpecializations([numValue]);
			onChange([numValue]);
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
		const emptySpecialization: Specialization = {
			id: 0,
			title: t(Specializations.SELECT_CHOOSE),
			imageSrc: null,
			description: '',
		};
		return (specializations?.data || []).reduce(
			(acc, specialization) => {
				acc[specialization.id] = specialization;
				return acc;
			},
			{ 0: emptySpecialization } as Record<number, Specialization>,
		);
	}, [specializations]);

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					size="S"
					label={
						options.length ? t(Specializations.SELECT_CHOOSE) : t(Specializations.SELECT_EMPTY)
					}
					disabled={disabled}
					value={specializationsDictionary[Array.isArray(value) ? value[0] : value]?.title ?? ''}
					onSelect={(val) => handleChange(String(val))}
					prefix={prefix}
					className={className}
				>
					{options.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</>
		);
	}

	return (
		<SelectWithChips
			size="S"
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
