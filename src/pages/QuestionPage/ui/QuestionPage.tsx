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

	let authorName = 'неизвестный, но очень умный';
	if (question?.createdBy) {
		try {
			const authorData = JSON.parse(question.createdBy);
			authorName = `${authorData.firstName} ${authorData.lastName}`;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при парсинге JSON данных автора:', error);
		}
	}

	return (
		<section className={styles.wrapper}>
			<QuestionHeader
				description={question?.description}
				status={question?.status}
				title={question?.title}
			/>
			<QuestionActions />
			<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			<ProgressBlock />
			<AdditionalInfo rate={question?.rate} questionSkills={question?.questionSkills} />
			<p className={styles.author}>
				Автор: <span>{authorName}</span>
			</p>
		</section>
	);
};
