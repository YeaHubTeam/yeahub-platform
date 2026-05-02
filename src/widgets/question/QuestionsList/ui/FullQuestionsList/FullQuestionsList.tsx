import { useAppSelector } from '@/shared/libs';
import { Accordion } from '@/shared/ui/Accordion';

import { getHasPremiumAccess } from '@/entities/profile';
import { Question } from '@/entities/question';
import { getStudyStatus, QuestionStudyStatus } from '@/entities/question';

import { FullQuestionItem } from '../FullQuestionItem/FullQuestionItem';

import styles from './FullQuestionsList.module.css';

interface FullQuestionsListProps {
	questions: Question[];
	isPublic?: boolean;
	onMoveQuestionDetail: (id: number) => void;
}

export const FullQuestionsList = ({
	questions,
	isPublic,
	onMoveQuestionDetail,
}: FullQuestionsListProps) => {
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);

	return (
		<>
			{questions.map((question) => {
				const status = hasPremiumAccess
					? getStudyStatus(question.checksCount ?? 0, question.isLearned ?? false)
					: undefined;

				return (
					<Accordion
						key={question.id}
						status={status ? <QuestionStudyStatus status={status} /> : undefined}
						title={question.title}
						className={styles.gap}
					>
						<FullQuestionItem
							question={question}
							isPublic={isPublic}
							onMoveQuestionDetail={onMoveQuestionDetail}
						/>
					</Accordion>
				);
			})}
		</>
	);
};
