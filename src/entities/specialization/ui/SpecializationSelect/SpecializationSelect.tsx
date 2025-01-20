import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Select } from '@/shared/ui/Select';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';

type SpecializationSelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value' | 'onChange' | 'variant'
> & {
	value?: number[];
	onChange: (value: number[] | number) => void;
	hasMultiple?: boolean;
};

export const SpecializationSelect = ({
	onChange,
	value,
	hasMultiple,
}: SpecializationSelectProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { data: specializations } = useGetSpecializationsListQuery({ limit: 100 });

	return (
		<Select
			value={value}
			data={specializations?.data}
			variant={hasMultiple ? 'multiple-with-chips' : 'single'}
			title={t(Specializations.SELECT_SELECTED)}
			onChange={onChange}
			placeholder={
				specializations?.data.length
					? t(Specializations.SELECT_CHOOSE)
					: t(Specializations.SELECT_EMPTY)
			}
		/>
	);
};
