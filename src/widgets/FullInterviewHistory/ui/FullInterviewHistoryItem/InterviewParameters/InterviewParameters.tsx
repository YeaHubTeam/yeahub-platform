import { Icon } from 'yeahub-ui-kit';

import { formatDate } from '@/shared/helpers/formatDate';

import { type Interview, InterviewResults } from '@/entities/quiz';

import styles from './InterviewParameters.module.css';

interface Props {
	interview: Interview;
}

export const InterviewParameters = ({ interview }: Props) => {
	const { date, questionCount, correctAnswersCount, incorrectAnswersCount, timeStamp } = interview;

	const formattedDate = formatDate(date);
	return (
		<div className={styles.param}>
			<time dateTime={formattedDate}>
				<span className={styles.text}>Дата:</span> {formattedDate}
			</time>
			<p>
				<span className={styles.text}>Количество вопросов:</span> {questionCount}
			</p>
			<InterviewResults
				label="Результат"
				correctAnswersCount={correctAnswersCount}
				incorrectAnswersCount={incorrectAnswersCount}
			/>
			{timeStamp && (
				<div className={styles.time}>
					<Icon icon="clock" size={24} color="--palette-ui-black-500" />
					<time>{timeStamp}</time>
				</div>
			)}
		</div>
	);
};
