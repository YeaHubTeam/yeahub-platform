import { useMemo } from 'react';
import { Select } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Specialization } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';

import styles from './SingleSpecializationSelect.module.css';

type SingleSpecializationSelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value'
> & {
	value?: number;
	onChange: (value: number) => void;
};

export const SingleSpecializationSelect = ({
	onChange,
	value,
}: SingleSpecializationSelectProps) => {
	const { t } = useI18nHelpers(i18Namespace.specialization);
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
					? t(Specialization.SKILLFORM_SPECIALIZATIONSELECT)
					: t(Specialization.SKILLFORM_EMPTYSPECIALIZATIONSELECT)
			}
			className={styles.select}
		/>
	);
};
