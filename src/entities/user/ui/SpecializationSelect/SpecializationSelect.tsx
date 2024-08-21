import { useMemo } from 'react';
import { Select } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetSpecializationsListQuery } from '@/entities/specialization';

import styles from './SpecializationSelect.module.css';

type SpecializationSelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value'
> & {
	value?: number;
	onChange: (value: number) => void;
};

const SpecializationSelect = ({ onChange, value }: SpecializationSelectProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { data: specializations } = useGetSpecializationsListQuery({});

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;
		onChange(+newValue);
	};

	const options = useMemo(() => {
		return (specializations?.data || []).map((specialization) => ({
			label: specialization.title,
			value: specialization.id.toString(),
		}));
	}, [specializations?.data]);

	return (
		<Select
			onChange={handleChange}
			options={options}
			type="default"
			value={value || value === 0 ? `${value}` : undefined}
			placeholder={
				options.length
					? t('skillForm.specializationSelect')
					: t('skillForm.emptySpecializationSelect')
			}
			className={styles.select}
		/>
	);
};

export default SpecializationSelect;
