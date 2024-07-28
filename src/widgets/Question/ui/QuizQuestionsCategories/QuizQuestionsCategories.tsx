import { useGetSkillsListQuery } from '@/entities/skill';

import { BaseFilterSection } from '../QuestionsFilterPanel/ui/BaseFilterSection/BaseFilterSection';

import styles from './QuizQuestionsCategories.module.css';

const MAX_LIMIT = 100;

interface QuizQuestionsCategoriesProps {
	selectedSkills: number[];
	onChangeSkills: (skills: number[]) => void;
}

export const QuizQuestionsCategories = ({
	selectedSkills,
	onChangeSkills,
}: QuizQuestionsCategoriesProps) => {
	const { data: skills } = useGetSkillsListQuery({ limit: MAX_LIMIT });

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
		</div>
	);
};
