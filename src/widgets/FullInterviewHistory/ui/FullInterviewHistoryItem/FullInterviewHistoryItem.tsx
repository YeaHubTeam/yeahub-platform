import { MutableRefObject, LegacyRef } from 'react';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { QuestionCategories, type QuizHistoryResponse } from '@/entities/quiz';

import styles from './FullInterviewHistoryItem.module.css';
import { InterviewHeader } from './InterviewHeader/InterviewHeader';
import { InterviewParameters } from './InterviewParameters/InterviewParameters';

interface FullInterviewHistoryItemProps {
	interview: QuizHistoryResponse;
	itemRef: MutableRefObject<HTMLElement> | null;
}

export const FullInterviewHistoryItem = ({ interview, itemRef }: FullInterviewHistoryItemProps) => {
	const { id, skills } = interview;
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	const notEmptySkills = skills.length > 0;

	return (
		<li ref={itemRef as LegacyRef<HTMLLIElement> | undefined}>
			<Link to={route(ROUTES.interview.history.result.page, id)}>
				<Card className={styles.container}>
					<InterviewHeader title={t('title', null, { number: interview.quizNumber })} />
					<InterviewParameters interview={interview} />
					{notEmptySkills && <QuestionCategories questionCategories={skills} />}
				</Card>
			</Link>
		</li>
	);
};
