import classNames from 'classnames';
import { useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink, useParams } from 'react-router-dom';

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

	const authorFullName = useMemo(() => {
		if (question?.createdBy) {
			const author = JSON.parse(question.createdBy);
			return `${author.firstName} ${author.lastName}`;
		}
	}, [question]);

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
				/>
				<ProgressBlock />
				<AdditionalInfo
					rate={question?.rate}
					complexity={question?.complexity}
					questionSkills={question?.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>
				<QuestionActions />
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		);
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles.main}>
				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
				/>
				<QuestionActions />
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</div>
			<div className={styles.additional}>
				<ProgressBlock />
				<AdditionalInfo
					rate={question?.rate}
					complexity={question?.complexity}
					questionSkills={question?.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>
			</div>
		</section>
	);
};
