import { useParams } from 'react-router-dom';

import { useGetQuestionByIdQuery } from '@/entities/question';

import {
	QuestionHeader,
	QuestionBody,
	QuestionActions,
	ProgressBlock,
	AdditionalInfo,
} from '@/widgets/Question';

import styles from './QuestionPage.module.css';

export const QuestionPage = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const { data: question } = useGetQuestionByIdQuery(questionId as string);

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
				<AdditionalInfo rate={question?.rate} questionSkills={question?.questionSkills} />
				<p className={styles.author}>
					Автор: <span>{question?.createdBy ?? 'неизвестный, но очень умный'}</span>
				</p>
			</div>
		</section>
	);
};
