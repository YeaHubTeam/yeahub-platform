import { useState } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getSkillDefaultIcon, Skill, useGetSkillsListQuery } from '@/entities/skill';

import styles from './ChooseQuestionsCategories.module.css';

const MAX_LIMIT = 5;

interface ChooseQuestionsCategoriesProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[] | undefined) => void;
	skillsLimit?: number;
}

export const ChooseQuestionsCategories = ({
	selectedSkills,
	onChangeSkills,
	skillsLimit,
}: ChooseQuestionsCategoriesProps) => {
	const [limit, _] = useState(skillsLimit || MAX_LIMIT);
	const { data: skills } = useGetSkillsListQuery({ limit });
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const handleChooseSkill = (id: number) => {
		if (selectedSkills?.includes(id)) {
			const filtredSkills = selectedSkills.filter((skill) => skill !== id);
			onChangeSkills(filtredSkills.length > 0 ? filtredSkills : undefined);
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const prepareData = skills?.data.map((skill) => ({
		...skill,
		active: selectedSkills?.includes(skill.id),
	}));

	if (!prepareData) return null;

	const skillIcon = (skill: Skill) => <Icon icon={getSkillDefaultIcon(skill)} />;

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={prepareData}
				title={t('create.questions_categories')}
				onClick={handleChooseSkill}
				getDefaultIcon={skillIcon}
			/>
		</div>
	);
};
