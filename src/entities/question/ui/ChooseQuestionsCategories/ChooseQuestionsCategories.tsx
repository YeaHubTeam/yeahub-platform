import { useEffect, useState } from 'react';
import { Button } from 'yeahub-ui-kit';

import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetSkillsListQuery } from '@/entities/skill';

import styles from './ChooseQuestionsCategories.module.css';

const MAX_LIMIT = 5;

interface ChooseQuestionsCategoriesProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[]) => void;
	skillsLimit?: number;
}

export const ChooseQuestionsCategories = ({
	selectedSkills,
	onChangeSkills,
	skillsLimit,
}: ChooseQuestionsCategoriesProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(skillsLimit || MAX_LIMIT);
	const { data: skills } = useGetSkillsListQuery({ limit });

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (showAll) {
			setLimit(skills?.total ?? (skillsLimit || MAX_LIMIT));
		} else {
			setLimit(skillsLimit || MAX_LIMIT);
		}
	}, [skills?.total, showAll, skillsLimit]);

	const handleChooseSkill = (id: number) => {
		if (selectedSkills?.includes(id)) {
			onChangeSkills(selectedSkills.filter((skill) => skill !== id));
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const prepareData = skills?.data.map((skill) => ({
		...skill,
		active: selectedSkills?.includes(skill.id),
	}));

	if (!prepareData) return null;
	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={prepareData}
				title="Категории вопросов"
				onClick={handleChooseSkill}
			/>
			<Button className={styles.button} theme="link" onClick={toggleShowAll}>
				Показать все
			</Button>
		</div>
	);
};
