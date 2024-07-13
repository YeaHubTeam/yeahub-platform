import { Link } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { formatDate } from '@/shared/helpers/formatDate';
import { Block } from '@/shared/ui/Block';

import { Interview, InterviewResults, QuestionCategories } from '@/entities/interview';

import styles from './FullInterviewHistoryItem.module.css';

interface Props {
	interview: Interview;
}

export const FullInterviewHistoryItem = ({ interview }: Props) => {
	const {
		id,
		title,
		date,
		correctAnswersCount,
		incorrectAnswersCount,
		timeStamp,
		questionCount,
		questionCategories,
	} = interview;

	const formattedDate = formatDate(date);

	return (
		<li>
			<Block className={styles.container}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					<Link to={`/interview/${id}`} className={styles.link}>
						<span>Подробнее</span>
						<Icon
							icon="caretRight"
							size={20}
							color="--palette-ui-purple-700"
							className={styles.icon}
						/>
					</Link>
				</div>
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
					<div className={styles.time}>
						<Icon icon="clock" size={24} color="--palette-ui-black-500" />
						<time>{timeStamp}</time>
					</div>
				</div>
				{questionCategories && <QuestionCategories questionCategories={questionCategories} />}
			</Block>
		</li>
	);
};
