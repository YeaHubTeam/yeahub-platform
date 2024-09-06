import { MutableRefObject } from 'react';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';

import { QuestionCategories, type QuizHistoryResponse } from '@/entities/quiz';

import styles from './FullInterviewHistoryItem.module.css';
import { InterviewHeader } from './InterviewHeader';
import { InterviewParameters } from './InterviewParameters';

interface FullInterviewHistoryItemProps {
	ref: MutableRefObject<HTMLLIElement | null> | null;
	style?: React.CSSProperties;
	interview: QuizHistoryResponse;
}

export const FullInterviewHistoryItem = ({
	ref,
	style,
	interview,
}: FullInterviewHistoryItemProps) => {
	const { id, skills } = interview;
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	const isSkillsNotEmpty = skills.length !== 0;

	return (
		<li style={style} ref={ref}>
			<Link to={`/interview/${id}`}>
				<Block className={styles.container}>
					<InterviewHeader title={t('title', null, { number: interview.quizNumber })} />
					<InterviewParameters interview={interview} />
					{isSkillsNotEmpty && <QuestionCategories questionCategories={skills} />}
				</Block>
			</Link>
		</li>
	);
};
