import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { Accordion } from '@/shared/ui/Accordion';

import { Question } from '@/entities/question';
import { useGetSkillsListQuery } from '@/entities/skill';
import { useGetSpecializationsListQuery } from '@/entities/specialization';

import { QuestionPreview } from '../QuestionPreview/QuestionPreview';
import { DisplayMode } from '../QuestionsFilterPanel/model/types';

import styles from './QuestionsSummaryList.module.css';

interface QuestionsListProps {
	questions?: Question[];
	profileId?: string;
	displayMode?: DisplayMode;
	showSkillOrSpecializationName?: boolean;
}

export const QuestionsSummaryList = ({
	questions,
	displayMode = 'popover',
	showSkillOrSpecializationName = false,
}: QuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const {
		filter: { skills: selectedSkills, specialization: selectedSpecialization },
	} = useQueryFilter();

	const preparedSpecializationsIds = selectedSpecialization
		? Array.isArray(selectedSpecialization)
			? selectedSpecialization
			: [selectedSpecialization]
		: undefined;

	const { data: skills } = useGetSkillsListQuery({
		specializations: preparedSpecializationsIds,
	});

	const { data: specializations } = useGetSpecializationsListQuery({});

	const preparedSpecializationId = selectedSpecialization
		? Array.isArray(selectedSpecialization)
			? selectedSpecialization[0]
			: selectedSpecialization
		: undefined;
	const specializationName = specializations?.data.find(
		(spec) => spec.id === preparedSpecializationId,
	)?.title;

	const skillNames = skills?.data
		.filter((skill) => selectedSkills?.includes(skill.id))
		.map((skill) => skill.title)
		.join(', ');

	const title = showSkillOrSpecializationName
		? `${t(Questions.TITLE_SHORT)} ${(skillNames || specializationName) ?? ''}`
		: t(Questions.TITLE_SHORT);

	return (
		<>
			<h1 className={styles.title}>{title}</h1>
			<hr className={styles.divider} />

			{questions &&
				questions.map((question) => (
					<Accordion key={question.id} title={question.title}>
						<QuestionPreview question={question} displayMode={displayMode} />
					</Accordion>
				))}
		</>
	);
};
