import { useTranslation } from 'react-i18next';

import { i18Namespace, Skills } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Switch } from '@/shared/ui/Switch';

import { SpecializationsListField } from '@/entities/specialization';
import { UserSelect } from '@/entities/user';

import { SkillsFilterParams } from '../model/types/filters';

interface SkillsFiltersProps {
	filters: SkillsFilterParams;
	onChangeSpecialization: (specialization?: SkillsFilterParams['specialization']) => void;
	onChangeIsMy: (isMy: SkillsFilterParams['isMy']) => void;
	onChangeAuthor: (author?: SkillsFilterParams['author']) => void;
}

export const SkillsFilters = ({
	filters,
	onChangeSpecialization,
	onChangeIsMy,
	onChangeAuthor,
}: SkillsFiltersProps) => {
	const { specialization, isMy, author } = filters;

	const { t } = useTranslation(i18Namespace.skill);

	return (
		<Flex direction="column" gap="24">
			<Switch
				checked={isMy ?? false}
				onChange={(e) => {
					onChangeIsMy(e.target.checked);
					if (e.target.checked) onChangeAuthor(undefined);
				}}
				label={t(Skills.MY_SKILLS_TITLE)}
			/>
			<UserSelect onChange={onChangeAuthor} value={author} disabled={!!isMy} />
			<SpecializationsListField
				selectedSpecialization={specialization}
				onChangeSpecialization={onChangeSpecialization}
			/>
		</Flex>
	);
};
