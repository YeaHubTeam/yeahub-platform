import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { GetQuizResults, LS_ACTIVE_MOCK_QUIZ_KEY, Quiz } from '@/entities/quiz';

import { CategoryProgressItem } from '../CategoryProgressItem/CategoryProgressItem';

export interface CategoryProgressListWrapProps {
	quizResults?: GetQuizResults;
	className?: string;
}
export const CategoryProgressListWrap = ({
	quizResults,
	className,
}: CategoryProgressListWrapProps) => {
	const { t } = useTranslation(i18Namespace.landing);
	const activeMockQuiz: Quiz = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);

	const learnedCount = activeMockQuiz.response.answers.filter((el) => el.answer === 'KNOWN');

	const transformSkillsStat = quizResults!.skillsQuestions.map((skill) => {
		const skillQuestions = activeMockQuiz.questions.filter(
			(question) => question.questionSkills[0].title === skill.skill,
		);

		const passedCount = skillQuestions.reduce((count, question) => {
			const learned = learnedCount.find((lq) => lq.questionId === question.id);
			return learned ? count + 1 : count;
		}, 0);

		return {
			category: skill.skill,
			total: skill.count,
			passed: passedCount,
			value: passedCount,
		};
	});

	return (
		<Card withShadow title={t(Landing.PROGRESS_SKILL_LEARNING)} className={className}>
			<Flex direction="column" gap="12">
				{transformSkillsStat.slice(0, 7).map((skillStat) => (
					<CategoryProgressItem key={skillStat.category} progressData={skillStat} />
				))}
			</Flex>
		</Card>
	);
};
