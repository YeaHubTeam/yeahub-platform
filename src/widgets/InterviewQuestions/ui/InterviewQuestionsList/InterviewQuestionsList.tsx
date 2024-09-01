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

	const { data: response } = useGetQuestionsListQuery(params);
	const questions = response?.data;

	return (
		<ul className={styles.list}>
			{questions?.map((question) => (
				<InterviewQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
