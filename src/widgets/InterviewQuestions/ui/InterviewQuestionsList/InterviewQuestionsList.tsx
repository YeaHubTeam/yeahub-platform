import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionsListQuery } from '@/entities/question';

import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

export const InterviewQuestionsList = () => {
	const { data: profile } = useProfileQuery();

	const specializationId = profile?.profiles[0].specializationId;

	const params = {
		random: true,
		limit: 3,
		specialization: specializationId,
	};

	const { data: response, isSuccess } = useGetQuestionsListQuery(params);

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	return isEmptyData ? (
		<h3 className={styles['no-questions']}>Вопросы для выбранной специализации скоро появятся</h3>
	) : (
		<div className={styles.questions}>
			<ul className={styles.list}>
				{questions.map((question) => (
					<InterviewQuestionsItem key={question.id} question={question} />
				))}
			</ul>
		</div>
	);
};
