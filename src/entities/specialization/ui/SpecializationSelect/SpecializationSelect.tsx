import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';

export type SpecializationSelectProps = Pick<
	EntitySelectProps<number>,
	'value' | 'onChange' | 'hasMultiple' | 'disabled' | 'prefix' | 'className' | 'onKeyDown'
>;

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

	return (
		<EntitySelect
			size="S"
			items={specializations?.data || []}
			value={value}
			onChange={(v) => onChange(Array.isArray(v) ? v : [v])}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Specializations.SELECT_CHOOSE)}
			emptyTranslationKey={t(Specializations.SELECT_EMPTY)}
			selectedTranslationKey={t(Specializations.SELECT_SELECTED)}
			prefix={prefix}
			className={className}
		/>
	);
};
