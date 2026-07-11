import { useTranslation } from 'react-i18next';

import { i18Namespace, Skills } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetSkillsListQuery } from '../../api/skillApi';

import { SkillSelectSkeleton } from './SkillSelect.skeleton';

export type SkillSelectProps = Pick<
	EntitySelectProps<number>,
	'value' | 'hasMultiple' | 'disabled'
> & {
	onChange: (value: number[]) => void;
	selectedSpecializations?: number[];
	withSpecialization?: boolean;
};

export const SkillSelect = ({
	onChange,
	value,
	selectedSpecializations,
	hasMultiple = true,
	withSpecialization = true,
	disabled,
}: SkillSelectProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const hasSpecializations =
		(Array.isArray(selectedSpecializations) && selectedSpecializations.length > 0) ||
		typeof selectedSpecializations === 'number';

	const { data: skills, isLoading } = useGetSkillsListQuery(
		{
			limit: 100,
			specializations: selectedSpecializations,
		},
		{
			skip: withSpecialization && !hasSpecializations,
		},
	);

	if (isLoading) {
		return <SkillSelectSkeleton />;
	}

	return (
		<EntitySelect
			size="S"
			items={skills?.data || []}
			value={value}
			onChange={(v) => onChange(Array.isArray(v) ? v : [v])}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Skills.SELECT_CHOOSE)}
			emptyTranslationKey={t(Skills.SELECT_EMPTY)}
			selectedTranslationKey={t(Skills.SELECT_SELECTED)}
		/>
	);
};
