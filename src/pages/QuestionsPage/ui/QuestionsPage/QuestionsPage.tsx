import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Block } from '@/shared/ui/Block';

import { useProfileQuery } from '@/entities/auth';
import { useGetLearnedQuestionsQuery, useGetQuestionsListQuery } from '@/entities/question';

import { QuestionsFilterPanel, QuestionsSummaryList } from '@/widgets/Question';

import { getQuestionsPageFilter } from '../../model/selectors/questionsPageSelectors';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';

const QuestionsPage = () => {
	const params = useSelector(getQuestionsPageFilter);
	const dispatch = useAppDispatch();

	//exclude params is not supported by BE
	//TODO: add all params when BE is ready
	const { status, ...getParams } = params;
	const { data: userProfile } = useProfileQuery();
	const { data: questions } = useGetQuestionsListQuery(getParams, {
		skip: !!status,
	});
	const { data: learnedQuestions } = useGetLearnedQuestionsQuery(
		{
			...getParams,
			profileId: userProfile?.profiles[0].profileId || '',
			isLearned: status && status.includes(1),
		},
		{
			skip: !status,
		},
	);

	const onChangeSearchParams = (value: string) => {
		dispatch(questionsPageActions.setTitle(value));
	};

	const onChangeSkills = (skills: number[]) => {
		console.log(skills);
		dispatch(questionsPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[]) => {
		console.log(complexity);
		dispatch(questionsPageActions.setComplexity(complexity));
	};

	const onChangeRate = (rate: number[]) => {
		dispatch(questionsPageActions.setRate(rate));
	};

	const onChangeStatus = (status: number[]) => {
		console.log(status);
		console.log(learnedQuestions);
		dispatch(questionsPageActions.setStatus(status));
	};

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Block className={styles.content}>
					<QuestionsSummaryList questions={questions?.data} />
					<QuestionPagePagination questionsResponse={questions} />
				</Block>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Block className={styles.search}>
					<QuestionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSkills={onChangeSkills}
						onChangeComplexity={onChangeComplexity}
						onChangeRate={onChangeRate}
						onChangeStatus={onChangeStatus}
						filter={params}
					/>
				</Block>
			</div>
		</section>
	);
};

export default QuestionsPage;
