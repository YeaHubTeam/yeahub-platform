import { MutableRefObject, LegacyRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Card } from '@/shared/ui/Card';

import type { QuizWithoutQuestions } from '@/entities/quiz';

import { InterviewParameters } from '../InterviewParameters/InterviewParameters';
import { QuestionCategories } from '../QuestionCategores/QuestionCategories';

import styles from './FullPassedQuizzesItem.module.css';

interface FullInterviewHistoryItemProps {
	interview: QuizWithoutQuestions;
	itemRef: MutableRefObject<HTMLElement> | null;
}

export const FullPassedQuizzesItem = ({ interview, itemRef }: FullInterviewHistoryItemProps) => {
	const { id, skills } = interview;
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const notEmptySkills = skills.length > 0;

	return (
		<li ref={itemRef as LegacyRef<HTMLLIElement> | undefined}>
			<Link to={route(ROUTES.interview.history.result.page, id)}>
				<Card
					className={styles.container}
					title={t(InterviewHistory.TITLE, { number: interview.quizNumber })}
					actionTitle={t(InterviewHistory.LINK)}
					actionRoute={route(ROUTES.interview.history.result.page, id)}
				>
					<InterviewParameters interview={interview} />
					{notEmptySkills && <QuestionCategories questionCategories={skills} />}
				</Card>
			</Link>
		</li>
	);
};
