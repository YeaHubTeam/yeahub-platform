import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { SpecializationsListField } from '@/entities/specialization';

import { SkillsFilterParams } from '../model/types/filters';

interface SkillsFiltersProps {
	filters: SkillsFilterParams;
	onChangeSpecialization: (specialization?: SkillsFilterParams['specialization']) => void;
	onChangeIsMy: (isMy: SkillsFilterParams['isMy']) => void;
}

export const SkillsFilters = ({
	filters,
	onChangeSpecialization,
	onChangeIsMy,
}: SkillsFiltersProps) => {
	const { specialization, isMy } = filters;

	const { t } = useTranslation(i18Namespace.skill);

	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={isMy ?? false}
				onChange={(e) => onChangeIsMy(e.target.checked)}
				label={t(Skills.MY_SKILLS_TITLE)}
			/>
			<SpecializationsListField
				selectedSpecialization={specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
		</Flex>
	);
};
