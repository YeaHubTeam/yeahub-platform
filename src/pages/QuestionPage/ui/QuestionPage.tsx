import { useGetQuestionQuery } from '@/entities/question';

import {
	QuestionHeader,
	QuestionBody,
	QuestionActions,
	ProgressBlock,
	AdditionalInfo,
} from '@/widgets/Question';

import styles from './QuestionPage.module.css';

export const QuestionPage = () => {
	const { data: question } = useGetQuestionQuery(1);
	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
				/>
				<QuestionActions />
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</div>
			<div className={styles['additional-info-wrapper']}>
				<ProgressBlock />
				<AdditionalInfo />
				<p>
					Автор: <span>Дмитрий Мусенко</span>
				</p>
			</div>
		</section>
	);
};