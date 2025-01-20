import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Select } from '@/shared/ui/Select';

import { useGetSkillsListQuery } from '../../api/skillApi';

type SkillSelectProps = Omit<
	React.ComponentProps<typeof Select>,
	'options' | 'type' | 'value ' | 'variant' | 'onChange'
> & {
	onChange: (value: number[] | number) => void;
	selectedSPecializations?: number[];
};

export const SkillSelect = ({ onChange, selectedSPecializations }: SkillSelectProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const { data: skills } = useGetSkillsListQuery({
		limit: 100,
		specializations: selectedSPecializations,
	});

	return (
		<Select
			title={t(Skills.SELECT_SELECTED)}
			onChange={onChange}
			variant="multiple-with-chips"
			placeholder={skills?.data.length ? t(Skills.SELECT_CHOOSE) : t(Skills.SELECT_EMPTY)}
			data={skills?.data}
		/>
	);
};
