import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';

import { QuestionCategories } from '@/entities/quiz';
import { QuizHistoryResponse } from '@/entities/quiz';

import styles from './FullInterviewHistoryItem.module.css';
import { InterviewHeader } from './InterviewHeader/InterviewHeader';
import { InterviewParameters } from './InterviewParameters/InterviewParameters';

interface Props {
	interview: QuizHistoryResponse;
	interviewNumber: number;
}

export const FullInterviewHistoryItem = ({ interview, interviewNumber }: Props) => {
	const { id, skills } = interview;
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	const notEmptySkills = skills.length > 0;

	return (
		<li>
			<Link to={`/interview/${id}`}>
				<Block className={styles.container}>
					<InterviewHeader title={t('title', null, { number: interviewNumber })} />
					<InterviewParameters interview={interview} />
					{notEmptySkills && <QuestionCategories questionCategories={skills} />}
				</Block>
			</Link>
		</li>
	);
};
