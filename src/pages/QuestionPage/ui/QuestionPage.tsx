import { Block } from '@/shared/ui/Block';

import { useGetQuestionQuery } from '@/entities/question';

import { QuestionHeader } from '@/widgets/Question';

import styles from './QuestionPage.module.css';

export const QuestionPage = () => {
	const { data: question } = useGetQuestionQuery(1);
	return (
		<section className={styles.wrapper}>
			<QuestionHeader
				description={question?.description}
				status={question?.status}
				title={question?.title}
			/>
			<div className={styles['additional-info-wrapper']}>
				<Block></Block>
				<Block></Block>
				<p>
					Автор: <span>Дмитрий Мусенко</span>
				</p>
			</div>
		</section>
	);
};
