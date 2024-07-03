import { Block } from '@/shared/ui/Block';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';

import styles from './InterviewStatisticsPage.module.css';

const InterviewStatisticsPage = () => {
	const questionStats = [
		{
			title: 'Пройдено вопросов',
			value: '20/120',
		},
		{
			title: 'Не изучено',
			value: '50',
		},
		{
			title: 'Сохранено',
			value: '60',
		},
		{
			title: 'Изучено',
			value: '20',
		},
	];

	return (
		<div className={styles.container}>
			<Block></Block>
			<div className={styles.progress}>
				<Block className={styles.block}>
					<div className={styles.questions}>
						<InterviewQuestionHeader
							title="Статистика пройденных вопросов по всем категориям"
							centered
						/>
						<PassedQuestionChart total={120} learned={20} />
					</div>
				</Block>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Block></Block>
			<Block></Block>
		</div>
	);
};

export default InterviewStatisticsPage;
